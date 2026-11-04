import { useEffect } from 'react';
import { Target, Compass, Shield, Eye, Database, PhoneCall, Cpu, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Human Oversight',
    description:
      'AI agents propose and assist; human dispatchers retain complete authority over freight assignments, rates, and route changes.',
  },
  {
    icon: Eye,
    title: 'Operational Clarity',
    description:
      'Interfaces present high-density logistical data in clean, readable tables and cards, minimizing operational cognitive load.',
  },
  {
    icon: Database,
    title: 'Reliable Information',
    description:
      'Shipment records, driver statuses, and equipment availability are synchronized continuously without speculative filler.',
  },
  {
    icon: PhoneCall,
    title: 'Connected Communication',
    description:
      'Drivers access clean mobile web portals and customers check status autonomously, reducing disruptive phone chasing.',
  },
  {
    icon: Cpu,
    title: 'Responsible AI Assistance',
    description:
      'Machine intelligence is applied specifically to optimization bottlenecks like load-matching and schedule risk prediction.',
  },
];

export function AboutPage() {
  useEffect(() => {
    document.title = 'About TruckFlow — Mission, Vision & Logistics Philosophy';
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Hero Header */}
      <section className="py-20 lg:py-24 bg-[#183153] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3976A8]/40 border border-[#5b90bb]/40 text-[#c2dcfa]">
            About TruckFlow
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Building Connected Technology for Real Fleet Operations.
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            TruckFlow is an intelligent truck dispatching and fleet management software platform designed
            to bring operational efficiency, transparency, and human-supervised intelligence to commercial
            logistics.
          </p>
        </div>
      </section>

      {/* What is TruckFlow & The Problem */}
      <section className="py-16 lg:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="p-8 rounded-2xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#182230] dark:text-white">What is TruckFlow?</h2>
            <p className="text-sm text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
              TruckFlow is an operational web platform built specifically for small and medium-sized truck
              dispatch businesses and carrier fleets. Rather than replacing dispatchers, TruckFlow pairs
              dispatch desks with specialized AI agents that analyze load requirements, recommend suitable
              available trucks, collect driver progress updates, and answer customer shipment questions.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs space-y-4">
            <h2 className="text-xl font-bold text-[#182230] dark:text-white">
              The Challenges We Address
            </h2>
            <p className="text-sm text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
              Freight dispatching has historically suffered from fragmented tools: dispatchers switch between
              spreadsheets, phone calls, and isolated GPS portals. TruckFlow integrates these operational
              vectors into one structured system, reducing miscommunications, idle miles, and scheduling
              surprises.
            </p>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-2xl bg-[#EFF6FF] dark:bg-[#152336] border border-[#BFDBFE] dark:border-[#2d4363] space-y-3">
            <div className="flex items-center gap-2 text-[#1E40AF] dark:text-[#93c5fd]">
              <Target size={22} />
              <h3 className="text-lg font-bold">Our Mission</h3>
            </div>
            <p className="text-sm text-[#182230] dark:text-[#cbd5e1] leading-relaxed">
              To simplify truck dispatching and fleet coordination through connected technology and
              intelligent operational assistance.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-[#ECFDF5] dark:bg-[#0f241a] border border-[#A7F3D0] dark:border-[#1e4a35] space-y-3">
            <div className="flex items-center gap-2 text-[#065F46] dark:text-[#6ee7b7]">
              <Compass size={22} />
              <h3 className="text-lg font-bold">Our Vision</h3>
            </div>
            <p className="text-sm text-[#182230] dark:text-[#cbd5e1] leading-relaxed">
              To make fleet operations more transparent, coordinated, and efficient through accessible,
              trustworthy logistics technology.
            </p>
          </div>
        </div>

        {/* Core Product Principles */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
              Guiding Philosophy
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] dark:text-white">
              Core Product Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-[#182230] dark:text-white">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Strip */}
        <div className="p-8 rounded-2xl bg-[#183153] text-white flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold">Ready to see TruckFlow in action?</h3>
            <p className="text-xs text-[#cbd5e1]">
              Submit an access request for your dispatch desk or carrier fleet.
            </p>
          </div>
          <Link
            to="/request-access"
            className="px-6 py-3 bg-[#3976A8] hover:bg-[#2c608a] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 flex-shrink-0"
          >
            <span>Request Access</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </div>
  );
}
