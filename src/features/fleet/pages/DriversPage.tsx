import { useState, useMemo } from 'react';
import { 
  UserPlus, 
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
import { MOCK_DRIVERS } from '@/mocks/drivers';
import { MOCK_TRUCKS } from '@/mocks/trucks';
import type { Driver, DriverStatus } from '@/types';
import { toast } from 'sonner';

export function DriversPage() {
  const [drivers, setDrivers] = useState<Driver[]>(MOCK_DRIVERS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedDriver, setSelectedDriver] = useState<Driver | null>(null);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // New driver form state
  const [newDriver, setNewDriver] = useState({
    name: '',
    email: '',
    phone: '',
    licenseNumber: '',
  });

  const filteredDrivers = useMemo(() => {
    return drivers.filter(d => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        d.name.toLowerCase().includes(q) ||
        d.email.toLowerCase().includes(q) ||
        d.phone.toLowerCase().includes(q) ||
        d.licenseNumber.toLowerCase().includes(q) ||
        (d.currentLocation?.toLowerCase().includes(q) ?? false);
      const matchesStatus = !statusFilter || d.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [drivers, search, statusFilter]);

  const stats = useMemo(() => {
    const total = drivers.length;
    const available = drivers.filter(d => d.status === 'AVAILABLE').length;
    const onDuty = drivers.filter(d => d.status === 'ON_DUTY').length;
    const offDuty = drivers.filter(d => d.status === 'OFF_DUTY' || d.status === 'ON_LEAVE').length;
    return { total, available, onDuty, offDuty };
  }, [drivers]);

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriver.name || !newDriver.licenseNumber) {
      toast.error('Please enter driver name and CDL license number');
      return;
    }
    const created: Driver = {
      id: `drv-00${drivers.length + 1}`,
      name: newDriver.name,
      email: newDriver.email || `${newDriver.name.toLowerCase().replace(' ', '.')}@truckflow.com`,
      phone: newDriver.phone || '+1 (555) 101-0099',
      licenseNumber: newDriver.licenseNumber.toUpperCase(),
      status: 'AVAILABLE',
      assignedTruckId: null,
      assignedLoadId: null,
      currentLocation: 'Columbus, OH',
    };
    setDrivers(prev => [created, ...prev]);
    toast.success(`Driver ${created.name} registered successfully.`);
    setAddModalOpen(false);
    setNewDriver({ name: '', email: '', phone: '', licenseNumber: '' });
  };

  const handleToggleStatus = (status: DriverStatus) => {
    if (!selectedDriver) return;
    setDrivers(prev => prev.map(d => d.id === selectedDriver.id ? { ...d, status } : d));
    setSelectedDriver(prev => prev ? { ...prev, status } : null);
    toast.success(`Status for ${selectedDriver.name} updated to ${status}.`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Driver Roster & HOS Compliance"
        subtitle="Track driver availability, Hours of Service compliance, and active trip assignments."
        actions={
          <button
            onClick={() => setAddModalOpen(true)}
            className="px-3.5 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <UserPlus size={15} />
            <span>Add Driver</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Roster"
          value={stats.total}
          icon="Users"
          description="Registered CDL drivers"
        />
        <StatCard
          title="Available for Loads"
          value={stats.available}
          icon="CheckCircle"
          variant="success"
          description="In duty cycle & rested"
        />
        <StatCard
          title="On Duty (En Route)"
          value={stats.onDuty}
          icon="Truck"
          description="Active on corridor dispatches"
        />
        <StatCard
          title="Off Duty / On Leave"
          value={stats.offDuty}
          icon="Clock"
          variant="warning"
          description="Mandatory reset or time off"
        />
      </div>

      {/* Filter Bar */}
      <div className="mb-5">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search driver name, CDL, phone, or location..."
          filters={[
            {
              label: 'Status',
              value: statusFilter,
              onChange: setStatusFilter,
              options: [
                { label: 'All Statuses', value: '' },
                { label: 'Available', value: 'AVAILABLE' },
                { label: 'On Duty', value: 'ON_DUTY' },
                { label: 'Off Duty', value: 'OFF_DUTY' },
                { label: 'On Leave', value: 'ON_LEAVE' },
              ],
            },
          ]}
        />
      </div>

      {/* Roster Table */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0]">Drivers Directory</span>
          <span className="text-xs text-[#94A3B8]">{filteredDrivers.length} driver{filteredDrivers.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#131b26] border-b border-[#F1F5F9] dark:border-[#243447]">
                {['Driver Name', 'CDL License', 'Contact Phone', 'Duty Status', 'Assigned Tractor', 'Active Load', 'Current Location', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
              {filteredDrivers.map(driver => {
                const truck = MOCK_TRUCKS.find(t => t.id === driver.assignedTruckId);
                const initials = driver.name.split(' ').map(n => n[0]).join('');

                return (
                  <tr
                    key={driver.id}
                    onClick={() => setSelectedDriver(driver)}
                    className="hover:bg-[#F8FAFC] dark:hover:bg-[#131b26] transition-colors cursor-pointer"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#183153] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {initials}
                        </div>
                        <div>
                          <div className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{driver.name}</div>
                          <div className="text-[11px] text-[#94A3B8]">{driver.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[#64748B] dark:text-[#94a3b8]">
                      {driver.licenseNumber}
                    </td>
                    <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                      {driver.phone}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={driver.status} type="driver" />
                    </td>
                    <td className="px-4 py-3">
                      {truck ? (
                        <div className="font-mono font-bold text-[#3976A8] dark:text-[#93c5fd]">
                          {truck.number}
                        </div>
                      ) : (
                        <span className="text-[#94A3B8] italic">None</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {driver.assignedLoadId ? (
                        <span className="font-mono px-2 py-0.5 bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 rounded font-semibold text-[11px]">
                          {driver.assignedLoadId}
                        </span>
                      ) : (
                        <span className="text-[#94A3B8] italic">Standby</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                      <div className="flex items-center gap-1">
                        <MapPin size={11} className="text-[#3976A8] flex-shrink-0" />
                        <span>{driver.currentLocation || 'Off-grid'}</span>
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

      {/* Driver Detail Drawer */}
      <Drawer
        isOpen={!!selectedDriver}
        onClose={() => setSelectedDriver(null)}
        title={selectedDriver?.name ?? ''}
        subtitle={selectedDriver?.licenseNumber}
        width="md"
      >
        {selectedDriver && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedDriver.status} type="driver" />
              <div className="flex gap-2">
                <button
                  onClick={() => handleToggleStatus(selectedDriver.status === 'AVAILABLE' ? 'ON_DUTY' : 'AVAILABLE')}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg transition-colors"
                >
                  Set {selectedDriver.status === 'AVAILABLE' ? 'On Duty' : 'Available'}
                </button>
              </div>
            </div>

            {/* Profile Overview */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Operator Record</h3>
              <InfoRow label="Full Name" value={selectedDriver.name} />
              <InfoRow label="Email Address" value={selectedDriver.email} />
              <InfoRow label="Contact Phone" value={selectedDriver.phone} />
              <InfoRow label="CDL Number" value={<span className="font-mono">{selectedDriver.licenseNumber}</span>} />
              <InfoRow label="CDL Class" value="Class A (Hazmat & Tanker Endorsed)" />
              <InfoRow label="Medical Card" value="Valid thru Dec 2027" />
            </div>

            {/* Hours of Service (HOS) Compliance */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">HOS Electronic Logbook</h3>
              <div className="p-3 bg-[#F8FAFC] dark:bg-[#131b26] rounded-lg border border-[#F1F5F9] dark:border-[#243447] space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B] dark:text-[#94a3b8]">11-Hour Driving Limit:</span>
                  <span className="font-semibold text-emerald-600">6h 45m left</span>
                </div>
                <div className="w-full bg-[#E2E8F0] dark:bg-[#2d3f55] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[60%]" />
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#64748B] dark:text-[#94a3b8]">14-Hour On-Duty Limit:</span>
                  <span className="font-semibold text-[#182230] dark:text-white">8h 15m left</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-[#64748B] dark:text-[#94a3b8]">70-Hour / 8-Day Cycle:</span>
                  <span className="font-semibold text-[#182230] dark:text-white">42h remaining</span>
                </div>
              </div>
            </div>

            {/* Active Assignment */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Equipment & Route</h3>
              <InfoRow 
                label="Assigned Tractor" 
                value={
                  MOCK_TRUCKS.find(t => t.id === selectedDriver.assignedTruckId)?.number || 
                  <span className="text-[#94A3B8] italic">Unassigned</span>
                } 
              />
              <InfoRow 
                label="Current Load" 
                value={
                  selectedDriver.assignedLoadId ? (
                    <span className="font-mono font-semibold text-[#3976A8]">{selectedDriver.assignedLoadId}</span>
                  ) : (
                    <span className="text-[#94A3B8] italic">No active load</span>
                  )
                } 
              />
              <InfoRow label="Location" value={selectedDriver.currentLocation || 'Off-grid'} />
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Driver Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Driver to Roster"
        subtitle="Onboard commercial driver with CDL and medical validation."
        footer={
          <>
            <button
              onClick={() => setAddModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-[#64748B] hover:text-[#182230] dark:hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleAddDriver}
              className="px-4 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold"
            >
              Register Driver
            </button>
          </>
        }
      >
        <form onSubmit={handleAddDriver} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Full Legal Name *
            </label>
            <input
              type="text"
              value={newDriver.name}
              onChange={e => setNewDriver(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Marcus Vance"
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
                CDL License Number *
              </label>
              <input
                type="text"
                value={newDriver.licenseNumber}
                onChange={e => setNewDriver(p => ({ ...p, licenseNumber: e.target.value }))}
                placeholder="e.g. OH-CDL-9988221"
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
                Phone Number
              </label>
              <input
                type="text"
                value={newDriver.phone}
                onChange={e => setNewDriver(p => ({ ...p, phone: e.target.value }))}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Work Email
            </label>
            <input
              type="email"
              value={newDriver.email}
              onChange={e => setNewDriver(p => ({ ...p, email: e.target.value }))}
              placeholder="e.g. m.vance@truckflow.com"
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
            />
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}