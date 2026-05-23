import Link from "next/link";
import { Waves, ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0f0e14] text-white">
      {/* Nav */}
      <nav className="border-b border-white/5 bg-[#0f0e14]/80 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-6 h-[70px] flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Waves strokeWidth={2.5} className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">ClienHub</span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to home
          </Link>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-20">
        <div className="mb-12">
          <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">Legal</p>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-gray-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Information we collect</h2>
            <p>When you create an account with ClienHub, we collect your email address, full name, and optionally your phone number. We also collect usage data including project activity, task status changes, and login timestamps to provide and improve our service.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. How we use your information</h2>
            <p>Your data is used exclusively to provide the ClienHub client portal service. We use your email for authentication and account-related notices. We never sell your personal data to third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Data security</h2>
            <p>All data is stored in a Supabase PostgreSQL database with Row-Level Security (RLS) enabled. This means every user's data is strictly isolated — no user can access another user's records. All connections are encrypted via SSL/TLS.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Data retention</h2>
            <p>Your data is retained for as long as your account is active. You may request deletion of your account and all associated data at any time by contacting support.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Contact</h2>
            <p>If you have any questions regarding this privacy policy, please reach out to us at <span className="text-primary font-semibold">support@clienhub.io</span>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
