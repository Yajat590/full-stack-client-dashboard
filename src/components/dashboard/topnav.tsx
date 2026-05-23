"use client";

import { Search, LogOut, User, Bell } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useOrders } from "@/lib/context/OrderContext";
import { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

export function TopNav() {
  const { notifications, orders } = useOrders();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  // Profile state
  const [profileOpen, setProfileOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  // Load real user data when dialog opens
  useEffect(() => {
    if (!profileOpen) return;
    const supabase = createClient();
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      setEmail(user.email ?? "");
      // Try fetching the profile row
      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, phone, company")
        .eq("id", user.id)
        .single();
      if (profile) {
        setFullName(profile.full_name ?? "");
        setPhone(profile.phone ?? "");
        setCompany(profile.company ?? "");
      }
    }
    loadProfile();
    setSaveMsg("");
  }, [profileOpen]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg("");
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { setSaving(false); return; }

    const { error } = await supabase
      .from("profiles")
      .upsert({ 
        id: user.id, 
        full_name: fullName, 
        phone: phone,
        company: company 
      }, { onConflict: "id" });

    setSaving(false);
    if (error) {
      setSaveMsg("Failed to save. Please try again.");
    } else {
      setSaveMsg("Saved successfully!");
      setTimeout(() => setSaveMsg(""), 2500);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const searchResults = orders.filter(
    o => o.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         o.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close search when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="h-[72px] px-8 bg-white/60 backdrop-blur-md border-b border-gray-100 flex items-center justify-between sticky top-0 z-10 w-full transition-all">
      
      {/* Left side: Search */}
      <div className="flex-1 max-w-xl relative" ref={searchRef}>
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-primary transition-colors" />
          <Input 
            placeholder="Search tasks, briefs..." 
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
            }}
            onFocus={() => setIsSearchOpen(true)}
            className="pl-10 h-10 bg-gray-50/50 hover:bg-gray-100/50 focus:bg-white rounded-[12px] border-transparent focus:border-primary/30 transition-all shadow-sm w-full font-medium placeholder:font-normal"
          />
        </div>

        {/* Custom Search Dropdown Popover */}
        {isSearchOpen && searchQuery.length > 0 && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-100 py-2 max-h-[300px] overflow-y-auto">
            {searchResults.length === 0 ? (
               <div className="px-4 py-3 text-sm text-gray-500">No matching tasks found.</div>
            ) : (
               searchResults.map(result => (
                 <button 
                    key={result.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      router.push(`/orders/${result.id}`);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-start gap-3 transition-colors"
                 >
                   <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                     <Search className="w-4 h-4" />
                   </div>
                   <div>
                     <p className="text-sm font-bold text-gray-900">{result.title}</p>
                     <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                   </div>
                 </button>
               ))
            )}
          </div>
        )}
      </div>

      {/* Right side: Global Actions */}
      <div className="flex items-center gap-4 ml-4">
        
        {/* Notifications Bell -> Links direct to inbox */}
        <Link href="/inbox" className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-colors">
          <Bell strokeWidth={2} className="w-5 h-5" />
          {unreadCount > 0 && (
            <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          )}
        </Link>
        
        <div className="h-6 w-px bg-gray-200 mx-1" />

        {/* Global Logout */}
        <button 
           onClick={handleLogout}
           className="relative w-10 h-10 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
           title="Log out"
        >
          <LogOut strokeWidth={2} className="w-5 h-5" />
        </button>

        {/* User Profile Dialog */}
        <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
          <DialogTrigger className="w-10 h-10 rounded-full border-2 border-transparent hover:border-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer flex items-center justify-center bg-primary/10 text-primary">
            <User className="w-5 h-5" />
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-xl">Profile Information</DialogTitle>
              <DialogDescription>
                Update your account details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-5 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Full Name</label>
                <Input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Email Address</label>
                <Input
                  type="email"
                  value={email}
                  disabled
                  className="bg-gray-50 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-400">Email cannot be changed here.</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Phone Number</label>
                <Input
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-900">Company</label>
                <Input
                  value={company}
                  onChange={e => setCompany(e.target.value)}
                  placeholder="Your company name"
                />
              </div>
              {saveMsg && (
                <p className={`text-sm font-medium ${saveMsg.includes("Failed") ? "text-red-500" : "text-emerald-600"}`}>
                  {saveMsg}
                </p>
              )}
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <DialogClose className="px-4 py-2 border border-gray-200 rounded-md font-medium text-sm hover:bg-gray-50 text-gray-700 outline-none">
                Cancel
              </DialogClose>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-md font-medium text-sm outline-none disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </DialogContent>
        </Dialog>

      </div>
    </header>
  );
}
