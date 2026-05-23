"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export type OrderStatus = "In Progress" | "Pending Review" | "Completed";
export type Priority = "High" | "Low" | "Medium";

export interface Order {
  id: string;
  title: string;
  subtitle: string;
  code?: string;
  company?: string;
  email: string;
  type: string;
  wordCount: string;
  status: OrderStatus;
  priority: Priority;
  avatars: string[];
  attachmentsCount: number;
  commentsCount: number;
  deadline: Date;
  createdAt?: Date;
}

export interface Activity {
  id: string;
  message: string;
  timestamp: Date;
  statusColor: string; 
}

export interface NotificationItem {
  id: string;
  message: string;
  read: boolean;
  createdAt: Date;
}

interface OrderContextType {
  orders: Order[];
  activities: Activity[];
  notifications: NotificationItem[];
  addOrder: (order: Partial<Order> & { title: string }) => void;
  updateOrderStatus: (id: string, newStatus: OrderStatus) => void;
  markAllNotificationsRead: () => void;
  activeOrdersCount: number;
  inReviewCount: number;
  completedCount: number;
  totalWordsDelivered: number;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
     const supabase = createClient();

     async function loadData() {
       try {
         const { data: orderData, error: orderError } = await supabase.from('orders').select('*');
         const { data: notifData, error: notifError } = await supabase.from('notifications').select('*');

         if (orderError) throw orderError;
         
         if (orderData && orderData.length > 0) {
           setOrders(orderData.map(o => ({
              id: o.id,
              title: o.title,
              subtitle: o.subtitle,
              email: o.client_email,
              type: o.type,
              wordCount: o.word_count,
              status: o.status as OrderStatus,
              priority: o.priority as Priority,
              deadline: new Date(o.deadline),
              avatars: o.avatars || [],
              attachmentsCount: o.attachments_count || 0,
              commentsCount: o.comments_count || 0
           })));
         } else {
            setOrders(mockOrders);
         }

         if (notifData && notifData.length > 0) {
           setNotifications(notifData.map(n => ({
              id: n.id,
              message: n.message,
              read: n.read,
              createdAt: new Date(n.created_at)
           })));
         } else {
            setNotifications([
              { id: "n0", message: "Payment processed: $2,450.00 via Stripe ending in •••• 4242", read: false, createdAt: new Date() },
              { id: "n1", message: "Task 'Travel planner website design' moved to Completed.", read: false, createdAt: new Date(Date.now() - 1800000) },
            ]);
         }
         
         setIsSupabaseConnected(true);
       } catch (err: any) {
         console.warn("Supabase fetch failed. Falling back to mock data.", err.message);
         setOrders(mockOrders);
         setNotifications([
            { id: "n0", message: "Payment processed: $2,450.00 via Stripe ending in •••• 4242", read: false, createdAt: new Date() },
            { id: "n1", message: "Task 'Travel planner website design' moved to Completed.", read: false, createdAt: new Date(Date.now() - 1800000) },
         ]);
       }
     }
     
     loadData();
  }, []);

  const addOrder = async (orderData: Partial<Order> & { title: string }) => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error("No user found, cannot add order");
      return;
    }

    const date = new Date();
    date.setDate(date.getDate() + 7);

    // Generate a proper UUID for the database
    const newOrderId = crypto.randomUUID();

    const newOrder: Order = {
      id: newOrderId,
      title: orderData.title,
      subtitle: orderData.subtitle || "New project created from dashboard",
      email: orderData.email || user.email || "demo@example.com",
      type: orderData.type || "Default",
      wordCount: orderData.wordCount || "~1000",
      status: "In Progress",
      priority: orderData.priority || "Medium",
      avatars: ["https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"],
      attachmentsCount: 0,
      commentsCount: 0,
      deadline: date,
    };
    
    // Update local state for immediate UI feedback
    setOrders((prev) => [...prev, newOrder]);

    // Insert into Supabase
    const { error: orderError } = await supabase.from('orders').insert({
      id: newOrder.id,
      user_id: user.id,
      title: newOrder.title,
      subtitle: newOrder.subtitle,
      client_email: newOrder.email,
      type: newOrder.type,
      word_count: newOrder.wordCount,
      status: newOrder.status,
      priority: newOrder.priority,
      deadline: newOrder.deadline.toISOString(),
      avatars: newOrder.avatars,
      attachments_count: newOrder.attachmentsCount,
      comments_count: newOrder.commentsCount
    });

    if (orderError) {
      console.error("Failed to insert order to Supabase:", orderError);
    }

    // Handle Notification
    const newNotifId = crypto.randomUUID();
    const newNotification: NotificationItem = {
      id: newNotifId,
      message: `You created a new task '${newOrder.title}'`,
      read: false,
      createdAt: new Date()
    };
    
    setNotifications((prev) => [newNotification, ...prev]);

    const { error: notifError } = await supabase.from('notifications').insert({
      id: newNotification.id,
      user_id: user.id,
      message: newNotification.message,
      read: newNotification.read,
      created_at: newNotification.createdAt.toISOString()
    });

    if (notifError) {
      console.error("Failed to insert notification to Supabase:", notifError);
    }
  };

  const updateOrderStatus = (id: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status: newStatus } : order))
    );
    const supabase = createClient();
    if(isSupabaseConnected) {
       supabase.from('orders').update({status: newStatus}).eq('id', id).then();
    }
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({...n, read: true})));
    const supabase = createClient();
    if(isSupabaseConnected) {
       supabase.from('notifications').update({read: true}).neq('read', true).then();
    }
  };

  const activeOrdersCount = orders.filter((o) => o.status === "In Progress").length;
  const inReviewCount = orders.filter((o) => o.status === "Pending Review").length;
  const completedCount = orders.filter((o) => o.status === "Completed").length;
  
  const totalWordsDelivered = orders
    .filter((o) => o.status === "Completed")
    .reduce((acc, order) => {
      const numMatch = order.wordCount.match(/\d+/);
      const val = numMatch ? parseInt(numMatch[0]) : 0;
      return acc + val;
    }, 0);

  return (
    <OrderContext.Provider
      value={{
        orders,
        activities,
        notifications,
        addOrder,
        updateOrderStatus,
        markAllNotificationsRead,
        activeOrdersCount,
        inReviewCount,
        completedCount,
        totalWordsDelivered,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

const avatarPool = [
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
];

const mockOrders: Order[] = [
      {
        id: "1",
        title: "Q3 Marketing Mail Due in 2 days",
        subtitle: "A comprehensive guide on B2B marketing strategies for Q3.",
        email: "demo@clientdash.com",
        type: "Website",
        wordCount: "~5000",
        status: "In Progress", 
        priority: "High",
        avatars: [avatarPool[0], avatarPool[1], avatarPool[2]],
        attachmentsCount: 3,
        commentsCount: 12,
        deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      },
      {
        id: "2",
        title: "Social Media Pack",
        subtitle: "30 days of social media content for Twitter and LinkedIn.",
        email: "demo@clientdash.com",
        type: "Website",
        wordCount: "~5000",
        status: "In Progress",
        priority: "Low",
        avatars: [avatarPool[3], avatarPool[4]],
        attachmentsCount: 3,
        commentsCount: 12,
        deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "3",
        title: "Travel planner website design",
        subtitle: "Complete redesign of the main landing page and booking flow.",
        email: "demo@clientdash.com",
        type: "Website",
        wordCount: "~5000",
        status: "Completed",
        priority: "High",
        avatars: [avatarPool[1]],
        attachmentsCount: 3,
        commentsCount: 12,
        deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "4",
        title: "Technical documentation",
        subtitle: "API documentation for the new auth endpoints.",
        email: "demo@clientdash.com",
        type: "Blog Post",
        wordCount: "~1500",
        status: "Completed",
        priority: "Medium",
        avatars: [avatarPool[0], avatarPool[2]],
        attachmentsCount: 2,
        commentsCount: 5,
        deadline: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      },
      {
        id: "5",
        title: "SaaS Growth Guide",
        subtitle: "An in-depth whitepaper on user retention metrics.",
        email: "demo@clientdash.com",
        type: "Copywriting",
        wordCount: "~500",
        status: "Completed",
        priority: "High",
        avatars: [avatarPool[3]],
        attachmentsCount: 1,
        commentsCount: 8,
        deadline: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      },
      {
        id: "6",
        title: "Weekly Newsletter Template",
        subtitle: "Updating the HTML template for the weekly digest.",
        email: "demo@clientdash.com",
        type: "Copywriting",
        wordCount: "~500",
        status: "Pending Review",
        priority: "High",
        avatars: [avatarPool[2], avatarPool[4]],
        attachmentsCount: 1,
        commentsCount: 3,
        deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      },
      {
        id: "7",
        title: "Product Launch Press Release",
        subtitle: "Press release document for the upcoming V2.0 launch.",
        email: "demo@clientdash.com",
        type: "Blog Post",
        wordCount: "~800",
        status: "Completed",
        priority: "Medium",
        avatars: [avatarPool[1], avatarPool[0]],
        attachmentsCount: 0,
        commentsCount: 2,
        deadline: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      }
];

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrderProvider");
  }
  return context;
}
