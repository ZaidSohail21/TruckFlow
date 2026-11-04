import { Check, X } from 'lucide-react';

const COMPARISONS = [
  {
    traditional: 'Fragmented coordination across spreadsheets & paper boards',
    truckflow: 'Centralized digital operational workspace with real-time status',
  },
  {
    traditional: 'Manual assignment decisions relying entirely on memory',
    truckflow: 'AI-assisted truck and driver matching recommendations',
  },
  {
    traditional: 'Disconnected phone calls and text chains during transit',
    truckflow: 'Coordinated driver updates through a dedicated mobile interface',
  },
  {
    traditional: 'Limited shipment visibility and frequent blind spots',
    truckflow: 'Unified shipment progress overview with waypoint milestones',
  },
  {
    traditional: 'Manual lookup and repetitive phone status inquiries',
    truckflow: 'Self-service customer tracking with authorized shipment data',
  },
];

export function WhyTruckFlow() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA] dark:bg-[#0f1620]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
            Operational Contrast
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] dark:text-white tracking-tight">
            Rethinking Everyday Fleet Operations.
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
            Comparing conventional dispatch methods with TruckFlow's connected software architecture.
          </p>
        </div>

        {/* Comparison Table / Matrix */}
        <div className="max-w-4xl mx-auto rounded-2xl border border-[#CBD5E1] dark:border-[#2d3f55] bg-white dark:bg-[#131d2a] shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 text-xs font-bold uppercase tracking-wider border-b border-[#E2E8F0] dark:border-[#2d3f55]">
            <div className="p-4 bg-[#F8FAFC] dark:bg-[#1a2638] text-[#64748B] dark:text-[#94a3b8] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#94A3B8]" />
              <span>Conventional Dispatch Process</span>
            </div>
            <div className="p-4 bg-[#183153] text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
              <span>The TruckFlow Approach</span>
            </div>
          </div>

          <div className="divide-y divide-[#F1F5F9] dark:divide-[#1e3047]">
            {COMPARISONS.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 md:grid-cols-2 text-xs sm:text-sm transition-colors hover:bg-[#F8FAFC] dark:hover:bg-[#1a2638]/50"
              >
                {/* Traditional Side */}
                <div className="p-4 sm:p-5 flex items-start gap-3 text-[#64748B] dark:text-[#94a3b8] border-b md:border-b-0 md:border-r border-[#E2E8F0] dark:border-[#2d3f55]">
                  <X size={16} className="text-[#94A3B8] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.traditional}</span>
                </div>

                {/* TruckFlow Side */}
                <div className="p-4 sm:p-5 flex items-start gap-3 font-semibold text-[#182230] dark:text-white bg-[#EFF6FF]/20 dark:bg-[#1e2d44]/10">
                  <Check size={16} className="text-[#16A36A] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item.truckflow}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
