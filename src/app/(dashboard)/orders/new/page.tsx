// @ts-nocheck
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { 
  Briefcase, Mail, Globe, CheckCircle2, DollarSign, 
  Languages, FileText as Document, Save, CalendarIcon 
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useOrders } from "@/lib/context/OrderContext";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const formSchema = z.object({
  title: z.string().min(2, "Order Title is required"),
  code: z.string().min(2, "Project Code is required"),
  company: z.string().min(2, "Company Name is required"),
  email: z.string().email("Invalid email address"),
  deadline: z.date({
    required_error: "A deadline is required.",
  }),
  topic: z.string().optional(),
  type: z.string().min(2, "Content Type is required"),
  wordMin: z.string().min(1, "Required"),
  wordMax: z.string().min(1, "Required"),
});

export default function NewOrderPage() {
  const router = useRouter();
  const { addOrder } = useOrders();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Settings toggle states
  const [requireReview, setRequireReview] = useState(false);
  const [rushFees, setRushFees] = useState(false);
  const [languageVar, setLanguageVar] = useState(false);
  const [attachBriefs, setAttachBriefs] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      code: "",
      company: "",
      email: "",
      topic: "",
      type: "",
      wordMin: "",
      wordMax: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      addOrder({
        title: values.title,
        code: values.code,
        company: values.company,
        email: values.email,
        type: values.type,
        wordCount: `~${values.wordMax}`, 
        deadline: values.deadline,
      });

      setIsSubmitting(false);
      toast.success("Order has been created successfully!");
      router.push("/orders");
    }, 1000);
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Orders</h1>
        <div className="flex items-center text-sm text-gray-500 gap-2">
          <Link href="/orders" className="hover:text-gray-900 transition-colors">Orders</Link>
          <span className="font-semibold text-gray-400">/</span>
          <span className="font-semibold text-gray-900">New Order</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Main Form Area */}
        <div className="bg-white rounded-[20px] p-8 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Welcome To The New Order Page</h2>
            <p className="text-gray-500 text-sm">Please fill out the required project details to start drafting.</p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex flex-col">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-medium font-bold">Order Title <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Document className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="Blog Post on AI" className="pl-10 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-medium font-bold">Project Code <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="PRJ-102" className="pl-10 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-medium font-bold">Company Name / Client <span className="text-red-500">*</span></FormLabel>
                    <FormControl>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">
                          C
                        </div>
                        <Input placeholder="Wavespace" className="pl-11 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-medium font-bold">Contact Email <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                         <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="hello@example.com" className="pl-10 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deadline"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-gray-600 font-medium font-bold mt-2">Estimated Deadline <span className="text-red-500">*</span></FormLabel>
                      <Popover>
                        <FormControl>
                          <PopoverTrigger
                            className={cn(
                              "flex items-center w-full h-12 px-4 bg-white rounded-xl border border-gray-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary shadow-sm text-left font-normal text-sm transition-colors hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </PopoverTrigger>
                        </FormControl>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date < new Date(new Date().setHours(0, 0, 0, 0))
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-medium font-bold">Target Topic (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input placeholder="How AI is changing web development" className="pl-10 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-medium font-bold">Content Type <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Document className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                          <Input placeholder="Blog Post" className="pl-10 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wordMin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-medium font-bold">Word Count Min <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1000" className="px-4 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="wordMax"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-medium font-bold">Word Count Max <span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="1500" className="px-4 h-12 bg-white rounded-xl border-gray-200 focus-visible:ring-primary shadow-sm" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex items-center gap-4 pt-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="h-12 px-8 rounded-xl bg-[#FC4C31] hover:bg-[#E33B21] shadow-lg shadow-[#FC4C31]/20 font-semibold"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-2" />
                  ) : null}
                  {isSubmitting ? "Saving..." : "Submit Order"}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => router.back()}
                  className="h-12 px-8 rounded-xl border-gray-200 text-gray-600 font-semibold hover:bg-gray-50"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Right Settings Area */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-900 pl-1">Order Settings</h2>
          
          <div className="bg-white rounded-[20px] p-6 shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col gap-4">
            
            {/* Setting 1 */}
            <div 
              onClick={() => setRequireReview(!requireReview)}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border bg-white transition-colors cursor-pointer select-none",
                requireReview ? "border-primary" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center transition-colors", requireReview ? "border-primary/20 bg-primary/10" : "bg-gray-50 border-gray-100")}>
                  <CheckCircle2 className={cn("w-5 h-5", requireReview ? "text-primary" : "text-gray-600")} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Require Final Review</h3>
                  <p className="text-xs text-gray-500">Client must approve draft</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{requireReview ? "Yes" : "No"}</span>
                <Switch checked={requireReview} onCheckedChange={setRequireReview} />
              </div>
            </div>

            {/* Setting 2 */}
            <div 
              onClick={() => setRushFees(!rushFees)}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border bg-white transition-colors cursor-pointer select-none",
                rushFees ? "border-primary" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center transition-colors", rushFees ? "border-primary/20 bg-primary/10" : "bg-gray-50 border-gray-100")}>
                  <DollarSign className={cn("w-5 h-5", rushFees ? "text-primary" : "text-gray-600")} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Charge Rush Fees</h3>
                  <p className="text-xs text-gray-500">Percentage Or Flat-Rate Fees</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{rushFees ? "Yes" : "No"}</span>
                <Switch checked={rushFees} onCheckedChange={setRushFees} />
              </div>
            </div>

            {/* Setting 3 */}
            <div 
              onClick={() => setLanguageVar(!languageVar)}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border bg-white transition-colors cursor-pointer select-none",
                languageVar ? "border-primary" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center transition-colors", languageVar ? "border-primary/20 bg-primary/10" : "bg-gray-50 border-gray-100")}>
                  <Languages className={cn("w-5 h-5", languageVar ? "text-primary" : "text-gray-600")} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Language Variant</h3>
                  <p className="text-xs text-gray-500">USD, English</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{languageVar ? "Yes" : "No"}</span>
                <Switch checked={languageVar} onCheckedChange={setLanguageVar} />
              </div>
            </div>

            {/* Setting 4 */}
            <div 
              onClick={() => setAttachBriefs(!attachBriefs)}
              className={cn(
                "group flex items-center justify-between p-4 rounded-xl border bg-white transition-colors cursor-pointer select-none",
                attachBriefs ? "border-primary" : "border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-lg border flex items-center justify-center transition-colors", attachBriefs ? "border-primary/20 bg-primary/10" : "bg-gray-50 border-gray-100")}>
                  <Document className={cn("w-5 h-5", attachBriefs ? "text-primary" : "text-gray-600")} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm">Attach Brief/Assets</h3>
                  <p className="text-xs text-gray-500">Attach PDF/Docs to Order</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold">{attachBriefs ? "Yes" : "No"}</span>
                <Switch checked={attachBriefs} onCheckedChange={setAttachBriefs} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
