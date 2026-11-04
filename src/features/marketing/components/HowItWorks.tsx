import { FilePlus, Search, Navigation, CheckCircle2 } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Create a Shipment',
    description: 'Organize shipment information, pickup details, rate parameters, and delivery requirements.',
    icon: FilePlus,
  },
  {
    step: '02',
    title: 'Find the Right Assignment',
    description:
      'Receive assistance identifying suitable trucks and available drivers based on recorded operational data.',
    icon: Search,
  },
  {
    step: '03',
    title: 'Coordinate the Delivery',
    description:
      'Share assignment details and collect mobile driver updates throughout the journey from pickup to drop-off.',
    icon: Navigation,
  },
  {
    step: '04',
    title: 'Keep Everyone Informed',
    description:
      'Give dispatchers, management, and authorized customers access to relevant milestone and arrival information.',
    icon: CheckCircle2,
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#111c2b] border-y border-[#E2E8F0] dark:border-[#1e3047]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
            Operational Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] dark:text-white tracking-tight">
            From Dispatch to Delivery. Connected at Every Step.
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
            TruckFlow streamlines the entire freight lifecycle into four clear, connected stages.
          </p>
        </div>

        {/* Desktop Horizontal / Mobile Vertical Timeline */}
        <div className="relative">
          {/* Subtle Horizontal Connecting Bar (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-12 right-12 h-0.5 bg-[#E2E8F0] dark:bg-[#2d3f55] -translate-y-6 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F8FAFC] dark:bg-[#152336] border border-[#E2E8F0] dark:border-[#2d3f55] space-y-4 flex flex-col justify-between shadow-2xs group hover:border-[#3976A8] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] flex items-center justify-center font-bold">
                        <Icon size={22} />
                      </div>
                      <span className="font-mono text-xl font-black text-[#CBD5E1] dark:text-[#3d5a75]">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#182230] dark:text-white leading-snug">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#3976A8] dark:text-[#8BAFD4]">
                      Stage {item.step}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
