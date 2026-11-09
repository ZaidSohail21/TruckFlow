import { useState, useMemo } from 'react';
import { 
  Plus, 
  Wrench, 
  MapPin, 
  ChevronRight
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatCard } from '@/components/shared/StatCard';
import { FilterBar } from '@/components/shared/FilterBar';
import { Modal } from '@/components/shared/Modal';
import { Drawer } from '@/components/shared/Drawer';
import { InfoRow } from '@/components/shared/InfoRow';
import { MOCK_TRUCKS } from '@/mocks/trucks';
import { MOCK_DRIVERS } from '@/mocks/drivers';
import type { Truck, TruckStatus } from '@/types';
import { toast } from 'sonner';

export function TrucksPage() {
  const [trucks, setTrucks] = useState<Truck[]>(MOCK_TRUCKS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTruck, setSelectedTruck] = useState<Truck | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [maintModalOpen, setMaintModalOpen] = useState(false);

  // New truck form state
  const [newTruck, setNewTruck] = useState({
    number: '',
    make: 'Freightliner',
    model: 'Cascadia',
    year: 2024,
    licensePlate: '',
    mileage: 12000,
  });

  const filteredTrucks = useMemo(() => {
    return trucks.filter(t => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        t.number.toLowerCase().includes(q) ||
        t.make.toLowerCase().includes(q) ||
        t.model.toLowerCase().includes(q) ||
        t.licensePlate.toLowerCase().includes(q) ||
        (t.lastLocation?.toLowerCase().includes(q) ?? false);
      const matchesStatus = !statusFilter || t.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [trucks, search, statusFilter]);

  const stats = useMemo(() => {
    const total = trucks.length;
    const available = trucks.filter(t => t.status === 'AVAILABLE').length;
    const assigned = trucks.filter(t => t.status === 'ASSIGNED').length;
    const maintenance = trucks.filter(t => t.status === 'MAINTENANCE').length;
    return { total, available, assigned, maintenance };
  }, [trucks]);

  const handleAddTruck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTruck.number || !newTruck.licensePlate) {
      toast.error('Please enter Truck Number and License Plate');
      return;
    }
    const created: Truck = {
      id: `trk-0${trucks.length + 1}`,
      number: newTruck.number.toUpperCase(),
      make: newTruck.make,
      model: newTruck.model,
      year: Number(newTruck.year),
      licensePlate: newTruck.licensePlate.toUpperCase(),
      status: 'AVAILABLE',
      driverId: null,
      lastLocation: 'Columbus Depot',
      mileage: Number(newTruck.mileage) || 0,
    };
    setTrucks(prev => [created, ...prev]);
    toast.success(`Truck ${created.number} added to fleet inventory.`);
    setAddModalOpen(false);
    setNewTruck({
      number: '',
      make: 'Freightliner',
      model: 'Cascadia',
      year: 2024,
      licensePlate: '',
      mileage: 12000,
    });
  };

  const handleSetMaintenance = (status: TruckStatus) => {
    if (!selectedTruck) return;
    setTrucks(prev => prev.map(t => t.id === selectedTruck.id ? { ...t, status } : t));
    setSelectedTruck(prev => prev ? { ...prev, status } : null);
    toast.success(`Truck ${selectedTruck.number} status updated to ${status}.`);
    setMaintModalOpen(false);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Fleet Trucks Inventory"
        subtitle="Maintain fleet assets, view telematics mileage, and schedule preventive servicing."
        actions={
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-3.5 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus size={15} />
            <span>Add Truck</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Fleet Units"
          value={stats.total}
          icon="Truck"
          description="Active registered tractors"
        />
        <StatCard
          title="Available for Dispatch"
          value={stats.available}
          icon="CheckCircle"
          variant="success"
          description="Ready in terminal yards"
        />
        <StatCard
          title="Dispatched / En Route"
          value={stats.assigned}
          icon="Navigation"
          description="Assigned to active loads"
        />
        <StatCard
          title="Servicing / Maintenance"
          value={stats.maintenance}
          icon="AlertTriangle"
          variant="warning"
          description="In depot or vendor shop"
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-5">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search truck #, make, model, license, location..."
          filters={[
            {
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: '' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'Assigned', value: 'ASSIGNED' },
                { label: 'Maintenance', value: 'MAINTENANCE' },
                { label: 'Unavailable', value: 'UNAVAILABLE' },
              ],
            },
          ]}
        />
      </div>

      {/* Table Card */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0]">Trucks List</span>
          <span className="text-xs text-[#94A3B8]">{filteredTrucks.length} unit{filteredTrucks.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#131b26] border-b border-[#F1F5F9] dark:border-[#243447]">
                {['Unit #', 'Make & Model', 'Year', 'License Plate', 'Status', 'Odometer', 'Current Driver', 'Base Location', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
              {filteredTrucks.map(truck => {
                const driver = MOCK_DRIVERS.find(d => d.id === truck.driverId);
                return (
                  <tr
                    key={truck.id}
                    onClick={() => setSelectedTruck(truck)}
                    className="hover:bg-[#F8FAFC] dark:hover:bg-[#131b26] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-[#3976A8] dark:text-[#93c5fd]">
                      {truck.number}
                    </td>
                    <td className="px-4 py-3 font-semibold text-[#182230] dark:text-[#e2e8f0]">
                      {truck.make} {truck.model}
                    </td>
                    <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                      {truck.year}
                    </td>
                    <td className="px-4 py-3 font-mono text-[#64748B] dark:text-[#94a3b8]">
                      {truck.licensePlate}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={truck.status} type="truck" />
                    </td>
                    <td className="px-4 py-3 font-mono text-[#182230] dark:text-[#e2e8f0]">
                      {truck.mileage.toLocaleString()} mi
                    </td>
                    <td className="px-4 py-3">
                      {driver ? (
                        <span className="font-medium text-[#182230] dark:text-[#e2e8f0]">{driver.name}</span>
                      ) : (
                        <span className="text-[#94A3B8] italic">Unassigned</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                      <div className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#3976A8] flex-shrink-0" />
                        <span>{truck.lastLocation || 'Yard'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ChevronRight size={14} className="text-[#CBD5E1]" />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Truck Detail Drawer */}
      <Drawer
        isOpen={!!selectedTruck}
        onClose={() => setSelectedTruck(null)}
        title={selectedTruck?.number ?? ''}
        subtitle={`${selectedTruck?.make} ${selectedTruck?.model} (${selectedTruck?.year})`}
        width="md"
      >
        {selectedTruck && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedTruck.status} type="truck" />
              <button
                onClick={() => setMaintModalOpen(true)}
                className="px-3 py-1.5 text-xs font-semibold bg-[#183153] hover:bg-[#12243d] text-white rounded-lg flex items-center gap-1.5 transition-colors"
              >
                <Wrench size={13} />
                <span>Service Status</span>
              </button>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Unit Specifications</h3>
              <InfoRow label="Make & Model" value={`${selectedTruck.make} ${selectedTruck.model}`} />
              <InfoRow label="Year" value={selectedTruck.year} />
              <InfoRow label="VIN / License" value={<span className="font-mono">{selectedTruck.licensePlate}</span>} />
              <InfoRow label="Odometer" value={`${selectedTruck.mileage.toLocaleString()} miles`} />
              <InfoRow label="Last Yard" value={selectedTruck.lastLocation} />
            </div>

            {/* Telematics & Inspection */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Maintenance & Compliance</h3>
              <InfoRow label="Next Oil Service" value="In 4,200 miles" />
              <InfoRow label="DOT Annual Inspection" value="Valid thru Nov 2027" />
              <InfoRow label="Tire Tread Depth" value="9/32'' (Good)" />
              <InfoRow label="Brake Lining" value="78% remaining" />
            </div>

            {/* Driver Link */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Assigned Operator</h3>
              <InfoRow 
                label="Driver" 
                value={
                  MOCK_DRIVERS.find(d => d.id === selectedTruck.driverId)?.name || 
                  <span className="text-[#94A3B8] italic">Unassigned (In Yard)</span>
                } 
              />
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Truck Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add New Truck to Fleet"
        subtitle="Register tractor unit and initiate compliance tracking."
        footer={
          <>
            <button
              onClick={() => setAddModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-[#64748B] hover:text-[#182230] dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTruck}
              className="px-4 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold"
            >
              Save Truck
            </button>
          </>
        }
      >
        <form onSubmit={handleAddTruck} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
                Truck Unit Number *
              </label>
              <input
                type="text"
                value={newTruck.number}
                onChange={e => setNewTruck(p => ({ ...p, number: e.target.value }))}
                placeholder="e.g. TRK-015"
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
                License Plate *
              </label>
              <input
                type="text"
                value={newTruck.licensePlate}
                onChange={e => setNewTruck(p => ({ ...p, licensePlate: e.target.value }))}
                placeholder="e.g. OH-TF015"
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">Make</label>
              <select
                value={newTruck.make}
                onChange={e => setNewTruck(p => ({ ...p, make: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              >
                <option value="Freightliner">Freightliner</option>
                <option value="Peterbilt">Peterbilt</option>
                <option value="Kenworth">Kenworth</option>
                <option value="Volvo">Volvo</option>
                <option value="Mack">Mack</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">Model</label>
              <input
                type="text"
                value={newTruck.model}
                onChange={e => setNewTruck(p => ({ ...p, model: e.target.value }))}
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">Year</label>
              <input
                type="number"
                value={newTruck.year}
                onChange={e => setNewTruck(p => ({ ...p, year: Number(e.target.value) }))}
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">Odometer (mi)</label>
            <input
              type="number"
              value={newTruck.mileage}
              onChange={e => setNewTruck(p => ({ ...p, mileage: Number(e.target.value) }))}
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
            />
          </div>
        </form>
      </Modal>

      {/* Maintenance Status Modal */}
      <Modal
        isOpen={maintModalOpen}
        onClose={() => setMaintModalOpen(false)}
        title={`Set Service Status for ${selectedTruck?.number}`}
        subtitle="Change unit operational status"
      >
        <div className="space-y-3">
          <p className="text-xs text-[#64748B] dark:text-[#94a3b8]">
            Select current operational readiness state for this tractor:
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSetMaintenance('AVAILABLE')}
              className="p-3 border border-emerald-300 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/30 rounded-lg text-left hover:bg-emerald-100 transition-colors"
            >
              <span className="block text-xs font-bold text-emerald-800 dark:text-emerald-300">Available</span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400">Ready for dispatch</span>
            </button>
            <button
              onClick={() => handleSetMaintenance('MAINTENANCE')}
              className="p-3 border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-left hover:bg-amber-100 transition-colors"
            >
              <span className="block text-xs font-bold text-amber-800 dark:text-amber-300">Maintenance</span>
              <span className="text-[11px] text-amber-600 dark:text-amber-400">Undergoing repairs</span>
            </button>
            <button
              onClick={() => handleSetMaintenance('UNAVAILABLE')}
              className="p-3 border border-rose-300 dark:border-rose-800 bg-rose-50 dark:bg-rose-950/30 rounded-lg text-left hover:bg-rose-100 transition-colors"
            >
              <span className="block text-xs font-bold text-rose-800 dark:text-rose-300">Out of Service</span>
              <span className="text-[11px] text-rose-600 dark:text-rose-400">Decommissioned / OOS</span>
            </button>
            <button
              onClick={() => handleSetMaintenance('ASSIGNED')}
              className="p-3 border border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/30 rounded-lg text-left hover:bg-blue-100 transition-colors"
            >
              <span className="block text-xs font-bold text-blue-800 dark:text-blue-300">Active Load</span>
              <span className="text-[11px] text-blue-600 dark:text-blue-400">Assigned en route</span>
            </button>
          </div>
        </div>
      </Modal>
    </PageContainer>
  );
}