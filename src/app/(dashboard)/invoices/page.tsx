"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type InvoiceStatus = "Paid" | "Overdue" | "Draft";

interface Invoice {
  id: string;
  client: string;
  email: string;
  amount: number;
  date: Date;
  status: InvoiceStatus;
  items: number;
}

const mockInvoices: Invoice[] = [
  { id: "INV-2025-041", client: "Wavespace Inc.",   email: "billing@wavespace.io",  amount: 2450, date: new Date(Date.now() - 5  * 86400000), status: "Paid",    items: 3 },
  { id: "INV-2025-040", client: "Acme Corp",         email: "finance@acme.com",       amount: 1800, date: new Date(Date.now() - 12 * 86400000), status: "Paid",    items: 2 },
  { id: "INV-2025-039", client: "TechFlow Ltd.",     email: "accounts@techflow.io",   amount: 950,  date: new Date(Date.now() - 20 * 86400000), status: "Overdue", items: 1 },
  { id: "INV-2025-038", client: "Meridian Co.",      email: "hello@meridian.co",      amount: 3200, date: new Date(Date.now() - 25 * 86400000), status: "Paid",    items: 4 },
  { id: "INV-2025-037", client: "Wavespace Inc.",   email: "billing@wavespace.io",   amount: 2100, date: new Date(Date.now() - 35 * 86400000), status: "Paid",    items: 3 },
  { id: "INV-2025-036", client: "Sova Digital",     email: "pay@sovadigital.com",    amount: 600,  date: new Date(Date.now() - 40 * 86400000), status: "Draft",   items: 1 },
];

const statusStyles: Record<InvoiceStatus, string> = {
  Paid:    "bg-emerald-50 text-emerald-600",
  Overdue: "bg-red-50 text-red-500",
  Draft:   "bg-gray-100 text-gray-500",
};

const totalRevenue = mockInvoices.filter(i => i.status === "Paid").reduce((s, i) => s + i.amount, 0);
const totalOutstanding = mockInvoices.filter(i => i.status === "Overdue").reduce((s, i) => s + i.amount, 0);

export default function InvoicesPage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Billing & Invoices</h1>
        <p className="text-sm text-gray-500">Track payments and download invoices for your orders.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{mockInvoices.filter(i => i.status === "Paid").length} paid invoices</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Outstanding</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">${totalOutstanding.toLocaleString()}</div>
            <p className="text-xs text-gray-500 mt-1">{mockInvoices.filter(i => i.status === "Overdue").length} overdue invoice</p>
          </CardContent>
        </Card>
        <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Drafts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockInvoices.filter(i => i.status === "Draft").length}</div>
            <p className="text-xs text-gray-500 mt-1">Pending issuance</p>
          </CardContent>
        </Card>
      </div>

      {/* Invoices Table */}
      <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">All invoices</CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-y border-gray-100 bg-gray-50/30">
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Invoice</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Client</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Amount</th>
                  <th className="px-6 py-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-semibold text-gray-900">{inv.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">{inv.client}</p>
                      <p className="text-xs text-gray-400">{inv.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{inv.items} {inv.items === 1 ? "item" : "items"}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {inv.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider", statusStyles[inv.status])}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-bold text-gray-900">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary hover:bg-primary/5 font-medium h-8">
                        <Download className="w-3.5 h-3.5 mr-1.5" /> PDF
                      </Button>
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
