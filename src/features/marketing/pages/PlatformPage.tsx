import { useEffect } from 'react';
import { Bot, MessageSquare, Headphones, MapPin, ShieldCheck, ArrowRight, Info, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const AGENTS = [
  {
    icon: Bot,
    name: 'Dispatcher Agent',
    badge: 'Operational Decision Support',
    description:
      'Analyzes freight load specifications (weight, equipment requirements, pickup/drop coordinates) and evaluates available fleet trucks to produce ranked assignment recommendations.',
    guardrails: 'Every suggested load-to-truck assignment requires explicit dispatcher confirmation.',
    features: [
      'Load-to-truck capacity matching',
      'Deadhead reduction suggestions',
      'Human-confirmed assignment dispatch',
    ],
  },
  {
    icon: MessageSquare,
    name: 'Driver Communication Agent',
    badge: 'Mobile Transit Updates',
    description:
      'Provides a responsive mobile web interface where drivers confirm arrival at pickup, log departure, and submit proof-of-delivery (POD) documentation without voice disruption.',
    guardrails: 'Direct telephone dispatch hotline remains accessible at all times on the driver UI.',
    features: [
      'One-tap milestone check-ins',
      'Electronic POD documentation upload',
      'Real-time dispatch alert broadcasting',
    ],
  },
  {
    icon: Headphones,
    name: 'Customer Support Agent',
    badge: 'Authorized Shipment Q&A',
    description:
      'Answers customer questions about shipment departure, transit progress, and projected delivery windows using strictly authorized shipment records.',
    guardrails: 'Questions requiring rate changes, load modifications, or claims automatically hand off to human support.',
    features: [
      'Self-service tracking portal',
      'Automated milestone status answers',
      'Seamless human supervisor escalation',
    ],
  },
  {
    icon: MapPin,
    name: 'Fleet Tracking Dashboard',
    badge: 'Asset Visibility & Telematics',
    description:
      'Aggregates recorded fleet locations, mileage, and transit milestones into a clean operational dashboard for fleet managers and dispatchers.',
    guardrails: 'Telemetry visibility relies on active device connectivity and valid carrier location pings.',
    features: [
      'Fleet readiness & maintenance status',
      'Recorded waypoint transit timeline',
      'Depot and active asset distribution',
    ],
  },
];

export function PlatformPage() {
  useEffect(() => {
    document.title = 'TruckFlow Platform — AI Agents, Fleet Tracking & Architecture';
  }, []);

  return (
    <div className="flex flex-col w-full bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#183153] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3976A8]/40 border border-[#5b90bb]/40 text-[#c2dcfa]">
            Platform Overview
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Intelligent Logistics Architecture.
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] max-w-2xl mx-auto leading-relaxed">
            Four specialized operational modules designed to assist dispatchers, coordinate drivers,
            support customers, and maintain clear fleet visibility.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Core Agent Modules */}
        <div className="space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
              System Components
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#182230] dark:text-white">
              Specialized Operational Agents
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AGENTS.map((agent, i) => {
              const Icon = agent.icon;
              return (
                <div
                  key={i}
                  className="p-7 rounded-2xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] flex items-center justify-center">
                        <Icon size={24} />
                      </div>
                      <span className="text-[10px] font-bold text-[#16A36A] bg-[#ECFDF5] dark:bg-[#0d2a1e] px-2.5 py-0.5 rounded-full">
                        {agent.badge}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-[#182230] dark:text-white">{agent.name}</h3>
                      <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] mt-2 leading-relaxed">
                        {agent.description}
                      </p>
                    </div>

                    <div className="space-y-2 pt-2">
                      {agent.features.map((feat, fi) => (
                        <div key={fi} className="flex items-center gap-2 text-xs text-[#182230] dark:text-[#cbd5e1]">
                          <CheckCircle2 size={14} className="text-[#3976A8] flex-shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Safety & Operational Notice */}
                  <div className="pt-4 border-t border-[#F1F5F9] dark:border-[#1e3047] flex items-start gap-2 text-xs text-[#64748B] dark:text-[#94a3b8] bg-[#F8FAFC] dark:bg-[#182538] p-3 rounded-lg">
                    <ShieldCheck size={16} className="text-[#16A36A] flex-shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-[#182230] dark:text-white">Human Guardrail:</strong>{' '}
                      {agent.guardrails}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Operational Disclosures */}
        <div className="p-6 rounded-2xl bg-[#EFF6FF] dark:bg-[#152336] border border-[#BFDBFE] dark:border-[#2d4363] space-y-3 text-xs text-[#1E40AF] dark:text-[#93c5fd]">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Info size={16} />
            <span>Important Operational Transparency Disclosures</span>
          </div>
          <ul className="space-y-1.5 list-disc list-inside text-[#182230] dark:text-[#cbd5e1] leading-relaxed">
            <li>
              <strong>Dispatcher Supervision:</strong> AI dispatch recommendations assist decision-making but never execute without human authorization.
            </li>
            <li>
              <strong>Authorized Data Bounds:</strong> Customer Support responses are strictly generated from verified shipment records in the database.
            </li>
            <li>
              <strong>Telematics & Routing:</strong> Route projections, ETA calculations, and GPS coordinates depend on the availability and accuracy of external telematics and transit data.
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="p-8 rounded-2xl bg-[#183153] text-white flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Request Access for Your Team</h3>
            <p className="text-xs text-[#cbd5e1]">
              Join our evaluation cohort to explore the platform interface and agent workflows.
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
