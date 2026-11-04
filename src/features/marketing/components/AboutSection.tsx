import { Target, Compass, Shield, Eye, Database, PhoneCall, Cpu } from 'lucide-react';

const ABOUT_PHOTO =
  'https://images.unsplash.com/photo-1501700493788-fa1a4fc9fe62?auto=format&fit=crop&w=1200&q=85'; // Modern commercial semi-truck traveling on daytime open highway

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Human Oversight',
    description: 'AI agents suggest and assist; human dispatchers retain complete authority over decisions.',
  },
  {
    icon: Eye,
    title: 'Operational Clarity',
    description: 'Interfaces present high-density logistical data in clean, readable layouts without cognitive clutter.',
  },
  {
    icon: Database,
    title: 'Reliable Information',
    description: 'Shipment records and driver availability are synchronized directly from verified carrier data.',
  },
  {
    icon: PhoneCall,
    title: 'Connected Communication',
    description: 'Drivers use lightweight mobile web check-ins, eliminating disruptive check-call churn.',
  },
  {
    icon: Cpu,
    title: 'Responsible AI Assistance',
    description: 'Machine intelligence is applied specifically to bottlenecks like load-matching and schedule risk.',
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-24 lg:py-32 bg-white text-[#142B45] border-t border-[#E5EAF0] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading & Narrative */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
              About TruckFlow
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
              Creating a More Connected Logistics Experience.
            </h2>

            <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
              TruckFlow is an intelligent truck dispatching and fleet management platform engineered
              to connect dispatchers, fleet directors, drivers and customers through a unified,
              responsible operational system.
            </p>

            {/* Mission & Vision Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0] space-y-2">
                <div className="flex items-center gap-2 text-[#3976A8]">
                  <Target size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#142B45]">
                    Our Mission
                  </span>
                </div>
                <p className="text-sm text-[#536477] leading-relaxed">
                  To simplify truck dispatching and fleet coordination through connected technology and
                  intelligent operational assistance.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0] space-y-2">
                <div className="flex items-center gap-2 text-[#16A36A]">
                  <Compass size={20} />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#142B45]">
                    Our Vision
                  </span>
                </div>
                <p className="text-sm text-[#536477] leading-relaxed">
                  To make fleet operations more transparent, coordinated, and efficient through
                  accessible logistics technology.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Professional Logistics Photography */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E5EAF0] group">
              <img
                src={ABOUT_PHOTO}
                alt="Modern commercial semi-truck traveling on daytime highway"
                className="w-full h-[460px] object-cover object-center transition-transform duration-500 group-hover:scale-102"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#142B45]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#8BAFD4] block">
                  Logistics Excellence
                </span>
                <p className="text-base font-semibold leading-snug">
                  Engineered to meet the real-world operational pace of modern carrier fleets.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Product Principles Grid */}
        <div className="pt-8 border-t border-[#E5EAF0] space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold text-[#142B45]">
              Core Product Principles
            </h3>
            <p className="text-base text-[#536477]">
              Every capability in TruckFlow is anchored by five fundamental commitments to operational clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRINCIPLES.map((principle, idx) => {
              const Icon = principle.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0] space-y-3 hover:border-[#3976A8] transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white text-[#3976A8] flex items-center justify-center shadow-2xs border border-[#E5EAF0]">
                    <Icon size={20} />
                  </div>
                  <h4 className="text-lg font-bold text-[#142B45]">{principle.title}</h4>
                  <p className="text-sm text-[#536477] leading-relaxed">
                    {principle.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
