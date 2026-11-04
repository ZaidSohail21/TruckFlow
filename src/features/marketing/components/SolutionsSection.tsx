import { LayoutDashboard, Truck, Smartphone, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROLES = [
  {
    title: 'Dispatchers',
    tag: 'LOGISTICS OPERATIONS',
    icon: LayoutDashboard,
    headline: 'Manage shipments, coordinate drivers and review assignment recommendations.',
    challenge:
      'High-pressure multi-tasking across disjointed load boards, text messages, and manual check-calls, causing assignment delays and deadhead miles.',
    solution:
      'Centralizes freight orders, evaluates equipment availability, and generates ranked load-to-truck recommendations with human approval.',
    capabilities: [
      'Visual dispatch board with live load assignment tools',
      'Deadhead reduction and equipment pairing recommendations',
      'Automated delay risk alerts with proactive rerouting cues',
    ],
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Dispatcher monitoring live freight operations at commercial terminal',
  },
  {
    title: 'Fleet Managers',
    tag: 'ASSET MANAGEMENT',
    icon: Truck,
    headline: 'Manage trucks, drivers and operational fleet information.',
    challenge:
      'Lack of centralized visibility into truck maintenance schedules, equipment readiness, odometer readings, and driver duty hours.',
    solution:
      'Consolidates registered equipment into a real-time fleet roster, tracking maintenance intervals, assigned drivers, and availability.',
    capabilities: [
      'Comprehensive fleet equipment inventory and license plate logs',
      'Availability distribution and maintenance status tracking',
      'Depot allocation and equipment readiness metrics',
    ],
    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Commercial fleet manager inspecting tractors in freight depot',
  },
  {
    title: 'Drivers',
    tag: 'MOBILE OPERATIONS',
    icon: Smartphone,
    headline: 'Access assignments and submit shipment progress updates through a responsive web experience.',
    challenge:
      'Distracting phone check-calls while driving, cumbersome paperwork, and delayed proof-of-delivery processing.',
    solution:
      'Delivers a fast, lightweight mobile web portal with large touch targets, allowing drivers to confirm arrival, log departure, and upload PODs in seconds.',
    capabilities: [
      'Mobile-first assignment cards with pickup & drop addresses',
      'Two-tap milestone check-ins (At Pickup, In Transit, At Destination)',
      'Direct dispatch phone link always visible on screen',
    ],
    image:
      'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Professional driver operating commercial tractor on highway',
  },
  {
    title: 'Customers & Shippers',
    tag: 'SHIPPER EXPERIENCE',
    icon: Globe,
    headline: 'Access authorized shipment information and delivery support.',
    challenge:
      'Constant uncertainty over freight location and delivery times, resulting in repetitive phone calls to carrier dispatch desks.',
    solution:
      'Provides an accessible public tracking portal where customers enter their load reference ID to see transit milestones and ETA updates.',
    capabilities: [
      'Public shipment tracking without mandatory account login',
      'Visual origin-to-destination milestone progression',
      'Authorized shipment support with seamless human handoff',
    ],
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Shipper logistics hub with global shipping containers',
  },
];

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="py-24 lg:py-32 bg-white text-[#142B45] border-t border-[#E5EAF0] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
            Solutions by Role
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
            Built Around the People Who Keep Freight Moving.
          </h2>
          <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
            TruckFlow is purpose-built to eliminate friction for every operational stakeholder across
            dispatching desks, depot yards, driver cabs, and shipper customer portals.
          </p>
        </div>

        {/* 4 Large Editorial Visual Panels (Alternating 2-column image/text layouts) */}
        <div className="space-y-20 lg:space-y-28">
          {ROLES.map((role, idx) => {
            const isReversed = idx % 2 === 1;
            const Icon = role.icon;

            return (
              <div
                key={idx}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual Image Container */}
                <div
                  className={`lg:col-span-6 relative group ${
                    isReversed ? 'lg:col-start-7' : 'lg:col-start-1'
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5EAF0] aspect-video sm:aspect-[16/10] bg-[#F5F7FA]">
                    <img
                      src={role.image}
                      alt={role.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    <div className="absolute bottom-5 left-5 right-5 text-white">
                      <span className="text-xs font-mono uppercase tracking-wider text-[#93c5fd]">
                        {role.tag}
                      </span>
                      <div className="text-lg sm:text-xl font-bold mt-1 text-white">
                        {role.title}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Narrative & Capabilities Panel */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isReversed ? 'lg:col-start-1' : 'lg:col-start-7'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#183153]">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8]">
                      Role Overview
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142B45] tracking-tight leading-snug">
                    {role.headline}
                  </h3>

                  <div className="space-y-4 pt-1">
                    <div className="p-4 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0] space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#D94A4A]">
                        The Challenge
                      </span>
                      <p className="text-sm text-[#536477] leading-relaxed">{role.challenge}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#16A36A]">
                        The TruckFlow Solution
                      </span>
                      <p className="text-sm text-[#142B45] font-medium leading-relaxed">{role.solution}</p>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2">
                    {role.capabilities.map((cap, ci) => (
                      <div key={ci} className="flex items-start gap-2.5 text-sm text-[#536477]">
                        <CheckCircle2 size={16} className="text-[#3976A8] flex-shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link
                      to="/request-access"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#3976A8] hover:text-[#183153] transition-colors group/link"
                    >
                      <span>Request access for {role.title} operations</span>
                      <ArrowRight size={15} className="transition-transform group-hover/link:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
