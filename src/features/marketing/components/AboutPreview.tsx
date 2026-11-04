import { Compass, Target, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#111c2b] border-t border-[#E2E8F0] dark:border-[#1e3047]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Story & Positioning */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
              About TruckFlow
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] dark:text-white tracking-tight leading-tight">
              Building a Smarter Approach to Logistics.
            </h2>

            <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
              TruckFlow is an intelligent truck dispatching and fleet management platform designed to
              simplify transportation operations. By bringing dispatch coordination, fleet visibility,
              driver communication, and AI-assisted workflows together, TruckFlow aims to make
              logistics operations more organized, transparent, and efficient.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#152336] border border-[#E2E8F0] dark:border-[#2d3f55] space-y-2">
                <div className="flex items-center gap-2 text-[#3976A8]">
                  <Target size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Our Mission</span>
                </div>
                <p className="text-xs text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
                  To simplify truck dispatching and fleet coordination through connected technology and
                  intelligent operational assistance.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#152336] border border-[#E2E8F0] dark:border-[#2d3f55] space-y-2">
                <div className="flex items-center gap-2 text-[#16A36A]">
                  <Compass size={18} />
                  <span className="text-xs font-bold uppercase tracking-wider">Our Vision</span>
                </div>
                <p className="text-xs text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
                  To make fleet operations more transparent, coordinated, and efficient through
                  accessible logistics technology.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#183153] dark:bg-[#3976A8] text-white text-xs font-bold hover:bg-[#24426b] transition-colors shadow-xs"
              >
                <span>Read Full About Story</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Philosophy Box */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-[#183153] text-white shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3976A8]/20 rounded-full blur-2xl pointer-events-none" />

              <div className="w-10 h-10 rounded-xl bg-[#3976A8] flex items-center justify-center">
                <ShieldCheck size={22} className="text-white" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold">Our Philosophy</h3>
                <p className="text-xs text-[#cbd5e1] leading-relaxed">
                  We believe artificial intelligence should empower dispatchers rather than pretend to
                  replace human expertise. Every automated recommendation in TruckFlow remains subject
                  to dispatcher confirmation.
                </p>
              </div>

              <div className="space-y-2.5 pt-4 border-t border-white/10 text-xs text-[#8BAFD4]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
                  <span>Human-in-the-loop operational oversight</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
                  <span>Transparent tracking without fabricated metrics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#16A36A]" />
                  <span>Direct mobile communication with drivers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
