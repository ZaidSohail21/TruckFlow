import { useState, useMemo } from 'react';
import { 
  Truck as TruckIcon, 
  User as UserIcon, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Filter
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { Modal } from '@/components/shared/Modal';
import { MOCK_LOADS } from '@/mocks/loads';
import { MOCK_DRIVERS } from '@/mocks/drivers';
import { MOCK_TRUCKS } from '@/mocks/trucks';
import type { Load, LoadStatus } from '@/types';
import { toast } from 'sonner';

interface ColumnDef {
  id: LoadStatus;
  title: string;
  bg: string;
  border: string;
  dot: string;
}

const COLUMNS: ColumnDef[] = [
  { id: 'PENDING', title: 'Pending Assignment', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-500' },
  { id: 'ASSIGNED', title: 'Assigned / Ready', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-500' },
  { id: 'IN_TRANSIT', title: 'In Transit', bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', dot: 'bg-indigo-500' },
  { id: 'DELAYED', title: 'Delayed / Exception', bg: 'bg-rose-500/10', border: 'border-rose-500/20', dot: 'bg-rose-500' },
  { id: 'DELIVERED', title: 'Delivered', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-500' },
];

export function DispatchBoardPage() {
  const [loads, setLoads] = useState<Load[]>(MOCK_LOADS);
  const [search, setSearch] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [selectedTruckId, setSelectedTruckId] = useState('');

  const availableDrivers = useMemo(() => MOCK_DRIVERS.filter(d => d.status === 'AVAILABLE'), []);
  const availableTrucks = useMemo(() => MOCK_TRUCKS.filter(t => t.status === 'AVAILABLE'), []);

  const filteredLoads = useMemo(() => {
    return loads.filter(l => {
      const q = search.toLowerCase();
      return !q || 
        l.id.toLowerCase().includes(q) ||
        l.customerName.toLowerCase().includes(q) ||
        l.pickup.toLowerCase().includes(q) ||
        l.destination.toLowerCase().includes(q) ||
        (l.driverName?.toLowerCase().includes(q) ?? false);
    });
  }, [loads, search]);

  const handleOpenAssign = (load: Load) => {
    setSelectedLoad(load);
    setSelectedDriverId(availableDrivers[0]?.id || '');
    setSelectedTruckId(availableTrucks[0]?.id || '');
    setAssignModalOpen(true);
  };

  const handleConfirmAssign = () => {
    if (!selectedLoad) return;
    const driver = MOCK_DRIVERS.find(d => d.id === selectedDriverId);
    const truck = MOCK_TRUCKS.find(t => t.id === selectedTruckId);

    setLoads(prev => prev.map(l => {
      if (l.id === selectedLoad.id) {
        return {
          ...l,
          status: 'ASSIGNED',
          driverId: driver?.id || null,
          driverName: driver?.name || null,
          truckId: truck?.id || null,
          truckNumber: truck?.number || null,
        };
      }
      return l;
    }));

    toast.success(`Load ${selectedLoad.id} successfully assigned to ${driver?.name || 'Driver'}`);
    setAssignModalOpen(false);
    setSelectedLoad(null);
  };

  const handleMoveStatus = (loadId: string, nextStatus: LoadStatus) => {
    setLoads(prev => prev.map(l => l.id === loadId ? { ...l, status: nextStatus } : l));
    toast.info(`Load ${loadId} moved to ${nextStatus.replace('_', ' ')}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Dispatch Board"
        subtitle="Manage end-to-end dispatch workflow, load assignments, and live status progression."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info('Auto-dispatch optimizer completed matching 3 loads.')}
              className="px-3.5 py-2 bg-gradient-to-r from-[#183153] to-[#3976A8] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
            >
              <Sparkles size={14} className="text-amber-300" />
              <span>AI Auto-Dispatch</span>
            </button>
          </div>
        }
      />

      {/* Quick Filter Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#1a2332] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[240px] max-w-md">
          <Filter size={15} className="text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search board by load, customer, or city..."
            className="w-full text-xs bg-transparent border-0 text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-3 text-xs text-[#64748B] dark:text-[#94a3b8]">
          <span>Total Loads: <strong className="text-[#182230] dark:text-white">{loads.length}</strong></span>
          <span className="text-[#CBD5E1] dark:text-[#475569]">|</span>
          <span>Pending: <strong className="text-amber-600 dark:text-amber-400">{loads.filter(l => l.status === 'PENDING').length}</strong></span>
          <span className="text-[#CBD5E1] dark:text-[#475569]">|</span>
          <span>Active: <strong className="text-indigo-600 dark:text-indigo-400">{loads.filter(l => l.status === 'IN_TRANSIT').length}</strong></span>
        </div>
      </div>

      {/* Kanban Board Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-6">
        {COLUMNS.map(col => {
          const colLoads = filteredLoads.filter(l => l.status === col.id);
          return (
            <div 
              key={col.id} 
              className="flex flex-col bg-[#F8FAFC] dark:bg-[#131b26] rounded-xl border border-[#E2E8F0] dark:border-[#243447] min-w-[280px] max-h-[calc(100vh-250px)]"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-[#E2E8F0] dark:border-[#243447] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${col.dot}`} />
                  <h3 className="text-xs font-bold text-[#182230] dark:text-[#e2e8f0]">{col.title}</h3>
                </div>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-full text-[#64748B] dark:text-[#94a3b8]">
                  {colLoads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="p-3 space-y-3 overflow-y-auto flex-1">
                {colLoads.length === 0 ? (
                  <div className="py-8 text-center text-xs text-[#94A3B8] border border-dashed border-[#CBD5E1] dark:border-[#2d3f55] rounded-lg">
                    No loads
                  </div>
                ) : (
                  colLoads.map(load => (
                    <div
                      key={load.id}
                      className="bg-white dark:bg-[#1a2332] rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] p-3.5 shadow-xs hover:border-[#3976A8] transition-all space-y-2.5"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="font-mono text-xs font-bold text-[#3976A8] dark:text-[#93c5fd]">
                            {load.id}
                          </span>
                          <p className="text-xs font-semibold text-[#182230] dark:text-white truncate max-w-[170px]">
                            {load.customerName}
                          </p>
                        </div>
                        <StatusBadge status={load.status} type="load" />
                      </div>

                      {/* Route */}
                      <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8] space-y-1 bg-[#F8FAFC] dark:bg-[#101722] p-2 rounded border border-[#F1F5F9] dark:border-[#1e2a3a]">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0" />
                          <span className="truncate">{load.pickup}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 flex-shrink-0" />
                          <span className="truncate">{load.destination}</span>
                        </div>
                      </div>

                      {/* Info Pills */}
                      <div className="flex items-center justify-between text-[11px] text-[#64748B] dark:text-[#94a3b8] pt-1">
                        <span>{load.commodity}</span>
                        <span className="font-medium text-[#182230] dark:text-[#cbd5e1]">{load.weight}</span>
                      </div>

                      {/* Driver & Truck */}
                      {load.driverName ? (
                        <div className="flex items-center justify-between text-[11px] pt-1 border-t border-[#F1F5F9] dark:border-[#243447]">
                          <div className="flex items-center gap-1 text-[#182230] dark:text-[#e2e8f0]">
                            <UserIcon size={12} className="text-[#3976A8]" />
                            <span className="truncate max-w-[110px]">{load.driverName}</span>
                          </div>
                          <div className="flex items-center gap-1 text-[#64748B] dark:text-[#94a3b8] font-mono">
                            <TruckIcon size={12} />
                            <span>{load.truckNumber}</span>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-1 border-t border-[#F1F5F9] dark:border-[#243447]">
                          <button
                            onClick={() => handleOpenAssign(load)}
                            className="w-full py-1.5 bg-[#EFF6FF] dark:bg-[#1e2d44] hover:bg-[#DBEAFE] text-[#3976A8] dark:text-[#93c5fd] rounded text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                          >
                            <Sparkles size={12} />
                            <span>Assign Driver & Truck</span>
                          </button>
                        </div>
                      )}

                      {/* Status Transition Actions */}
                      <div className="flex items-center justify-end gap-1.5 pt-1">
                        {load.status === 'ASSIGNED' && (
                          <button
                            onClick={() => handleMoveStatus(load.id, 'IN_TRANSIT')}
                            className="text-[10px] font-semibold px-2 py-1 bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 rounded hover:bg-indigo-100 flex items-center gap-1"
                          >
                            <span>Start Transit</span>
                            <ArrowRight size={10} />
                          </button>
                        )}
                        {load.status === 'IN_TRANSIT' && (
                          <button
                            onClick={() => handleMoveStatus(load.id, 'DELIVERED')}
                            className="text-[10px] font-semibold px-2 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 rounded hover:bg-emerald-100 flex items-center gap-1"
                          >
                            <CheckCircle2 size={10} />
                            <span>Mark Delivered</span>
                          </button>
                        )}
                        {load.status === 'DELAYED' && (
                          <button
                            onClick={() => handleMoveStatus(load.id, 'IN_TRANSIT')}
                            className="text-[10px] font-semibold px-2 py-1 bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 rounded hover:bg-blue-100"
                          >
                            Resume Transit
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Assignment Modal */}
      <Modal
        isOpen={assignModalOpen}
        onClose={() => setAssignModalOpen(false)}
        title={`Assign Load ${selectedLoad?.id}`}
        subtitle={`${selectedLoad?.pickup} → ${selectedLoad?.destination} (${selectedLoad?.commodity})`}
        footer={
          <>
            <button
              onClick={() => setAssignModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-[#64748B] hover:text-[#182230] dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAssign}
              className="px-4 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
            >
              Confirm Assignment
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-2.5">
            <Sparkles size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-800 dark:text-amber-300">
              <strong className="block font-semibold">AI Dispatch Recommendation</strong>
              Angela Brooks (TRK-009) is the highest match (96% compatibility) based on proximity to pickup ({selectedLoad?.pickup}) and remaining HOS cycle.
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1.5">
              Select Available Driver
            </label>
            <select
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg text-[#182230] dark:text-[#e2e8f0] focus:ring-2 focus:ring-[#3976A8]/30"
            >
              {availableDrivers.map(drv => (
                <option key={drv.id} value={drv.id}>
                  {drv.name} — {drv.currentLocation || 'Depot'} ({drv.licenseNumber})
                </option>
              ))}
              {availableDrivers.length === 0 && (
                <option value="">No drivers currently AVAILABLE</option>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1.5">
              Select Available Truck
            </label>
            <select
              value={selectedTruckId}
              onChange={(e) => setSelectedTruckId(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg text-[#182230] dark:text-[#e2e8f0] focus:ring-2 focus:ring-[#3976A8]/30"
            >
              {availableTrucks.map(trk => (
                <option key={trk.id} value={trk.id}>
                  {trk.number} ({trk.make} {trk.model}) — {trk.lastLocation}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}