import { useState } from 'react';
import { Eye, Filter } from 'lucide-react';
import { DataTable, type Column } from '@/components/tables/DataTable';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MOCK_LOADS } from '@/mocks/loads';
import type { Load } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { toast } from 'sonner';

export function ActiveLoadsPreview() {
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const filteredLoads = MOCK_LOADS.filter(load => {
    if (statusFilter === 'ALL') return true;
    return load.status === statusFilter;
  });

  const columns: Column<Load>[] = [
    {
      key: 'id',
      header: 'Load ID',
      sortable: true,
      render: load => (
        <span className="font-mono font-medium text-[12px] text-[#3976A8] dark:text-[#93c5fd]">
          {load.id}
        </span>
      ),
    },
    {
      key: 'customerName',
      header: 'Customer',
      sortable: true,
      render: load => (
        <span className="font-medium text-[#182230] dark:text-[#e2e8f0]">
          {load.customerName}
        </span>
      ),
    },
    {
      key: 'pickup',
      header: 'Pickup',
      render: load => (
        <span className="text-[#64748B] dark:text-[#94a3b8]">{load.pickup}</span>
      ),
    },
    {
      key: 'destination',
      header: 'Destination',
      render: load => (
        <span className="text-[#64748B] dark:text-[#94a3b8]">{load.destination}</span>
      ),
    },
    {
      key: 'truckNumber',
      header: 'Truck',
      render: load => (
        load.truckNumber ? (
          <span className="font-mono text-[11px] bg-[#F1F5F9] dark:bg-[#243447] text-[#182230] dark:text-[#e2e8f0] px-2 py-0.5 rounded">
            {load.truckNumber}
          </span>
        ) : (
          <span className="text-xs text-[#94A3B8] italic">Unassigned</span>
        )
      ),
    },
    {
      key: 'driverName',
      header: 'Driver',
      render: load => (
        load.driverName ? (
          <span className="text-xs text-[#182230] dark:text-[#e2e8f0]">{load.driverName}</span>
        ) : (
          <span className="text-xs text-[#94A3B8] italic">Unassigned</span>
        )
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: load => <StatusBadge status={load.status} type="load" />,
    },
    {
      key: 'eta',
      header: 'ETA',
      sortable: true,
      render: load => (
        <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
          {load.eta ? formatDateTime(load.eta) : '—'}
        </span>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      align: 'right',
      render: load => (
        <button
          type="button"
          onClick={e => {
            e.stopPropagation();
            toast.info(`Viewing details for ${load.id} (Planned for Phase 2)`);
          }}
          className="p-1.5 text-[#64748B] hover:text-[#3976A8] hover:bg-[#EFF6FF] dark:hover:bg-[#1e2d44] rounded-lg transition-colors cursor-pointer"
          title={`View Load ${load.id}`}
        >
          <Eye size={15} />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-[16px] font-bold text-[#182230] dark:text-[#e2e8f0]">
          Active Loads Preview
        </h2>
        <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
          Showing {filteredLoads.length} active records
        </span>
      </div>

      <DataTable
        columns={columns}
        data={filteredLoads}
        keyExtractor={load => load.id}
        searchPlaceholder="Search by ID, customer, city, truck..."
        searchFilter={(load, query) => {
          const q = query.toLowerCase();
          return (
            load.id.toLowerCase().includes(q) ||
            load.customerName.toLowerCase().includes(q) ||
            load.pickup.toLowerCase().includes(q) ||
            load.destination.toLowerCase().includes(q) ||
            (load.truckNumber?.toLowerCase().includes(q) ?? false) ||
            (load.driverName?.toLowerCase().includes(q) ?? false)
          );
        }}
        filters={
          <div className="flex items-center gap-1.5">
            <Filter size={14} className="text-[#94A3B8]" />
            {(['ALL', 'PENDING', 'ASSIGNED', 'IN_TRANSIT', 'DELAYED'] as const).map(status => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors cursor-pointer ${
                  statusFilter === status
                    ? 'bg-[#183153] text-white'
                    : 'bg-[#F1F5F9] dark:bg-[#243447] text-[#64748B] dark:text-[#94a3b8] hover:text-[#182230] dark:hover:text-[#e2e8f0]'
                }`}
              >
                {status === 'ALL' ? 'All' : status.replace('_', ' ')}
              </button>
            ))}
          </div>
        }
        pageSize={6}
        emptyTitle="No loads found"
        emptyDescription="No load records match your current filter or search criteria."
        onRowClick={load => {
          toast.info(`Load ${load.id} selected — Details panel in Phase 2`);
        }}
      />
    </div>
  );
}
