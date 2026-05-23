"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Users, TrendingUp, DollarSign } from "lucide-react";

interface Client {
  id: string;
  name: string;
  contact: string;
  email: string;
  activeOrders: number;
  totalDelivered: number;
  totalSpend: number;
  since: string;
  status: "Active" | "Inactive";
}

const mockClients: Client[] = [
  { id: "1", name: "Wavespace Inc.",  contact: "Sarah Chen",    email: "sarah@wavespace.io",   activeOrders: 2, totalDelivered: 8,  totalSpend: 12400, since: "Jan 2025", status: "Active"   },
  { id: "2", name: "Acme Corp",        contact: "Marcus Webb",   email: "marcus@acme.com",       activeOrders: 1, totalDelivered: 5,  totalSpend: 7800,  since: "Feb 2025", status: "Active"   },
  { id: "3", name: "TechFlow Ltd.",    contact: "Priya Nair",    email: "priya@techflow.io",     activeOrders: 0, totalDelivered: 3,  totalSpend: 3200,  since: "Mar 2025", status: "Inactive" },
  { id: "4", name: "Meridian Co.",     contact: "James Liu",     email: "james@meridian.co",     activeOrders: 1, totalDelivered: 12, totalSpend: 18900, since: "Nov 2024", status: "Active"   },
  { id: "5", name: "Sova Digital",    contact: "Elena Petrov",  email: "elena@sovadigital.com", activeOrders: 0, totalDelivered: 2,  totalSpend: 1200,  since: "Apr 2025", status: "Inactive" },
];

const totalClients   = mockClients.length;
const activeClients  = mockClients.filter(c => c.status === "Active").length;
const totalRevenue   = mockClients.reduce((s, c) => s + c.totalSpend, 0);

export default function ClientsPage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Clients</h1>
        <p className="text-sm text-gray-500">Manage your client relationships and track engagement.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              Total clients <Users className="w-4 h-4 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{totalClients}</div>
            <p className="text-xs text-gray-500 mt-1">{activeClients} currently active</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              Active retainers <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{activeClients}</div>
            <p className="text-xs text-gray-500 mt-1">With open orders this month</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500 flex items-center justify-between">
              Lifetime revenue <DollarSign className="w-4 h-4 text-blue-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">Across all clients</p>
          </CardContent>
        </Card>
      </div>

      {/* Clients Table */}
      <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">All clients</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50/30">
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Active orders</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Delivered</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Client since</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Total spend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                          {client.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{client.name}</p>
                          <p className="text-xs text-gray-400">{client.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{client.activeOrders}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{client.totalDelivered} orders</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{client.since}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                        client.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-gray-100 text-gray-400"
                      )}>
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                      ${client.totalSpend.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
