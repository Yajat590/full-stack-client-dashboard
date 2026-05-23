"use client";

import { useOrders } from "@/lib/context/OrderContext";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, FileText, Download, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-12">
        <h2 className="text-xl font-bold text-gray-900">Order Not Found</h2>
        <p className="text-gray-500 mb-6">The order you are looking for does not exist or was deleted.</p>
        <Button onClick={() => router.push("/orders")}>Back to Orders</Button>
      </div>
    );
  }

  const isCompleted = order.status === "Completed";
  
  const statusColors: Record<string, string> = {
    "To do": "bg-blue-50 text-blue-700",
    "In Progress": "bg-purple-50 text-purple-700",
    "Pending Review": "bg-amber-50 text-amber-700",
    "Completed": "bg-emerald-50 text-emerald-700",
  };

  return (
    <div className="w-full space-y-6">
      
      {/* Header */}
      <div className="flex items-start justify-between pb-4">
        <div className="flex items-start gap-4">
          <button 
            onClick={() => router.back()} 
            className="mt-1 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <div className="text-sm font-medium text-gray-500 mb-1">
              <Link href="/orders" className="hover:text-gray-900 transition-colors">Orders</Link> 
              <span className="mx-2">›</span> 
              Order #{order.id.toUpperCase()}
            </div>
            <h1 className="text-[28px] font-bold text-gray-900 tracking-tight">{order.title}</h1>
          </div>
        </div>
        
        <div className={cn("px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider", statusColors[order.status])}>
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
        
        {/* Left Column */}
        <div className="space-y-6">
          
          {/* Order Content Box */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Content</h2>
            
            {isCompleted ? (
               <div className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-gray-900">{order.title.replace(/\s+/g, '_')}_Final.docx</p>
                      <p className="text-xs text-gray-500">Uploaded {order.deadline ? new Date(order.deadline).toLocaleDateString() : "recently"}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 font-semibold text-sm h-9">
                    <Download className="w-4 h-4 mr-2" /> Download
                  </Button>
               </div>
            ) : (
               <div className="w-full py-16 flex flex-col items-center justify-center rounded-xl border border-gray-100 bg-gray-50/50 text-center">
                  <FileText className="w-8 h-8 text-gray-300 mb-4" />
                  <p className="font-semibold text-gray-900 mb-1">Content is being written</p>
                  <p className="text-sm text-gray-500">Your writer is currently working on this piece. You will be notified when it is ready for review.</p>
               </div>
            )}
          </div>

          {/* Original Brief Box */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Original Brief</h2>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              {order.subtitle} This is a comprehensive guide on maximizing the potential of {order.company}'s strategies.
            </p>
            <p className="text-sm text-gray-600">
              <strong className="text-gray-900">Keywords:</strong> saas, growth, strategy
            </p>
          </div>

        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* Details Box */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
            <h2 className="text-lg font-bold text-gray-900 mb-6">Details</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Format</span>
                <span className="font-medium text-gray-900">{order.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Word Count</span>
                <span className="font-medium text-gray-900">{order.wordCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Deadline</span>
                <span className="font-medium text-gray-900">{order.deadline ? new Date(order.deadline).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "TBA"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Priority</span>
                <span className={cn("font-medium", order.priority === "High" ? "text-primary" : "text-yellow-600")}>
                  {order.priority}
                </span>
              </div>
            </div>
          </div>

          {/* Timeline Box */}
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
             <h2 className="text-lg font-bold text-gray-900 mb-6">Timeline</h2>
             
             <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
                
                {/* Status change step */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-blue-100 text-blue-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <Clock className="w-3 h-3" />
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-even:ml-auto">
                    <p className="text-sm font-semibold text-gray-900">Status changed to {order.status.toLowerCase()}</p>
                    <time className="text-xs text-gray-500">{order.deadline ? new Date(order.deadline).toLocaleDateString() : "Just now"}</time>
                  </div>
                </div>

                {/* Submitted step */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-emerald-100 text-emerald-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <CheckCircle2 className="w-3 h-3" />
                  </div>
                  <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] ml-4 md:ml-0 md:group-even:ml-auto">
                    <p className="text-sm font-medium text-gray-900">Order submitted</p>
                    <time className="text-xs text-gray-500">{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "Just now"}</time>
                  </div>
                </div>

             </div>
          </div>

        </div>
      </div>

    </div>
  );
}
