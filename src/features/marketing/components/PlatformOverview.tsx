import { Bot, MapPinned, MessageSquare, Headphones, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const FEATURES = [
  {
    icon: Bot,
    title: 'AI-Powered Dispatch',
    eyebrow: 'Dispatcher Agent',
    description:
      'Assist dispatchers with intelligent truck and load recommendations while keeping final assignment decisions under human control.',
    colorClass: 'text-[#3976A8]',
    bgClass: 'bg-[#EFF6FF] dark:bg-[#1e2d44]',
    borderHover: 'hover:border-[#3976A8]',
  },
  {
    icon: MapPinned,
    title: 'Fleet Visibility',
    eyebrow: 'Tracking Telematics',
    description:
      'Access available fleet information, recorded shipment progress, and tracking milestones when valid location data is available.',
    colorClass: 'text-[#16A36A]',
    bgClass: 'bg-[#ECFDF5] dark:bg-[#0d2a1e]',
    borderHover: 'hover:border-[#16A36A]',
  },
  {
    icon: MessageSquare,
    title: 'Driver Communication',
    eyebrow: 'Driver Comms Agent',
    description:
      'Coordinate assignments, receive milestone delivery updates, and maintain operational communication with drivers on the road.',
    colorClass: 'text-[#D99A25]',
    bgClass: 'bg-[#FFFBEB] dark:bg-[#2a2010]',
    borderHover: 'hover:border-[#D99A25]',
  },
  {
    icon: Headphones,
    title: 'Customer Support',
    eyebrow: 'Customer Agent',
    description:
      'Help customers access authorized shipment information, check delivery ETAs, and receive relevant updates with human handoff.',
    colorClass: 'text-[#3976A8]',
    bgClass: 'bg-[#EFF6FF] dark:bg-[#1e2d44]',
    borderHover: 'hover:border-[#3976A8]',
  },
];

export function PlatformOverview() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-[#111c2b] border-y border-[#E2E8F0] dark:border-[#1e3047]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
            Four Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] dark:text-white tracking-tight">
            Everything Your Fleet Needs. In One Place.
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
            Task-focused AI agents operating within an integrated dashboard, delivering operational
            clarity from initial tender to final proof-of-delivery.
          </p>
        </div>

        {/* 4-Column Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#152336] shadow-2xs transition-all duration-200 ${feature.borderHover} flex flex-col justify-between group`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${feature.bgClass} ${feature.colorClass}`}
                    >
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#94a3b8]">
                      {feature.eyebrow}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#182230] dark:text-white leading-snug">
                    {feature.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#E2E8F0] dark:border-[#243447]">
                  <Link
                    to="/platform"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#3976A8] dark:text-[#8BAFD4] group-hover:underline"
                  >
                    <span>Explore capabilities</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
