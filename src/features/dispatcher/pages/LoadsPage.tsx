import { useState, useMemo } from 'react';
import { Plus, ChevronRight, MapPin } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { FilterBar } from '@/components/shared/FilterBar';
import { Drawer } from '@/components/shared/Drawer';
import { InfoRow } from '@/components/shared/InfoRow';
import { MOCK_LOADS } from '@/mocks/loads';
import type { Load, LoadStatus } from '@/types';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

const STATUS_OPTIONS = [
  { label: 'All Statuses', value: '' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Assigned', value: 'ASSIGNED' },
  { label: 'In Transit', value: 'IN_TRANSIT' },
  { label: 'Delivered', value: 'DELIVERED' },
  { label: 'Delayed', value: 'DELAYED' },
  { label: 'Cancelled', value: 'CANCELLED' },
];

export function LoadsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedLoad, setSelectedLoad] = useState<Load | null>(null);

  const filtered = useMemo(() => {
    return MOCK_LOADS.filter(load => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        load.id.toLowerCase().includes(q) ||
        load.customerName.toLowerCase().includes(q) ||
        load.pickup.toLowerCase().includes(q) ||
        load.destination.toLowerCase().includes(q) ||
        (load.driverName?.toLowerCase().includes(q) ?? false) ||
        (load.truckNumber?.toLowerCase().includes(q) ?? false) ||
        load.commodity.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || load.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <PageContainer>
      <PageHeader
        title="Load Management"
        subtitle="Create, assign, and monitor all freight loads in the TruckFlow system."
        actions={
          <button
            type="button"
            onClick={() => toast.info('Full load creation form available in next sprint.')}
            className="px-3.5 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Plus size={15} />
            <span>Create Load</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="mb-5">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search load ID, customer, route, driver..."
          filters={[{
            label: 'Status',
            value: statusFilter,
            onChange: setStatusFilter,
            options: STATUS_OPTIONS,
          }]}
        />
      </div>

      {/* Summary badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        {STATUS_OPTIONS.slice(1).map(opt => {
          const count = MOCK_LOADS.filter(l => l.status === opt.value).length;
          return (
            <button
              key={opt.value}
              onClick={() => setStatusFilter(statusFilter === opt.value ? '' : opt.value)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold border transition-colors ${
                statusFilter === opt.value
                  ? 'bg-[#3976A8] border-[#3976A8] text-white'
                  : 'bg-white dark:bg-[#1a2332] border-[#E2E8F0] dark:border-[#2d3f55] text-[#64748B] dark:text-[#94a3b8] hover:border-[#3976A8]'
              }`}
            >
              {opt.label} ({count})
            </button>
          );
        })}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0]">Loads</span>
          <span className="text-xs text-[#94A3B8]">{filtered.length} record{filtered.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#131b26] border-b border-[#F1F5F9] dark:border-[#243447]">
                {['Load ID', 'Customer', 'Route', 'Driver / Truck', 'Commodity', 'Status', 'ETA', ''].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-[#94A3B8]">
                    No loads match your filters.
                  </td>
                </tr>
              ) : filtered.map(load => (
                <tr
                  key={load.id}
                  className="hover:bg-[#F8FAFC] dark:hover:bg-[#131b26] transition-colors cursor-pointer"
                  onClick={() => setSelectedLoad(load)}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-semibold text-[#3976A8] dark:text-[#93c5fd]">{load.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#182230] dark:text-[#e2e8f0]">{load.customerName}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-[#64748B] dark:text-[#94a3b8]">
                      <MapPin size={11} className="text-[#3976A8] flex-shrink-0" />
                      <span className="truncate max-w-[180px]">{load.pickup} → {load.destination}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {load.driverName ? (
                      <div>
                        <div className="font-medium text-[#182230] dark:text-[#e2e8f0]">{load.driverName}</div>
                        <div className="text-[11px] text-[#94A3B8] font-mono">{load.truckNumber}</div>
                      </div>
                    ) : (
                      <span className="text-[#94A3B8] italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">{load.commodity}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={load.status} type="load" />
                  </td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8] tabular-nums">
                    {load.eta ? formatDate(load.eta) : '—'}
                  </td>
                  <td className="px-4 py-3">
                    <ChevronRight size={14} className="text-[#CBD5E1]" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Load Detail Drawer */}
      <Drawer
        isOpen={!!selectedLoad}
        onClose={() => setSelectedLoad(null)}
        title={selectedLoad?.id ?? ''}
        subtitle={selectedLoad?.customerName}
        width="md"
      >
        {selectedLoad && (
          <div className="space-y-6">
            {/* Status & Actions */}
            <div className="flex items-center justify-between">
              <StatusBadge status={selectedLoad.status} type="load" />
              <div className="flex gap-2">
                <button
                  onClick={() => toast.info('Full load editing is a Phase 2 feature.')}
                  className="px-3 py-1.5 text-xs font-medium border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg hover:bg-[#F8FAFC] dark:hover:bg-[#243447] text-[#182230] dark:text-[#e2e8f0] transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => { setSelectedLoad(null); toast.success(`Load ${selectedLoad.id} actions saved.`); }}
                  className="px-3 py-1.5 text-xs font-semibold bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Route Section */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Route</h3>
              <div className="space-y-0">
                <InfoRow label="Pickup" value={selectedLoad.pickup} />
                <InfoRow label="Destination" value={selectedLoad.destination} />
                <InfoRow label="ETA" value={selectedLoad.eta ? formatDate(selectedLoad.eta) : '—'} />
              </div>
            </div>

            {/* Freight Details */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Freight Details</h3>
              <div className="space-y-0">
                <InfoRow label="Commodity" value={selectedLoad.commodity} />
                <InfoRow label="Weight" value={selectedLoad.weight} />
                <InfoRow label="Load ID" value={<span className="font-mono">{selectedLoad.id}</span>} />
                <InfoRow label="Created" value={formatDate(selectedLoad.createdAt)} />
              </div>
            </div>

            {/* Assignment */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Assignment</h3>
              <div className="space-y-0">
                <InfoRow label="Driver" value={selectedLoad.driverName ?? <span className="text-[#94A3B8] italic">Unassigned</span>} />
                <InfoRow label="Truck" value={selectedLoad.truckNumber ?? <span className="text-[#94A3B8] italic">Unassigned</span>} />
                <InfoRow label="Customer ID" value={<span className="font-mono">{selectedLoad.customerId}</span>} />
              </div>
            </div>

            {/* Change Status */}
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Update Status</h3>
              <div className="flex flex-wrap gap-2">
                {(['PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELIVERED', 'DELAYED', 'CANCELLED'] as LoadStatus[]).map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      toast.success(`Status change to ${s} would be saved to backend.`);
                    }}
                    className="px-3 py-1 text-[11px] font-semibold border border-[#E2E8F0] dark:border-[#2d3f55] rounded-full hover:bg-[#EFF6FF] dark:hover:bg-[#1e2d44] hover:border-[#3976A8] text-[#64748B] dark:text-[#94a3b8] transition-colors"
                  >
                    {s.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </PageContainer>
  );
}
