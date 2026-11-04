import { useEffect } from 'react';
import { LayoutDashboard, Truck, Smartphone, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SOLUTIONS_DATA = [
  {
    role: 'Dispatchers',
    eyebrow: 'Operations & Freight Desk',
    icon: LayoutDashboard,
    challenge:
      'High-pressure multi-tasking across disjointed load boards, text messages, and manual check-calls, causing assignment delays and deadhead miles.',
    howTruckFlowHelps:
      'Provides a unified dispatch console with supervised load recommendations, active shipment status tracking, and direct driver milestone logging.',
    capabilities: [
      'Visual dispatch board with drag-and-drop readiness',
      'AI-assisted load-to-truck pairing recommendations',
      'Instant delay risk detection with automated dispatcher alerts',
      'Historical rate and assignment records',
    ],
  },
  {
    role: 'Fleet Managers',
    eyebrow: 'Asset & Equipment Management',
    icon: Truck,
    challenge:
      'Lack of centralized visibility into truck maintenance schedules, equipment readiness, odometer readings, and driver duty hours.',
    howTruckFlowHelps:
      'Consolidates registered equipment into a real-time fleet roster, tracking maintenance intervals, assigned drivers, and availability.',
    capabilities: [
      'Comprehensive fleet equipment inventory (make, model, year, plate)',
      'Availability distribution and maintenance status tracking',
      'Depot allocation and equipment readiness metrics',
      'Driver roster pairing and compliance tracking',
    ],
  },
  {
    role: 'Drivers',
    eyebrow: 'Mobile Operational Interface',
    icon: Smartphone,
    challenge:
      'Distracting phone check-calls while driving, cumbersome paperwork, and delayed proof-of-delivery processing.',
    howTruckFlowHelps:
      'Delivers a fast, lightweight mobile web portal with large touch targets, allowing drivers to confirm arrival, log departure, and upload PODs in seconds.',
    capabilities: [
      'Clear, mobile-first assignment cards with pickup & drop addresses',
      'One-tap milestone check-ins (At Pickup, Departed, At Destination)',
      'Electronic POD documentation camera upload',
      'Direct dispatch phone link always visible',
    ],
  },
  {
    role: 'Customers & Shippers',
    eyebrow: 'Self-Service Tracking & Support',
    icon: Globe,
    challenge:
      'Constant uncertainty over freight location and delivery times, resulting in repetitive phone calls to carrier dispatch desks.',
    howTruckFlowHelps:
      'Provides an accessible public tracking portal where customers enter their load reference ID to see transit milestones and ETA updates.',
    capabilities: [
      'Public shipment tracking without mandatory login',
      'Visual origin-to-destination milestone progress',
      'Estimated time of arrival (ETA) projections',
      'Direct carrier customer support coordination',
    ],
  },
];

export function SolutionsPage() {
  useEffect(() => {
    document.title = 'Solutions — Tailored for Dispatchers, Fleet Managers & Drivers';
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#183153] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3976A8]/40 border border-[#5b90bb]/40 text-[#c2dcfa]">
            Tailored Experiences
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Built for Every Role in Freight Operations.
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            Discover how TruckFlow addresses the unique daily friction points of dispatchers, fleet
            managers, commercial drivers, and cargo customers.
          </p>
        </div>
      </section>

      {/* Role Breakdown Sections */}
      <section className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {SOLUTIONS_DATA.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#F1F5F9] dark:border-[#1e3047]">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] flex items-center justify-center flex-shrink-0">
                    <Icon size={24} />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                      {item.eyebrow}
                    </span>
                    <h2 className="text-2xl font-bold text-[#182230] dark:text-white">{item.role}</h2>
                  </div>
                </div>

                <Link
                  to="/request-access"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#183153] dark:bg-[#3976A8] text-white text-xs font-semibold hover:bg-[#24426b] transition-colors self-start sm:self-auto"
                >
                  <span>Request {item.role} Access</span>
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Challenge vs How TruckFlow Helps */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-5 rounded-xl bg-[#FEF2F2] dark:bg-[#201518] border border-[#FECACA] dark:border-[#3d2025] space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#991B1B] dark:text-[#f87171]">
                    Operational Challenge
                  </h3>
                  <p className="text-xs sm:text-sm text-[#182230] dark:text-[#cbd5e1] leading-relaxed">
                    {item.challenge}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-[#ECFDF5] dark:bg-[#0f241a] border border-[#A7F3D0] dark:border-[#1e4a35] space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#065F46] dark:text-[#6ee7b7]">
                    How TruckFlow Helps
                  </h3>
                  <p className="text-xs sm:text-sm text-[#182230] dark:text-[#cbd5e1] leading-relaxed">
                    {item.howTruckFlowHelps}
                  </p>
                </div>
              </div>

              {/* Key Platform Capabilities */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#64748B] dark:text-[#94a3b8]">
                  Key Capabilities
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {item.capabilities.map((cap, ci) => (
                    <div
                      key={ci}
                      className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#1a2638] border border-[#E2E8F0] dark:border-[#2d3f55] flex items-center gap-2.5 text-xs text-[#182230] dark:text-white"
                    >
                      <CheckCircle2 size={15} className="text-[#16A36A] flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
