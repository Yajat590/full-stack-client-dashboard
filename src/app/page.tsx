import Link from "next/link";
import {
  Waves, ArrowRight, CheckCircle2, Zap, LayoutDashboard,
  Lock, FileText, Bell, BarChart2, Shield, Clock, Users
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0e14] text-white font-sans antialiased overflow-x-hidden">

      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0f0e14]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-[70px] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Waves strokeWidth={2.5} className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">ClienHub</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How it works</a>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-semibold text-gray-300 hover:text-white transition-colors px-4 py-2">
              Log in
            </Link>
            <Link href="/signup" className="text-sm font-bold bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-full transition-all shadow-lg shadow-primary/20">
              Get started →
            </Link>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-[140px] pb-24 px-6 relative overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute top-20 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full mb-6 tracking-wide uppercase">
              <Zap className="w-3 h-3" /> Client portal for agencies
            </div>
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] mb-6">
              Track every project,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400">
                delight every client.
              </span>
            </h1>
            <p className="text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-md">
              Give your clients a dedicated workspace to track deliverables, approve content, and stay in the loop — without a single email chain.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/signup" className="inline-flex items-center gap-2 h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide shadow-xl shadow-primary/25 transition-all">
                Start for free <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 h-14 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all">
                Client login
              </Link>
            </div>
            {/* Trust line */}
            <div className="flex items-center gap-6 mt-10 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> No credit card</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Free forever plan</div>
              <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Setup in 2 mins</div>
            </div>
          </div>

          {/* Right – floating dashboard mockup */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Main card */}
              <div className="bg-[#1c1b28] border border-white/10 rounded-3xl p-5 shadow-2xl shadow-black/50">
                {/* Header */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5">
                  <div>
                    <p className="text-xs text-gray-500 font-medium">Current projects</p>
                    <p className="text-white font-bold text-lg">7 active tasks</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <Waves className="w-4 h-4 text-primary" />
                  </div>
                </div>
                {/* Task items */}
                {[
                  { title: "Q3 Marketing Campaign", status: "In Progress", color: "bg-violet-500", pct: "65%" },
                  { title: "Weekly Newsletter", status: "Pending Review", color: "bg-amber-500", pct: "90%" },
                  { title: "Product Launch Press Release", status: "Completed", color: "bg-emerald-500", pct: "100%" },
                ].map((t, i) => (
                  <div key={i} className="mb-4 last:mb-0">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-sm font-semibold text-white">{t.title}</p>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${t.status === "Completed" ? "bg-emerald-500/10 text-emerald-400" : t.status === "Pending Review" ? "bg-amber-500/10 text-amber-400" : "bg-violet-500/10 text-violet-400"}`}>
                        {t.status}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-white/5">
                      <div className={`h-1.5 rounded-full ${t.color}`} style={{ width: t.pct }} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Floating notification card */}
              <div className="absolute -top-6 -right-6 bg-[#252432] border border-white/10 rounded-2xl px-4 py-3 shadow-xl flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Draft approved!</p>
                  <p className="text-xs text-gray-500">Social Media Pack</p>
                </div>
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 -left-6 bg-[#252432] border border-white/10 rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-xs text-gray-500 font-medium mb-0.5">Words delivered</p>
                <p className="text-xl font-extrabold text-white">142,<span className="text-primary">800</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS STRIP ── */}
      <section className="py-16 border-y border-white/5 bg-[#0f0e14]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: "500+", label: "Agencies onboarded" },
            { number: "12k+", label: "Tasks delivered" },
            { number: "98%", label: "Client satisfaction" },
            { number: "3 min", label: "Average setup time" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-4xl font-extrabold text-white mb-1">{s.number}</p>
              <p className="text-sm font-medium text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURES BENTO ── */}
      <section id="features" className="py-28 px-6 bg-[#0f0e14]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl mb-16">
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Why Wavespace</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              Everything your clients need, nothing they don't.
            </h2>
            <p className="text-gray-400 font-medium text-lg">Built for agencies who care deeply about the client experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Big card */}
            <div className="md:col-span-2 bg-[#1a1924] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Centralized client dashboard</h3>
              <p className="text-gray-400 leading-relaxed">One login. Every project. No more "what's the status?" messages. Clients see exactly where each task stands in real time — across every active engagement.</p>
            </div>

            <div className="bg-[#1a1924] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Bell className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart notifications</h3>
              <p className="text-gray-400 leading-relaxed">Clients get notified instantly when deliverables are ready for review or when a status changes.</p>
            </div>

            <div className="bg-[#1a1924] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Secure asset downloads</h3>
              <p className="text-gray-400 leading-relaxed">Completed content is available for one-click download, locked to the authenticated client only.</p>
            </div>

            <div className="md:col-span-2 bg-[#1a1924] border border-white/5 rounded-3xl p-8 hover:border-primary/20 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Live pipeline analytics</h3>
              <p className="text-gray-400 leading-relaxed">Track word counts delivered, deal velocity, and project completion rates across all client accounts from a single analytics view — no spreadsheets required.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS – dark panel ── */}
      <section id="how-it-works" className="py-4 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#1c1b28] border border-white/5 rounded-[40px] px-8 lg:px-16 py-20">
            <div className="max-w-xl mb-16">
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">How it works</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
                Live in minutes, not months.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  n: "01",
                  icon: <Users className="w-5 h-5" />,
                  title: "Create your workspace",
                  desc: "Sign up and set up your agency workspace in under 3 minutes. No technical knowledge required.",
                },
                {
                  n: "02",
                  icon: <Zap className="w-5 h-5" />,
                  title: "Invite your clients",
                  desc: "Each client gets a secure unique login to their own personalized portal showing only their projects.",
                },
                {
                  n: "03",
                  icon: <CheckCircle2 className="w-5 h-5" />,
                  title: "Deliver with confidence",
                  desc: "Push tasks through the pipeline. Clients get notified, approve drafts, and download finals — all in one place.",
                },
              ].map((step, i) => (
                <div key={i} className="relative bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden group hover:border-primary/30 transition-all">
                  {/* Big number watermark – visible emerald green in corner */}
                  <div className="absolute -top-4 -right-3 text-[110px] font-black text-emerald-400/20 leading-none select-none tracking-tighter">{step.n}</div>
                  {/* Step badge */}
                  <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/25 text-primary text-xs font-bold px-3 py-1 rounded-full mb-6 tracking-widest uppercase">
                    Step {i + 1}
                  </div>
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{step.desc}</p>
                  {/* Connector line (not on last) */}
                  {i < 2 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-primary/30 z-10" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECURITY SECTION ── */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Security first</p>
            <h2 className="text-4xl font-extrabold tracking-tight leading-tight mb-6">
              Your client data is<br />locked down by design.
            </h2>
            <p className="text-gray-400 font-medium leading-relaxed mb-8">
              ClienHub is built on PostgreSQL with Row-Level Security enabled at the database layer. Every client sees only their own data — it's mathematically impossible to see another client's projects.
            </p>
            <div className="space-y-4">
              {[
                { icon: <Shield className="w-6 h-6 text-primary" />, label: "Row-Level Security (RLS)", sub: "Data isolation enforced at the database layer" },
                { icon: <Lock className="w-6 h-6 text-primary" />, label: "JWT-based authentication", sub: "Powered by Supabase Auth with secure token rotation" },
                { icon: <Clock className="w-6 h-6 text-primary" />, label: "Session expiry & auto logout", sub: "Idle sessions automatically invalidated" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 p-5 bg-[#1a1924] border border-white/8 rounded-2xl hover:border-primary/25 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 group-hover:bg-primary/15 transition-colors">{item.icon}</div>
                  <div>
                    <p className="text-base font-bold text-white mb-0.5">{item.label}</p>
                    <p className="text-sm text-gray-400">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security visual – dashboard mockup card */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-sm">
              <div className="bg-[#1c1b28] border border-white/10 rounded-3xl p-6 shadow-2xl shadow-black/50">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-bold text-white">Security status</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" /> All systems nominal
                  </span>
                </div>
                {/* Security checks */}
                {[
                  { label: "RLS policies active", ok: true },
                  { label: "Authentication verified", ok: true },
                  { label: "Session valid", ok: true },
                  { label: "Data encrypted at rest", ok: true },
                ].map((check, i) => (
                  <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <span className="text-sm text-gray-300 font-medium">{check.label}</span>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Passed
                    </div>
                  </div>
                ))}
              </div>
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-black px-4 py-2 rounded-2xl shadow-xl shadow-primary/30">
                256-bit SSL
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-10 px-6 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-primary/20 via-[#1c1b28] to-blue-900/20 border border-primary/20 rounded-[40px] px-8 lg:px-20 py-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
            <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4 relative z-10">Get started today</p>
            <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 relative z-10">
              Your clients deserve<br />a better experience.
            </h2>
            <p className="text-gray-400 font-medium text-lg max-w-xl mx-auto mb-10 relative z-10">
              Set up your agency workspace in minutes. No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/signup" className="inline-flex items-center gap-2 h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-sm tracking-wide shadow-2xl shadow-primary/30 transition-all">
                Create free workspace <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/login" className="inline-flex items-center gap-2 h-14 px-8 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all">
                I already have an account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-primary" />
            <span className="text-white font-bold text-base tracking-tight">ClienHub</span>
          </div>
          <p>© {new Date().getFullYear()} ClienHub Agency Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <Link href="/login" className="hover:text-white transition-colors">Login</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
