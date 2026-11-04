import { useState } from 'react';
import { Bot, Headphones, ShieldCheck, CheckCircle2, LayoutDashboard, Truck, Smartphone, Sparkles } from 'lucide-react';
import { MOCK_LOADS } from '@/mocks/loads';
import { StatusBadge } from '@/components/shared/StatusBadge';

export function PlatformSection() {
  const [activeTab, setActiveTab] = useState<'dispatch' | 'board' | 'fleet' | 'driver' | 'customer'>('dispatch');

  return (
    <section
      id="platform"
      className="py-24 lg:py-32 bg-[#F5F7FA] text-[#142B45] border-t border-[#E5EAF0] scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Heading */}
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
            TruckFlow Platform
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
            One Connected Platform for Dispatch and Fleet Operations.
          </h2>
          <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
            Purpose-built operational interfaces connecting dispatchers, fleet directors, drivers and
            shippers into one synchronized logistical ecosystem.
          </p>
        </div>

        {/* Live Interface Preview Window (Phase 1 Real Data) */}
        <div className="space-y-6 pt-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-[#142B45]">Interactive Workspace Showcase</h3>
              <p className="text-sm text-[#536477] mt-1">
                Explore live demonstration interfaces used by each operational role across the platform.
              </p>
            </div>

            {/* Tab Buttons for 5 Interfaces */}
            <div className="flex flex-wrap items-center gap-1.5 bg-white p-1.5 rounded-2xl border border-[#E5EAF0] shadow-2xs">
              {[
                { id: 'dispatch' as const, label: 'Dispatcher Dashboard', icon: LayoutDashboard },
                { id: 'board' as const, label: 'Dispatch Board', icon: Bot },
                { id: 'fleet' as const, label: 'Fleet Overview', icon: Truck },
                { id: 'driver' as const, label: 'Driver Portal', icon: Smartphone },
                { id: 'customer' as const, label: 'Customer Tracking', icon: Headphones },
              ].map(tab => {
                const TabIcon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeTab === tab.id
                        ? 'bg-[#183153] text-white shadow-xs'
                        : 'text-[#536477] hover:text-[#142B45] hover:bg-[#F5F7FA]'
                    }`}
                  >
                    <TabIcon size={14} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-[#E5EAF0] bg-white shadow-xl overflow-hidden">
            {/* Top Chrome Header */}
            <div className="px-6 py-4 bg-[#183153] text-white flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="w-3 h-3 rounded-full bg-[#D94A4A]" />
                <span className="w-3 h-3 rounded-full bg-[#D99A25]" />
                <span className="w-3 h-3 rounded-full bg-[#16A36A]" />
                <span className="ml-3 font-mono text-xs text-[#8BAFD4] hidden sm:inline">
                  truckflow.app/{activeTab}
                </span>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#8BAFD4] bg-white/10 px-3 py-1 rounded-full">
                <Sparkles size={12} className="text-[#3976A8]" />
                Operational Demonstration Preview
              </span>
            </div>

            {/* Tab 1: Dispatcher Dashboard */}
            {activeTab === 'dispatch' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
                    <span className="text-xs font-bold uppercase text-[#536477]">Total Loads</span>
                    <div className="text-3xl font-extrabold text-[#142B45] mt-1">128</div>
                    <span className="text-xs text-[#16A36A] font-semibold">+12% vs last week</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
                    <span className="text-xs font-bold uppercase text-[#536477]">Active Loads</span>
                    <div className="text-3xl font-extrabold text-[#142B45] mt-1">36</div>
                    <span className="text-xs text-[#3976A8] font-semibold">In transit</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
                    <span className="text-xs font-bold uppercase text-[#536477]">Available Trucks</span>
                    <div className="text-3xl font-extrabold text-[#16A36A] mt-1">18</div>
                    <span className="text-xs text-[#16A36A] font-semibold">75% capacity ready</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
                    <span className="text-xs font-bold uppercase text-[#536477]">Delayed Loads</span>
                    <div className="text-3xl font-extrabold text-[#D94A4A] mt-1">04</div>
                    <span className="text-xs text-[#D94A4A] font-semibold">Weather alerts</span>
                  </div>
                </div>

                <div className="border border-[#E5EAF0] rounded-2xl overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F5F7FA] border-b border-[#E5EAF0] text-[#536477] uppercase font-bold text-[11px]">
                        <th className="p-4">Load ID</th>
                        <th className="p-4">Customer</th>
                        <th className="p-4">Route</th>
                        <th className="p-4">Assigned Unit</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E5EAF0]">
                      {MOCK_LOADS.slice(0, 4).map(load => (
                        <tr key={load.id} className="hover:bg-[#F5F7FA]/70 transition-colors">
                          <td className="p-4 font-mono font-bold text-[#3976A8]">{load.id}</td>
                          <td className="p-4 font-semibold text-[#142B45]">{load.customerName}</td>
                          <td className="p-4 text-[#536477]">
                            {load.pickup} → {load.destination}
                          </td>
                          <td className="p-4 font-mono text-[#142B45]">
                            {load.truckNumber ?? 'Pending'} ({load.driverName ?? 'Unassigned'})
                          </td>
                          <td className="p-4">
                            <StatusBadge status={load.status} type="load" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tab 2: Dispatch Board (Matching Recommendations) */}
            {activeTab === 'board' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-5 rounded-2xl bg-[#EFF6FF] border border-[#BFDBFE] flex items-start gap-4">
                  <Bot size={24} className="text-[#3976A8] flex-shrink-0 mt-1" />
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#183153] text-sm">Agentic Load Assignment Recommendation</h4>
                    <p className="text-xs text-[#1E40AF]">
                      Algorithm identified optimal pair for <strong>Load TF-1040</strong> (Columbus, OH → Pittsburgh, PA) with <strong>TRK-001</strong> (Freightliner Cascadia, 18 mi deadhead, driver rested).
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl border border-[#E5EAF0] bg-[#F5F7FA] space-y-3">
                    <span className="text-xs font-bold text-[#536477] uppercase">Load Requirements</span>
                    <div className="text-base font-bold text-[#142B45]">TF-1040 • 8,750 lbs Electronics</div>
                    <div className="text-xs text-[#536477]">Pickup: Columbus, OH (Today 09:15) → Delivery: Pittsburgh, PA</div>
                  </div>
                  <div className="p-5 rounded-2xl border border-[#BFDBFE] bg-white space-y-3">
                    <span className="text-xs font-bold text-[#3976A8] uppercase">Recommended Assignment</span>
                    <div className="text-base font-bold text-[#183153]">TRK-001 (James Walters)</div>
                    <div className="text-xs text-[#16A36A] font-semibold">100% Match • Low Deadhead • HOS Compliant</div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: Fleet Overview */}
            {activeTab === 'fleet' && (
              <div className="p-6 sm:p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { id: 'TRK-001', model: '2022 Freightliner Cascadia', status: 'AVAILABLE', loc: 'Columbus Depot' },
                    { id: 'TRK-003', model: '2023 Peterbilt 579', status: 'ASSIGNED', loc: 'Cleveland, OH' },
                    { id: 'TRK-005', model: '2022 Volvo VNL 860', status: 'ASSIGNED', loc: 'Toledo, OH' },
                  ].map((trk, i) => (
                    <div key={i} className="p-5 rounded-2xl border border-[#E5EAF0] bg-[#F5F7FA] space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-base text-[#3976A8]">{trk.id}</span>
                        <span className="text-[11px] font-bold text-[#16A36A] bg-[#ECFDF5] px-2.5 py-0.5 rounded-full">
                          {trk.status}
                        </span>
                      </div>
                      <div className="text-sm font-bold text-[#142B45]">{trk.model}</div>
                      <div className="text-xs text-[#536477]">Depot Location: {trk.loc}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Driver Mobile UI */}
            {activeTab === 'driver' && (
              <div className="p-8 flex flex-col items-center">
                <div className="max-w-sm w-full p-6 rounded-3xl border border-[#CBD5E1] bg-[#F5F7FA] shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8]">
                      Driver Active Assignment
                    </span>
                    <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A] animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-mono text-lg font-bold text-[#142B45]">TF-1042 • Chicago → Detroit</div>
                    <div className="text-xs text-[#536477]">Cargo: 18,500 lbs Industrial Equipment</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#EFF6FF] text-sm font-bold text-[#1E40AF] flex items-center justify-between">
                    <span>Confirm Arrival at Stop</span>
                    <CheckCircle2 size={18} />
                  </div>
                </div>
              </div>
            )}

            {/* Tab 5: Customer Tracking */}
            {activeTab === 'customer' && (
              <div className="p-6 sm:p-8 space-y-6">
                <div className="p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0] space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase text-[#536477]">Public Tracking Portal</span>
                      <h4 className="font-mono text-lg font-bold text-[#183153]">SHIPMENT #TF-1042</h4>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#ECFDF5] text-[#16A36A] border border-[#A7F3D0]">
                      ON SCHEDULE
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-semibold text-[#536477]">
                      <span>Chicago, IL (Picked Up)</span>
                      <span>ETA: 14:30 EST (Detroit, MI)</span>
                    </div>
                    <div className="h-2.5 bg-[#E5EAF0] rounded-full overflow-hidden">
                      <div className="h-full bg-[#3976A8] w-[68%] rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Operational Guardrails Banner */}
        <div className="p-6 rounded-2xl bg-white border border-[#E5EAF0] shadow-xs flex items-start gap-4">
          <ShieldCheck size={22} className="text-[#16A36A] flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-sm text-[#536477]">
            <strong className="text-[#142B45]">Operational Safety & Supervision:</strong> Dispatch recommendations
            are advisory and require human confirmation. Customer answers are bounded by verified shipment records, and
            telemetry tracking depends on valid carrier GPS feeds.
          </div>
        </div>
      </div>
    </section>
  );
}
