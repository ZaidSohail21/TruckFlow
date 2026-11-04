import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BRAND_IMAGE =
  'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80'; // Modern logistics depot & fleet transport

const BENEFITS = [
  {
    title: 'Simplified Dispatch Coordination',
    description:
      'Organize freight orders, match loads to ready trucks, and eliminate siloed spreadsheets with centralized digital boards.',
  },
  {
    title: 'Connected Fleet Operations',
    description:
      'Maintain continuous visibility into truck maintenance states, driver duty schedules, and operational availability.',
  },
  {
    title: 'Transparent Shipment Communication',
    description:
      'Keep drivers focused on driving and customers reliably informed through automated status tracking and supervised agent assistance.',
  },
];

export function BrandIntroduction() {
  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA] dark:bg-[#0f1620]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Editorial Visual */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#E2E8F0] dark:border-[#2d3f55]">
              <img
                src={BRAND_IMAGE}
                alt="Freight transport staging area with commercial freight vehicles"
                className="w-full h-[420px] object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#183153]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#8BAFD4] block">
                  Logistics Infrastructure
                </span>
                <p className="text-sm font-semibold mt-1">
                  Purpose-built for short-haul, regional, and over-the-road freight carriers.
                </p>
              </div>
            </div>
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <div className="inline-flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
                The Operational Backbone
              </span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#182230] dark:text-white leading-tight">
              One Platform. A More Connected Fleet.
            </h2>

            <p className="text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
              TruckFlow brings dispatch coordination, fleet visibility, driver communication, and
              intelligent operational assistance together in one unified platform. Designed to
              eliminate fractured phone calls, duplicate data entry, and manual status chasing.
            </p>

            {/* Benefit List */}
            <div className="space-y-4 pt-2">
              {BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] dark:text-[#93c5fd] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 size={15} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#182230] dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] mt-0.5 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#3976A8] dark:text-[#8BAFD4] hover:underline"
              >
                <span>Read more about our approach</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
