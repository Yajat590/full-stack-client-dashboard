import Link from "next/link";
import { Waves, ArrowLeft } from "lucide-react";

export default function TermsPage() {
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
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">Terms of Service</h1>
          <p className="text-gray-400">Last updated: April 2026</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of terms</h2>
            <p>By accessing or using the ClienHub platform, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use the service.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Use of the service</h2>
            <p>ClienHub is a B2B SaaS client portal for agencies. You agree to use the service only for lawful purposes and in accordance with these terms. You are responsible for maintaining the confidentiality of your account credentials.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Intellectual property</h2>
            <p>All content, features, and functionality of the ClienHub platform are owned by ClienHub and are protected by applicable intellectual property laws. You may not copy, modify, or distribute any part of the service without explicit written permission.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Limitation of liability</h2>
            <p>Wavespace is provided "as is" without warranties of any kind. In no event shall Wavespace be liable for any indirect, incidental, special, or consequential damages arising from your use of the service.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Termination</h2>
            <p>We reserve the right to terminate or suspend your account at our discretion, with or without notice, for conduct that violates these terms or is harmful to other users, us, or third parties.</p>
          </section>
          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Contact</h2>
            <p>For questions about these terms, contact us at <span className="text-primary font-semibold">legal@clienhub.io</span>.</p>
          </section>
        </div>
      </main>
    </div>
  );
}
