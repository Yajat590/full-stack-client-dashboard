"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CopyPlus, Clock, CheckCircle2, TrendingUp, Timer } from "lucide-react";
import Link from "next/link";
import { useOrders } from "@/lib/context/OrderContext";
import { CompletionChart } from "@/components/dashboard/completion-chart";
import { cn } from "@/lib/utils";
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
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
}

export default function DashboardPage() {
  const { activeOrdersCount, inReviewCount, completedCount, totalWordsDelivered, activities, orders, avgTurnaroundDays } = useOrders();

  // Pick up to 5 upcoming deadlines
  const upcomingDeadlines = [...orders]
    .filter(o => o.status !== "Completed")
    .sort((a, b) => a.deadline.getTime() - b.deadline.getTime())
    .slice(0, 5);
    
  const statusConfig = {
    "In Progress": "bg-purple-50 text-purple-600",
    "Pending Review": "bg-orange-50 text-orange-500",
    "Completed": "bg-emerald-50 text-emerald-600"
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's an overview of your content orders.</p>
        </div>
        <Link href="/orders/new">
          <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
            <CopyPlus className="mr-2 w-4 h-4" /> Place new order
          </Button>
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI 1 */}
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active orders</CardTitle>
            <Clock className="w-4 h-4 text-[#FC4C31]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeOrdersCount}</div>
            <p className="text-xs text-gray-500 mt-1">Orders in progress</p>
          </CardContent>
        </Card>

        {/* KPI 2 */}
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">In review</CardTitle>
            <CheckCircle2 className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{inReviewCount}</div>
            <p className="text-xs text-gray-500 mt-1">Ready for your approval</p>
          </CardContent>
        </Card>

         {/* KPI 3 */}
         <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Completed (YTD)</CardTitle>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{completedCount}</div>
            <p className="text-xs text-gray-500 mt-1">{totalWordsDelivered.toLocaleString()} words delivered</p>
          </CardContent>
        </Card>

         {/* KPI 4 */}
         <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Avg. turnaround</CardTitle>
            <Timer className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {avgTurnaroundDays > 0 ? `${avgTurnaroundDays.toFixed(1)} Days` : "—"}
            </div>
            <p className="text-xs text-gray-500 mt-1">Across {completedCount} completed orders</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Graph */}
      <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">Task completion over time</CardTitle>
        </CardHeader>
        <CardContent>
          <CompletionChart />
        </CardContent>
      </Card>

      {/* Recent Tasks and Activity */}
      <div className="space-y-6">
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">Recent activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.length === 0 ? (
                <p className="text-sm text-gray-500">No recent activity.</p>
              ) : (
                activities.slice(0, 5).map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${activity.statusColor}`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                      <p className="text-xs text-gray-500">{timeAgo(activity.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Recent Tasks Table */}
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-gray-900">Recent tasks</CardTitle>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-y border-gray-100 bg-gray-50/30">
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Task Name</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Team</th>
                    <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {upcomingDeadlines.map((order) => (
                    <tr key={order.id} className="group hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4">
                         <Link href={`/orders/${order.id}`} className="block font-semibold text-sm text-gray-900 hover:text-primary transition-colors">
                            {order.title}
                         </Link>
                      </td>
                      <td className="px-6 py-4">
                         <div className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", statusConfig[order.status])}>
                            {order.status}
                         </div>
                      </td>
                      <td className="px-6 py-4">
                         <div className="flex -space-x-2">
                           {order.avatars.slice(0, 3).map((avatar, i) => (
                             <img 
                               key={i}
                               src={avatar} 
                               alt="Assignee" 
                               className="w-6 h-6 rounded-full border-2 border-white bg-gray-100 object-cover"
                             />
                           ))}
                         </div>
                      </td>
                      <td className="px-6 py-4 text-right text-sm text-gray-500 font-medium">
                         {order.deadline.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </td>
                    </tr>
                  ))}
                  {upcomingDeadlines.length === 0 && (
                     <tr>
                        <td colSpan={4} className="px-6 py-8 text-center text-sm text-gray-500">No recent tasks.</td>
                     </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
