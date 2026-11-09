import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Search, 
  ChevronRight
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { StatCard } from '@/components/shared/StatCard';
import { MOCK_LOADS } from '@/mocks/loads';
import { formatDate } from '@/lib/utils';

export function ShipmentsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Customer shipments (Apex Industrial Supply customer ID cust-001)
  const customerLoads = useMemo(() => {
    return MOCK_LOADS.filter(l => l.customerId === 'cust-001' || l.customerId === 'cust-002');
  }, []);

  const filteredLoads = useMemo(() => {
    return customerLoads.filter(l => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        l.id.toLowerCase().includes(q) ||
        l.pickup.toLowerCase().includes(q) ||
        l.destination.toLowerCase().includes(q) ||
        l.commodity.toLowerCase().includes(q);
      const matchesStatus = !statusFilter || l.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [customerLoads, search, statusFilter]);

  return (
    <PageContainer>
      <PageHeader
        title="My Corporate Shipments"
        subtitle="Track active freight consignments, verify delivery milestones, and inspect digital proof of delivery."
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <StatCard
          title="Active In Transit"
          value={customerLoads.filter(l => l.status === 'IN_TRANSIT').length}
          icon="Truck"
          variant="success"
          description="En route across regional corridors"
        />
        <StatCard
          title="Scheduled / Pending"
          value={customerLoads.filter(l => l.status === 'PENDING' || l.status === 'ASSIGNED').length}
          icon="Clock"
          description="Booked consignments"
        />
        <StatCard
          title="Delivered This Month"
          value={customerLoads.filter(l => l.status === 'DELIVERED').length}
          icon="Package"
          description="Signed POD receipts archived"
        />
      </div>

      {/* Filter / Search Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-[#1a2332] p-3 rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs">
        <div className="relative flex-1 min-w-[240px] max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tracking #, city, or commodity..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-transparent border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3976A8]/30"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'IN_TRANSIT', 'DELIVERED'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st === 'ALL' ? '' : st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                (st === 'ALL' && !statusFilter) || statusFilter === st
                  ? 'bg-[#3976A8] text-white'
                  : 'bg-[#F8FAFC] dark:bg-[#131b26] text-[#64748B] dark:text-[#94a3b8] hover:bg-[#EFF6FF]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Shipments List */}
      <div className="space-y-3">
        {filteredLoads.map(load => (
          <div
            key={load.id}
            onClick={() => navigate(`/customer/shipments/${load.id}`)}
            className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-xs hover:border-[#3976A8] transition-all cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[#3976A8] dark:text-[#93c5fd]">
                  {load.id}
                </span>
                <StatusBadge status={load.status} type="load" />
                <span className="text-xs text-[#94A3B8]">
                  Created {formatDate(load.createdAt)}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5 font-semibold text-[#182230] dark:text-white">
                  <MapPin size={13} className="text-emerald-500" />
                  <span>{load.pickup}</span>
                  <span className="text-[#94A3B8]">→</span>
                  <MapPin size={13} className="text-rose-500" />
                  <span>{load.destination}</span>
                </div>
                <span className="text-[#CBD5E1] dark:text-[#475569]">|</span>
                <span className="text-[#64748B] dark:text-[#94a3b8]">{load.commodity} ({load.weight})</span>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <span className="text-[10px] text-[#94A3B8] block uppercase font-bold tracking-wider">Estimated Delivery</span>
                <span className="text-xs font-bold text-[#182230] dark:text-white">
                  {load.eta ? formatDate(load.eta) : 'Pending Dispatch'}
                </span>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/customer/shipments/${load.id}`);
                }}
                className="px-3.5 py-2 bg-[#EFF6FF] dark:bg-[#1e2d44] hover:bg-[#DBEAFE] text-[#3976A8] dark:text-[#93c5fd] rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>Track Live</span>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}