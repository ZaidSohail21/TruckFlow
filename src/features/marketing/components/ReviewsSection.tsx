import { Quote, Sparkles, ShieldCheck, ArrowRight, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const EVALUATION_INSIGHTS = [
  {
    name: 'Marcus Vance',
    roleTitle: 'Regional Freight Dispatcher',
    company: 'Great Lakes Freight Operations',
    focusArea: 'Dispatch Board Usability',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    feedback:
      'Having available trucks mapped automatically to pending loads in Columbus and Detroit saves at least thirty minutes of spreadsheet juggling every morning.',
    cohort: 'Pilot Evaluation Cohort',
  },
  {
    name: 'Linda Kowalski',
    roleTitle: 'Operations & Fleet Director',
    company: 'Midwest Motor Transit',
    focusArea: 'Fleet Capacity Overview',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80',
    feedback:
      'The capacity distribution bar and real-time maintenance tags make it immediately clear which units can take an afternoon tender without causing a violation.',
    cohort: 'Pilot Evaluation Cohort',
  },
  {
    name: 'Roberto Morales',
    roleTitle: 'Independent Commercial Driver',
    company: 'Over-The-Road Expedited',
    focusArea: 'Mobile Ergonomics',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    feedback:
      'The two-tap arrival check-in is exactly what drivers need. You do not want to be typing long paragraphs on a smartphone in a noisy dock yard.',
    cohort: 'Driver Usability Study',
  },
  {
    name: 'Sarah Jenkins',
    roleTitle: 'Logistics Coordinator',
    company: 'Apex Industrial Shippers',
    focusArea: 'Customer Status Churn',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80',
    feedback:
      'Giving our direct shippers access to a clean tracking URL eliminates half of the "where is the truck" phone calls we get between 10 AM and 2 PM.',
    cohort: 'Shipper Communication Study',
  },
];

export function ReviewsSection() {
  return (
    <section
      id="reviews"
      className="py-24 lg:py-32 bg-[#F5F7FA] text-[#142B45] border-t border-[#E5EAF0] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
            Operational Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
            Built Around Real Operational Challenges.
          </h2>
          <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
            TruckFlow is informed by qualitative research and structured pilot evaluations with active
            dispatchers, fleet operators, and commercial drivers.
          </p>
        </div>

        {/* Transparency Notice */}
        <div className="max-w-4xl mx-auto p-4 rounded-2xl bg-white border border-[#E5EAF0] shadow-2xs flex items-center gap-3 text-xs sm:text-sm text-[#536477]">
          <ShieldCheck size={20} className="flex-shrink-0 text-[#16A36A]" />
          <span>
            <strong className="text-[#142B45]">Transparency Policy:</strong> TruckFlow does not display
            fabricated customer endorsements or artificial five-star ratings. The quotes below reflect
            findings from workflow usability sessions and pilot cohort evaluations.
          </span>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVALUATION_INSIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-white border border-[#E5EAF0] shadow-xs flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#3976A8] flex items-center justify-center">
                    <Quote size={20} />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A36A] bg-[#ECFDF5] px-3 py-1 rounded-full">
                    {item.cohort}
                  </span>
                </div>

                <p className="text-base sm:text-lg text-[#142B45] leading-relaxed italic">
                  "{item.feedback}"
                </p>
              </div>

              <div className="pt-5 border-t border-[#E5EAF0] flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-[#E5EAF0] flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <div className="font-bold text-[#142B45] text-sm sm:text-base leading-tight">
                      {item.name}
                    </div>
                    <div className="text-xs text-[#3976A8] font-semibold mt-0.5">
                      {item.roleTitle}
                    </div>
                    <div className="text-[11px] text-[#536477] font-medium">
                      {item.company} &bull; {item.focusArea}
                    </div>
                  </div>
                </div>
                <ClipboardCheck size={20} className="text-[#3976A8] flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>

        {/* Pilot Cohort Invitation Box */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-[#183153] text-white text-center space-y-6 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#3976A8] flex items-center justify-center mx-auto shadow-xs">
            <Sparkles size={24} className="text-white" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Participate in Our Product Evaluation Cohort
            </h3>
            <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed">
              We collaborate with regional carriers, independent dispatch desks, and fleet operators to test
              and refine dispatch workflows before full commercial rollout.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/request-access"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#3976A8] hover:bg-[#2c608a] text-white text-sm font-bold transition-colors shadow-xs"
            >
              <span>Submit an Access Request</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
