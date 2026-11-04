import { useEffect } from 'react';
import { Quote, Sparkles, ShieldCheck, ArrowRight, ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const EVALUATION_FEEDBACK = [
  {
    roleTitle: 'Regional Freight Dispatcher',
    focusArea: 'Dispatch Board Usability',
    feedback:
      'Having available trucks mapped automatically to pending loads in Columbus and Detroit saves at least thirty minutes of spreadsheet juggling every morning.',
    cohort: 'Pilot Evaluation Cohort',
  },
  {
    roleTitle: 'Operations & Fleet Manager',
    focusArea: 'Fleet Capacity Overview',
    feedback:
      'The capacity distribution bar and real-time maintenance tags make it immediately clear which units can take an afternoon tender without causing a violation.',
    cohort: 'Pilot Evaluation Cohort',
  },
  {
    roleTitle: 'Independent Commercial Driver',
    focusArea: 'Mobile Ergonomics',
    feedback:
      'The two-tap arrival check-in is exactly what drivers need. You do not want to be typing long paragraphs on a smartphone in a noisy dock yard.',
    cohort: 'Driver Usability Study',
  },
  {
    roleTitle: 'Logistics Coordinator',
    focusArea: 'Customer Status Churn',
    feedback:
      'Giving our direct shippers access to a clean tracking URL eliminates half of the "where is the truck" phone calls we get between 10 AM and 2 PM.',
    cohort: 'Shipper Communication Study',
  },
];

export function ReviewsPage() {
  useEffect(() => {
    document.title = 'TruckFlow — Pilot Feedback & Operational Usability Studies';
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#183153] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3976A8]/40 border border-[#5b90bb]/40 text-[#c2dcfa]">
            Operational Evaluation
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Designed Around Real Operational Feedback.
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            TruckFlow is evaluated continuously through structured usability research and pilot cohort
            sessions with active dispatchers, fleet operators, and commercial drivers.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Transparency Notice */}
        <div className="p-4 rounded-xl bg-[#EFF6FF] dark:bg-[#152336] border border-[#BFDBFE] dark:border-[#2d4363] flex items-center gap-3 text-xs text-[#1E40AF] dark:text-[#93c5fd]">
          <ShieldCheck size={18} className="flex-shrink-0 text-[#3976A8]" />
          <span>
            <strong>Transparency Notice:</strong> TruckFlow does not display fabricated commercial
            endorsements or artificial star ratings. The qualitative observations below reflect findings
            from structured workflow interviews and early pilot evaluations.
          </span>
        </div>

        {/* Feedback Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVALUATION_FEEDBACK.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-2xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] flex items-center justify-center">
                    <Quote size={18} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A36A] bg-[#ECFDF5] dark:bg-[#0d2a1e] px-2.5 py-0.5 rounded-full">
                    {item.cohort}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-[#182230] dark:text-white leading-relaxed italic">
                  "{item.feedback}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F1F5F9] dark:border-[#1e3047] flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-[#182230] dark:text-white">{item.roleTitle}</div>
                  <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">{item.focusArea}</div>
                </div>
                <ClipboardCheck size={16} className="text-[#3976A8]" />
              </div>
            </div>
          ))}
        </div>

        {/* Pilot Cohort Invitation Box */}
        <div className="p-8 sm:p-10 rounded-3xl bg-[#183153] text-white text-center space-y-6 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-[#3976A8] flex items-center justify-center mx-auto">
            <Sparkles size={24} className="text-white" />
          </div>

          <div className="space-y-2 max-w-xl mx-auto">
            <h2 className="text-2xl font-bold">Participate in Our Product Evaluation Cohort</h2>
            <p className="text-xs sm:text-sm text-[#cbd5e1] leading-relaxed">
              We are actively collaborating with regional dispatch businesses, fleet managers, and owner-operators
              to test new capabilities before commercial rollout.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/request-access"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3976A8] hover:bg-[#2c608a] text-white text-xs font-bold transition-colors shadow-xs"
            >
              <span>Submit an Access Request</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
