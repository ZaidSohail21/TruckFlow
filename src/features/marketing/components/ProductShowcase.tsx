import { useState } from 'react';
import { LayoutDashboard, Truck, Smartphone, Eye, Sparkles, CheckCircle2 } from 'lucide-react';
import { MOCK_LOADS } from '@/mocks/loads';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Link } from 'react-router-dom';

export function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<'dispatch' | 'fleet' | 'driver'>('dispatch');

  return (
    <section className="py-20 lg:py-28 bg-[#F5F7FA] dark:bg-[#0f1620]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#3976A8] dark:text-[#8BAFD4]">
            Operational Workspace
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#182230] dark:text-white tracking-tight">
            See Your Operations More Clearly.
          </h2>
          <p className="text-sm sm:text-base text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
            Bring shipment coordination, fleet capacity, and driver workflows together through one
            integrated workspace designed for modern dispatch desks.
          </p>

          {/* Interactive Preview Tabs */}
          <div className="pt-4 flex items-center justify-center gap-2">
            {[
              { id: 'dispatch' as const, label: 'Dispatcher Operations', icon: LayoutDashboard },
              { id: 'fleet' as const, label: 'Fleet Roster & Assets', icon: Truck },
              { id: 'driver' as const, label: 'Driver Mobile UI', icon: Smartphone },
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 border transition-colors cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#183153] dark:bg-[#3976A8] text-white border-transparent shadow-xs'
                      : 'bg-white dark:bg-[#1a2332] text-[#64748B] dark:text-[#94a3b8] border-[#E2E8F0] dark:border-[#2d3f55] hover:text-[#182230] dark:hover:text-white'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Live Interface Preview Window */}
        <div className="rounded-2xl border border-[#CBD5E1] dark:border-[#2d3f55] bg-white dark:bg-[#131d2a] shadow-2xl overflow-hidden">
          {/* Mock Browser/App Chrome Header */}
          <div className="px-5 py-3.5 bg-[#183153] text-white flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#D94A4A]" />
              <span className="w-3 h-3 rounded-full bg-[#D99A25]" />
              <span className="w-3 h-3 rounded-full bg-[#16A36A]" />
              <span className="ml-3 font-mono text-xs text-[#8BAFD4] hidden sm:inline">
                truckflow.app/dispatcher/dashboard
              </span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-[#8BAFD4] bg-white/10 px-2.5 py-0.5 rounded-full">
              <Sparkles size={11} className="text-[#3976A8]" />
              Phase 1 Interactive Preview (Sample Records)
            </span>
          </div>

          {/* Tab 1: Dispatcher Operations */}
          {activeTab === 'dispatch' && (
            <div className="p-6 space-y-6">
              {/* Stat Card Strip */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1a2638] border border-[#E2E8F0] dark:border-[#2d3f55]">
                  <span className="text-[11px] font-bold uppercase text-[#64748B]">Total Loads</span>
                  <div className="text-2xl font-bold text-[#182230] dark:text-white mt-1">128</div>
                  <span className="text-[10px] text-[#16A36A] font-semibold">+12% vs last week</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1a2638] border border-[#E2E8F0] dark:border-[#2d3f55]">
                  <span className="text-[11px] font-bold uppercase text-[#64748B]">Active Loads</span>
                  <div className="text-2xl font-bold text-[#182230] dark:text-white mt-1">36</div>
                  <span className="text-[10px] text-[#3976A8] font-semibold">In transit</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1a2638] border border-[#E2E8F0] dark:border-[#2d3f55]">
                  <span className="text-[11px] font-bold uppercase text-[#64748B]">Available Trucks</span>
                  <div className="text-2xl font-bold text-[#16A36A] mt-1">18</div>
                  <span className="text-[10px] text-[#16A36A] font-semibold">75% capacity ready</span>
                </div>
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#1a2638] border border-[#E2E8F0] dark:border-[#2d3f55]">
                  <span className="text-[11px] font-bold uppercase text-[#64748B]">Delayed Loads</span>
                  <div className="text-2xl font-bold text-[#D94A4A] mt-1">04</div>
                  <span className="text-[10px] text-[#D94A4A] font-semibold">Weather alerts</span>
                </div>
              </div>

              {/* Sample Operational Loads Preview Table */}
              <div className="border border-[#E2E8F0] dark:border-[#2d3f55] rounded-xl overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] dark:bg-[#1a2638] border-b border-[#E2E8F0] dark:border-[#2d3f55] text-[#64748B] uppercase font-bold text-[10px]">
                      <th className="p-3">Load ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Route</th>
                      <th className="p-3">Transport Unit</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
                    {MOCK_LOADS.slice(0, 4).map(load => (
                      <tr key={load.id} className="hover:bg-[#F8FAFC] dark:hover:bg-[#1a2638]/50">
                        <td className="p-3 font-mono font-bold text-[#3976A8]">{load.id}</td>
                        <td className="p-3 font-medium text-[#182230] dark:text-white">
                          {load.customerName}
                        </td>
                        <td className="p-3 text-[#64748B] dark:text-[#94a3b8]">
                          {load.pickup} → {load.destination}
                        </td>
                        <td className="p-3 font-mono text-[#182230] dark:text-[#cbd5e1]">
                          {load.truckNumber ?? 'Pending'} ({load.driverName ?? 'Unassigned'})
                        </td>
                        <td className="p-3">
                          <StatusBadge status={load.status} type="load" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 2: Fleet Roster & Capacity */}
          {activeTab === 'fleet' && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'TRK-001', model: '2022 Freightliner Cascadia', status: 'AVAILABLE', loc: 'Columbus Depot' },
                  { id: 'TRK-003', model: '2023 Peterbilt 579', status: 'ASSIGNED', loc: 'Cleveland, OH' },
                  { id: 'TRK-005', model: '2022 Volvo VNL 860', status: 'ASSIGNED', loc: 'Toledo, OH' },
                ].map((trk, i) => (
                  <div key={i} className="p-4 rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#1a2638] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm text-[#3976A8]">{trk.id}</span>
                      <span className="text-[10px] font-bold text-[#16A36A] bg-[#ECFDF5] px-2 py-0.5 rounded">
                        {trk.status}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-[#182230] dark:text-white">{trk.model}</div>
                    <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">Last Location: {trk.loc}</div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-center text-[#94a3b8] pt-2">
                Fleet managers track mileage, telematics, and maintenance intervals from one screen.
              </p>
            </div>
          )}

          {/* Tab 3: Driver Mobile Interface */}
          {activeTab === 'driver' && (
            <div className="p-6 flex flex-col items-center">
              <div className="max-w-sm w-full p-5 rounded-2xl border border-[#CBD5E1] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#1a2638] shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-[#3976A8]">Driver Active Assignment</span>
                  <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
                </div>
                <div className="space-y-1">
                  <div className="font-mono text-base font-bold text-[#182230] dark:text-white">TF-1042 • Chicago → Detroit</div>
                  <div className="text-xs text-[#64748B] dark:text-[#94a3b8]">Cargo: 18,500 lbs Industrial Equipment</div>
                </div>
                <div className="p-3 rounded-lg bg-[#EFF6FF] dark:bg-[#1e2d44] text-xs font-semibold text-[#1E40AF] dark:text-[#93c5fd] flex items-center justify-between">
                  <span>Arrival Check-in</span>
                  <CheckCircle2 size={16} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Link to Full Platform */}
        <div className="text-center pt-2">
          <Link
            to="/platform"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#3976A8] dark:text-[#8BAFD4] hover:underline"
          >
            <Eye size={15} />
            <span>Discover all operational views in the Platform section →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
