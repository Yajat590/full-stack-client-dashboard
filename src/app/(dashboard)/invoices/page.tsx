import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function InvoicesPage() {
  return (
    <div className="w-full space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Billing & Invoices</h1>
        <p className="text-sm text-gray-500">Manage your payments here.</p>
      </div>
      <Card className="rounded-[20px] shadow-[0_2px_10px_rgba(0,0,0,0.02)] border-gray-100">
        <CardHeader>
          <CardTitle>Invoices</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">This feature is not yet fully implemented. It will be built out in the upcoming phases.</p>
        </CardContent>
      </Card>
    </div>
  );
}
