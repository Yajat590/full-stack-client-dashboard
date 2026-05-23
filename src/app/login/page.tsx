"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Loader2, Waves, Zap } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: "demo@clienthub.com",
      password: "Demo1234!",
    });

    if (error) {
      toast.error("Demo login failed. Please try again.");
      setDemoLoading(false);
      return;
    }

    toast.success("Welcome to the demo!");
    router.push("/dashboard");
    router.refresh();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
       toast.error(error.message);
       setLoading(false);
       return;
    }

    toast.success("Successfully logged in!");
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1c1b22] px-4">
      <Card className="w-full max-w-md bg-white border-0 shadow-2xl hover-elevate">
        <CardHeader className="space-y-1 pb-6 text-center">
          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/20">
             <Waves strokeWidth={2.5} className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-gray-900">Welcome back to ClienHub</CardTitle>
          <CardDescription className="text-gray-500">
            Sign in to access your client dashboard.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="you@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="focus-visible:ring-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <span className="font-medium text-sm text-gray-400 cursor-not-allowed" title="Coming soon">
                   Forgot password?
                </span>
              </div>
              <Input 
                id="password" 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="focus-visible:ring-primary h-11"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-4">
            <Button 
               type="submit" 
               className="w-full h-11 font-medium bg-primary hover:bg-primary/90 text-white shadow-md transition-all" 
               disabled={loading}
            >
              {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Sign in
            </Button>
            <div className="relative w-full flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium">or</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full h-11 font-medium border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/60 transition-all"
              onClick={handleDemoLogin}
              disabled={demoLoading || loading}
            >
              {demoLoading ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Zap className="w-4 h-4 mr-2 fill-primary" />
              )}
              Try Demo — no sign up needed
            </Button>
            <div className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
