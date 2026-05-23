"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { 
  Home, BoxSelect, Inbox, LogOut, Waves, Settings
} from "lucide-react";

const mainNav = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: BoxSelect, label: "My tasks", href: "/orders" },
  { icon: Inbox, label: "Inbox", href: "/inbox" },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div className="w-[280px] flex-shrink-0 bg-[#252432] text-gray-300 flex flex-col h-screen fixed left-0 top-0 border-r border-[#302e3f] overflow-y-auto overflow-x-hidden scrollbar-none">
      
      {/* Brand Header */}
      <div className="h-[72px] px-6 flex items-center gap-3 border-b border-transparent">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white shrink-0 shadow-lg shadow-primary/20">
          <Waves strokeWidth={2.5} className="w-5 h-5" />
        </div>
        <span className="text-xl font-bold text-white tracking-tight flex-1 truncate">ClienHub</span>
      </div>

      <div className="flex-1 px-4 py-6 space-y-8">
        
        {/* Main Navigation */}
        <nav className="space-y-1">
          {mainNav.map((item) => {
            const isActive = pathname === item.href || (item.href === '/orders' && pathname.startsWith('/orders'));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-[12px] font-medium transition-all group outline-none",
                  isActive 
                    ? "bg-[#332a52] text-primary" 
                    : "hover:bg-[#302e3f] hover:text-white"
                )}
              >
                <item.icon strokeWidth={isActive ? 2.5 : 2} className={cn("w-5 h-5", isActive ? "text-primary" : "text-gray-400 group-hover:text-white")} />
                {item.label}
              </Link>
            );
          })}
        </nav>

      </div>

      {/* Bottom Actions */}
      <div className="p-4 space-y-1 mt-auto">
        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-[12px] font-medium text-gray-400 hover:bg-[#302e3f] hover:text-white transition-all">
          <Settings className="w-5 h-5" /> Settings
        </Link>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-sm rounded-[12px] font-medium text-gray-400 outline-none hover:bg-red-500/10 hover:text-red-500 transition-all text-left"
        >
          <LogOut className="w-5 h-5" /> Log Out
        </button>
      </div>

    </div>
  );
}
