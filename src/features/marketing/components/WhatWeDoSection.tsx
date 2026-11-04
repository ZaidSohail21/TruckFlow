import { Cpu, Eye, Radio, Headphones, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const CAPABILITIES = [
  {
    id: 'dispatch',
    tag: '01 / DISPATCH INTELLIGENCE',
    title: 'AI-Assisted Dispatch',
    description:
      'Help dispatchers review suitable truck and load recommendations while keeping final assignment decisions under human control.',
    details: [
      'Automated load matching based on equipment specs, hours of service, and deadhead mileage.',
      'One-click assignment with transparent reasoning behind each recommendation.',
      'Dispatch board synchronizes instantaneously across all terminal operations.',
    ],
    icon: Cpu,
    image:
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Modern logistics dispatch terminal and freight routing center',
    badge: 'HUMAN SUPERVISED',
  },
  {
    id: 'fleet',
    tag: '02 / ASSET MANAGEMENT',
    title: 'Fleet Visibility',
    description:
      'Access recorded fleet information, shipment progress and available truck-location information.',
    details: [
      'Unified asset roster showing status: Available, In-Transit, Assigned, or Maintenance.',
      'Active route milestones with automated delay predictions and ETAs.',
      'Maintenance tracking linked directly to mileage logs and inspection schedules.',
    ],
    icon: Eye,
    image:
      'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Commercial tractor-trailers lined up at distribution terminal',
    badge: 'REAL-TIME TELEMETRY',
  },
  {
    id: 'driver',
    tag: '03 / MOBILE COORDINATION',
    title: 'Driver Communication',
    description:
      'Coordinate assignments and receive driver updates through a connected operational workflow.',
    details: [
      'Mobile-optimized web check-in portal requiring no cumbersome app store installations.',
      'One-tap departure, transit progress, and arrival status confirmations.',
      'Eliminates time-consuming check calls between drivers and dispatch offices.',
    ],
    icon: Radio,
    image:
      'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Commercial semi-truck en route on open interstate highway',
    badge: 'LIGHTWEIGHT MOBILE WEB',
  },
  {
    id: 'customer',
    tag: '04 / SHIPPER EXPERIENCE',
    title: 'Customer Support',
    description:
      'Help customers access authorized shipment information and relevant delivery updates.',
    details: [
      'Self-service tracking portal with strict privacy and organization boundaries.',
      'Live milestone updates and delivery timestamps without manual status requests.',
      'Direct customer portal reduces dispatch email volume by over 70%.',
    ],
    icon: Headphones,
    image:
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=85',
    imageAlt: 'Container freight terminal with global shipping containers',
    badge: 'SECURE PORTAL',
  },
];

export function WhatWeDoSection() {
  return (
    <section
      id="what-we-do"
      className="py-24 lg:py-32 bg-white text-[#142B45] scroll-mt-24 border-t border-[#E5EAF0]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        {/* Section Header: JUNA-style bold typography & whitespace */}
        <div className="max-w-3xl space-y-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
            What We Do
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
            Intelligent Technology for Everyday Fleet Operations.
          </h2>
          <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
            TruckFlow connects the essential parts of truck dispatching and fleet coordination,
            helping teams manage shipments, communicate with drivers and make better-informed
            operational decisions.
          </p>
        </div>

        {/* 4 Large Editorial Visual Capabilities (Alternating 2-column image/text layouts) */}
        <div className="space-y-20 lg:space-y-28">
          {CAPABILITIES.map((cap, index) => {
            const isReversed = index % 2 === 1;
            const Icon = cap.icon;

            return (
              <div
                key={cap.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Visual Imagery Panel (Large High-Res Photo + Overlay Badge) */}
                <div
                  className={`lg:col-span-7 relative group ${
                    isReversed ? 'lg:col-start-6' : 'lg:col-start-1'
                  }`}
                >
                  <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5EAF0] aspect-video sm:aspect-[16/10] bg-[#F5F7FA]">
                    <img
                      src={cap.image}
                      alt={cap.imageAlt}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                    {/* Badge Pill */}
                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-white/80 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
                      <span className="text-[11px] font-bold tracking-wider uppercase text-[#142B45]">
                        {cap.badge}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative & Capabilities Description */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    isReversed ? 'lg:col-start-1' : 'lg:col-start-8'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-center justify-center text-[#183153]">
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-wider text-[#3976A8] uppercase">
                      {cap.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#142B45] tracking-tight leading-snug">
                    {cap.title}
                  </h3>

                  <p className="text-base sm:text-lg text-[#536477] font-normal leading-relaxed">
                    {cap.description}
                  </p>

                  <ul className="space-y-3 pt-2">
                    {cap.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-3 text-sm text-[#536477]">
                        <ShieldCheck
                          size={18}
                          className="text-[#16A36A] flex-shrink-0 mt-0.5"
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2">
                    <Link
                      to="/request-access"
                      className="inline-flex items-center gap-2 text-sm font-bold text-[#3976A8] hover:text-[#183153] transition-colors group/link"
                    >
                      <span>Request operational access for this capability</span>
                      <ArrowRight
                        size={15}
                        className="transition-transform group-hover/link:translate-x-1"
                      />
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