import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';

const CTA_IMAGE =
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80'; // Industrial warehouse depot with tractor-trailer transport

export function CallToAction() {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden bg-[#0d1e33] text-white">
      {/* Background Logistics Image with Dark Deep-Navy Scrim */}
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src={CTA_IMAGE}
          alt="Modern commercial logistics distribution center"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1e33] via-[#0d1e33]/90 to-[#0d1e33]/95" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-[#8BAFD4] font-semibold">
          <Truck size={14} className="text-[#3976A8]" />
          <span>Operational Logistics Platform</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
          Ready to Move Your Operations Forward?
        </h2>

        <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
          Discover a more connected, human-supervised approach to truck dispatching and fleet
          management.
        </p>

        {/* Action Button Strip */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            to="/request-access"
            className="px-6 py-3.5 bg-[#3976A8] hover:bg-[#2c608a] text-white text-sm font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
          >
            <span>Request Access</span>
            <ArrowRight size={16} />
          </Link>

          <Link
            to="/platform"
            className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-xl border border-white/20 backdrop-blur-xs transition-colors"
          >
            Explore the Platform
          </Link>

          <Link
            to="/login"
            className="px-5 py-3.5 text-sm font-semibold text-[#8BAFD4] hover:text-white transition-colors"
          >
            Sign In to Workspace →
          </Link>
        </div>

        <div className="pt-6 flex items-center justify-center gap-2 text-xs text-[#94a3b8]">
          <ShieldCheck size={14} className="text-[#16A36A]" />
          <span>Role-based access control with administrative authorization</span>
        </div>
      </div>
    </section>
  );
}
