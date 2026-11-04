import { Quote, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RESEARCH_INSIGHTS = [
  {
    topic: 'Dispatch Load Matching',
    insight:
      'Dispatchers spend up to 40% of their morning cross-referencing equipment availability across independent spreadsheets before assigning loads.',
    solutionDesign:
      'TruckFlow pairs pending loads with nearest ready trucks in one recommendation queue with human confirmation.',
    stakeholder: 'Operational Workflow Study',
  },
  {
    topic: 'Driver Transit Updates',
    insight:
      'Frequent phone calls to drivers while in transit introduce safety risks and disrupt route focus.',
    solutionDesign:
      'Touch-friendly mobile arrival check-ins allow drivers to confirm milestones in two taps without taking calls.',
    stakeholder: 'Driver Ergonomics Research',
  },
  {
    topic: 'Customer Inquiry Churn',
    insight:
      'Shippers and consignees regularly call dispatch desks simply to check whether a load has departed the pickup dock.',
    solutionDesign:
      'Self-service web tracking provides real-time waypoint progression, reducing repetitive status phone calls.',
    stakeholder: 'Shipper Communication Analysis',
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#111c2b] border-t border-[#E2E8F0] dark:border-[#1e3047]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] dark:text-[#93c5fd]">
            <Sparkles size={12} />
            <span>Research-Backed Product Architecture</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] dark:text-white tracking-tight">
            Built Around Real Operational Challenges.
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
            TruckFlow is shaped directly by operational research into the daily friction experienced by
            commercial dispatch desks, fleet managers, and long-haul drivers.
          </p>
        </div>

        {/* 3-Column Research Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {RESEARCH_INSIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#152336] shadow-xs flex flex-col justify-between space-y-6 group hover:border-[#3976A8] transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] flex items-center justify-center">
                    <Quote size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                    {item.stakeholder}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-[#182230] dark:text-white uppercase tracking-wide">
                    {item.topic}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] mt-2 leading-relaxed">
                    "{item.insight}"
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] dark:border-[#243447] space-y-1.5">
                <span className="text-[10px] font-bold uppercase text-[#16A36A]">
                  TruckFlow Solution Design:
                </span>
                <p className="text-xs text-[#182230] dark:text-[#cbd5e1] font-medium leading-relaxed">
                  {item.solutionDesign}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reviews Page Link */}
        <div className="text-center pt-2">
          <Link
            to="/reviews"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#CBD5E1] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-xs font-bold text-[#182230] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#243447] transition-colors shadow-2xs"
          >
            <span>Explore Pilot Evaluation & Research Feedback</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
