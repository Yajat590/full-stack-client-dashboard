"use client";

import { useOrders } from "@/lib/context/OrderContext";
import { CheckCircle2, FileText, Bell, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

function timeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return Math.floor(seconds) + " secs ago";
}

export default function InboxPage() {
  const { notifications, markAllNotificationsRead } = useOrders();

  return (
    <div className="w-full max-w-4xl space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Notifications</h1>
        <Button 
           onClick={markAllNotificationsRead}
           className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white font-medium rounded-lg h-9 px-4 transition-colors"
        >
          Mark all as read
        </Button>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
        <div className="flex flex-col">
          {notifications.length === 0 ? (
             <div className="p-12 text-center text-sm text-gray-500">You're all caught up!</div>
          ) : (
            notifications.map((notification) => {
               // Determine Icon logic dynamically based on mock text
               let Icon = FileText;
               let bgColor = "bg-blue-50";
               let textColor = "text-blue-500";
               
               if (notification.message.includes("Complete")) {
                  Icon = CheckCircle2;
                  bgColor = "bg-emerald-50";
                  textColor = "text-emerald-500";
               } else if (notification.message.includes("Payment")) {
                  Icon = CreditCard;
                  bgColor = "bg-blue-50";
                  textColor = "text-blue-500";
               } else if (notification.message.includes("Task") || notification.message.includes("Welcome")) {
                  Icon = Bell;
                  bgColor = "bg-purple-50";
                  textColor = "text-purple-500";
               }

               return (
                 <div key={notification.id} className="relative group px-6 py-5 border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors flex items-start gap-4">
                    
                    {/* Dynamic Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${bgColor} ${textColor}`}>
                       <Icon className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0 pr-8">
                       <p className={`text-base truncate ${!notification.read ? "font-semibold text-gray-900" : "font-medium text-gray-600"}`}>
                         {notification.message}
                       </p>
                       <time className="text-sm text-gray-400 block mt-1">
                         {notification.createdAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                       </time>
                    </div>

                    {/* Unread indicator dot */}
                    {!notification.read && (
                       <div className="absolute right-6 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#8b5cf6]" />
                    )}
                 </div>
               );
            })
          )}
        </div>
      </div>
      
    </div>
  );
}
