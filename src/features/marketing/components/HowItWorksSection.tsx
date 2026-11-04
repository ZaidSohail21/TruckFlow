import { FilePlus, Cpu, Smartphone, ShieldCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const STAGES = [
  {
    step: '01',
    title: 'Shipment Creation',
    subtitle: 'Order Intake & Specs',
    description:
      'Freight tenders are created with cargo dimensions, weight classes, specialized equipment requirements, and strict pickup/delivery time windows.',
    icon: FilePlus,
    badge: 'Tender Ingest',
  },
  {
    step: '02',
    title: 'Intelligent Assignment',
    subtitle: 'Human-Supervised Matching',
    description:
      'Algorithms calculate deadhead miles, driver hours of service (HOS), and vehicle maintenance to propose the optimal tractor-trailer pair.',
    icon: Cpu,
    badge: 'AI Recommendation',
  },
  {
    step: '03',
    title: 'Driver Coordination',
    subtitle: 'Mobile Web Check-Ins',
    description:
      'Drivers receive clear shipment instructions on their mobile device, confirming gate entry, departure, and proof-of-delivery milestones.',
    icon: Smartphone,
    badge: 'One-Tap Sync',
  },
  {
    step: '04',
    title: 'Visibility & Support',
    subtitle: 'Real-Time Telemetry',
    description:
      'Dispatchers monitor route progression across the central board while shippers access transparent, verified delivery updates automatically.',
    icon: ShieldCheck,
    badge: 'Live Operations',
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 lg:py-32 bg-white text-[#142B45] scroll-mt-24 border-t border-[#E5EAF0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 lg:space-y-24">
        {/* Section Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
            From Shipment Assignment to Final Delivery.
          </h2>
          <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
            A frictionless operational workflow engineered to remove manual phone tag, prevent deadhead waste,
            and keep every dispatch decision clear, audited, and accountable.
          </p>
        </div>

        {/* 4-Stage Connected Workflow Grid (Horizontal on Desktop, Vertical on Mobile) */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Line for Desktop */}
          <div className="hidden lg:block absolute top-16 left-12 right-12 h-0.5 bg-[#E5EAF0] -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STAGES.map((stage, idx) => {
              const Icon = stage.icon;

              return (
                <div
                  key={idx}
                  className="p-8 rounded-3xl bg-[#F5F7FA] border border-[#E5EAF0] shadow-xs flex flex-col justify-between space-y-6 hover:shadow-lg hover:border-[#3976A8] hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    {/* Step Indicator & Icon */}
                    <div className="flex items-center justify-between">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-[#E5EAF0] flex items-center justify-center text-[#183153] shadow-xs group-hover:bg-[#183153] group-hover:text-white transition-colors duration-200">
                        <Icon size={26} />
                      </div>
                      <span className="font-mono text-2xl font-black text-[#CBD5E1] group-hover:text-[#3976A8] transition-colors">
                        {stage.step}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3976A8]">
                        {stage.subtitle}
                      </span>
                      <h3 className="text-xl font-bold text-[#142B45] mt-1 leading-snug">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="text-sm text-[#536477] leading-relaxed font-normal">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E5EAF0] flex items-center justify-between text-xs font-semibold text-[#536477]">
                    <span className="px-2.5 py-1 rounded-md bg-white border border-[#E5EAF0] font-mono text-[10px] uppercase font-bold text-[#183153]">
                      {stage.badge}
                    </span>
                    <span className="text-[#3976A8] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      <span>Phase {idx + 1}</span>
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Bar */}
        <div className="p-8 rounded-3xl bg-[#183153] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold">Ready to see how TruckFlow handles your lane operations?</h4>
            <p className="text-sm text-[#cbd5e1]">
              Submit a request for our pilot review queue to test the dispatch and driver interface.
            </p>
          </div>
          <Link
            to="/request-access"
            className="px-7 py-3.5 bg-[#3976A8] hover:bg-[#2C5E87] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <span>Request Operational Access</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}