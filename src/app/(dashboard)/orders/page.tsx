"use client";

import { useOrders, Order, OrderStatus } from "@/lib/context/OrderContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search, Plus, Share2, CheckSquare, List, LayoutGrid, 
  Calendar as CalendarIcon, UserCircle, Settings2, Paperclip, MessageSquare,
  MoreVertical, MoreHorizontal
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function KanbanBoardPage() {
  const { orders } = useOrders();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrders = orders.filter((order) =>
    order.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full flex flex-col space-y-6">
      
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[28px] font-bold text-gray-900 tracking-tight mb-1">My tasks</h1>
          <p className="text-sm text-gray-500">Manage and track your active content orders through the pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/orders/new">
            <Button className="h-10 px-4 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-semibold text-white">
              <Plus className="w-4 h-4 mr-2" /> New task
            </Button>
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        <button className="flex items-center gap-2 pb-3 text-sm font-bold text-primary border-b-2 border-primary">
          <LayoutGrid className="w-4 h-4" /> Board
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-end py-2">
        <div className="flex items-center gap-3">
          <div className="relative w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input 
              placeholder="Search Task..." 
              className="pl-9 h-9 bg-white rounded-lg border-gray-200 text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 grid gap-6 grid-cols-1 lg:grid-cols-3 pb-8 items-start">
        {(["In Progress", "Pending Review", "Completed"] as OrderStatus[]).map((status) => {
          const colOrders = filteredOrders.filter((o) => o.status === status);
          return (
            <div key={status} className="w-full bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex flex-col h-full min-h-[600px]">
              
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-gray-900">{status}</h3>
                  <div className="bg-gray-200 text-gray-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {colOrders.length}
                  </div>
                </div>
              </div>

              {/* Cards List */}
              <div className="space-y-4 flex-1 overflow-y-auto kanban-column">
                {colOrders.map(order => (
                  <div 
                    key={order.id} 
                    className="bg-white p-4 rounded-2xl border border-gray-200 cursor-grab hover-elevate"
                  >
                    {/* Tags */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/5 px-2.5 py-1 rounded-md">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        {order.type}
                      </span>
                      <span className={cn(
                        "flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-md border",
                        order.priority === "High" ? "text-primary border-primary/20" : "text-yellow-600 border-yellow-200"
                      )}>
                        <div className="w-3 h-3 flex items-center justify-center">
                           <div className={cn("w-1.5 h-1.5 transform rotate-45 border-t border-r", order.priority ==='High' ? 'border-primary' : 'border-yellow-600')} />
                        </div>
                        {order.priority}
                      </span>
                    </div>

                    {/* Content */}
                    <Link href={`/orders/${order.id}`}>
                      <h4 className="font-bold text-gray-900 text-sm mb-1 leading-tight">{order.title}</h4>
                      <p className="text-xs text-gray-500 mb-4">{order.subtitle}</p>
                    </Link>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-1">
                      {/* Avatars */}
                      <div className="flex -space-x-2">
                        {order.avatars.map((avatar, idx) => (
                          <img 
                            key={idx} 
                            src={avatar} 
                            alt="Assignee" 
                            className="w-7 h-7 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                      </div>

                      {/* Meta Icons */}
                      <div className="flex items-center gap-3 text-gray-400">
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <Paperclip className="w-3.5 h-3.5" />
                          {order.attachmentsCount}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs font-medium">
                          <MessageSquare className="w-3.5 h-3.5" />
                          {order.commentsCount}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
