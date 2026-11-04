import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { FleetOverviewCard } from '../components/FleetOverviewCard';
import { MOCK_FLEET_STATS, MOCK_TRUCKS } from '@/mocks/trucks';
import { MOCK_DRIVERS } from '@/mocks/drivers';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { DataTable, type Column } from '@/components/tables/DataTable';
import type { Truck } from '@/types';
import { Wrench } from 'lucide-react';
import { toast } from 'sonner';

export function FleetDashboard() {
  const truckColumns: Column<Truck>[] = [
    {
      key: 'number',
      header: 'Truck Unit',
      sortable: true,
      render: truck => (
        <span className="font-mono font-medium text-[12px] text-[#3976A8] dark:text-[#93c5fd]">
          {truck.number}
        </span>
      ),
    },
    {
      key: 'make',
      header: 'Make / Model',
      render: truck => (
        <span className="text-[#182230] dark:text-[#e2e8f0]">
          {truck.year} {truck.make} {truck.model}
        </span>
      ),
    },
    {
      key: 'licensePlate',
      header: 'License Plate',
      render: truck => (
        <span className="font-mono text-xs text-[#64748B] dark:text-[#94a3b8]">
          {truck.licensePlate}
        </span>
      ),
    },
    {
      key: 'lastLocation',
      header: 'Last Known Location',
      render: truck => (
        <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
          {truck.lastLocation ?? '—'}
        </span>
      ),
    },
    {
      key: 'mileage',
      header: 'Odometer',
      sortable: true,
      render: truck => (
        <span className="text-xs text-[#182230] dark:text-[#e2e8f0] tabular-nums">
          {truck.mileage.toLocaleString()} mi
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      render: truck => <StatusBadge status={truck.status} type="truck" />,
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="Fleet Operations Overview"
        subtitle="Manage fleet maintenance, asset readiness, and driver scheduling."
        actions={
          <button
            type="button"
            onClick={() => toast.info('Fleet maintenance scheduling module planned for Phase 2')}
            className="px-3.5 py-2 bg-[#16A36A] hover:bg-[#128355] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <Wrench size={15} />
            <span>Schedule Maintenance</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Registered Fleet"
          value={MOCK_FLEET_STATS.total}
          icon="Truck"
          variant="default"
        />
        <StatCard
          title="Available for Dispatch"
          value={MOCK_FLEET_STATS.available}
          icon="CheckCircle"
          delta={{ value: '75%', direction: 'up', label: 'operational' }}
          variant="success"
        />
        <StatCard
          title="Active Drivers on Duty"
          value={MOCK_DRIVERS.filter(d => d.status === 'ON_DUTY').length}
          icon="Users"
          variant="default"
        />
        <StatCard
          title="In Maintenance Depot"
          value={MOCK_FLEET_STATS.maintenance}
          icon="AlertTriangle"
          variant="warning"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-[16px] font-bold text-[#182230] dark:text-[#e2e8f0]">
              Fleet Inventory Roster
            </h2>
            <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
              {MOCK_TRUCKS.length} assets recorded
            </span>
          </div>
          <DataTable
            columns={truckColumns}
            data={MOCK_TRUCKS}
            keyExtractor={truck => truck.id}
            searchPlaceholder="Search truck number, make, plate..."
            searchFilter={(truck, query) => {
              const q = query.toLowerCase();
              return (
                truck.number.toLowerCase().includes(q) ||
                truck.make.toLowerCase().includes(q) ||
                truck.licensePlate.toLowerCase().includes(q) ||
                (truck.lastLocation?.toLowerCase().includes(q) ?? false)
              );
            }}
            pageSize={5}
            onRowClick={truck => {
              toast.info(`Truck ${truck.number} maintenance logs available in Phase 2`);
            }}
          />
        </div>

        <div>
          <FleetOverviewCard />
        </div>
      </div>
    </PageContainer>
  );
}
