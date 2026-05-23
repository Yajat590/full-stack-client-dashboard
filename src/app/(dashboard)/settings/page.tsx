"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

export default function SettingsPage() {
  // DB States
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [activityDigest, setActivityDigest] = useState(true);
  
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load Real Profile Data
  useEffect(() => {
    const supabase = createClient();
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      setEmail(user.email ?? "");

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (profile) {
        setFullName(profile.full_name ?? "");
        setCompany(profile.company ?? "");
        setEmailNotifs(profile.email_prefs ?? true);
        setActivityDigest(profile.weekly_digest ?? true);
      } else {
        // Fallback to auth metadata if profile row doesn't exist yet
        setFullName(user.user_metadata?.full_name ?? "");
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("You must be logged in to save settings.");
      setIsSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({
        id: user.id,
        full_name: fullName,
        company: company,
        email_prefs: emailNotifs,
        weekly_digest: activityDigest,
        updated_at: new Date().toISOString()
      }, { onConflict: "id" });

    setIsSaving(false);
    if (error) {
      toast.error("Failed to update settings: " + error.message);
    } else {
      toast.success("Profile settings updated successfully.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-12">
        <p className="text-gray-500 animate-pulse">Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account settings and preferences.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Details Card */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Profile Details</h2>
            <p className="text-sm text-gray-500">Update your personal and company information.</p>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-gray-600 font-medium text-sm">Full Name</Label>
                <Input 
                  value={fullName} 
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="h-11 bg-white rounded-xl border-gray-200" 
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-600 font-medium text-sm">Company</Label>
                <Input 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Acme Corp"
                  className="h-11 bg-white rounded-xl border-gray-200" 
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-600 font-medium text-sm">Email Address</Label>
              <Input 
                value={email} 
                disabled 
                className="h-11 bg-gray-50 rounded-xl border-gray-200 text-gray-500" 
              />
              <p className="text-xs text-gray-400 mt-1">Contact support to change your email address.</p>
            </div>

            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="h-10 px-6 rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 font-medium mt-2"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>

        {/* Preferences Card */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Preferences</h2>
            <p className="text-sm text-gray-500">Customize your notification and display settings.</p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Email Notifications</p>
                <p className="text-sm text-gray-500">Receive emails when your orders are updated.</p>
              </div>
              <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
            </div>
            
            <hr className="border-gray-100" />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">Activity Digest</p>
                <p className="text-sm text-gray-500">Receive a weekly summary of your order statuses.</p>
              </div>
              <Switch checked={activityDigest} onCheckedChange={setActivityDigest} />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
