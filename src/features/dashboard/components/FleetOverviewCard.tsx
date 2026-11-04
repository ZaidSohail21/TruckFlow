import { Truck, MapPin } from 'lucide-react';
import { MOCK_FLEET_STATS } from '@/mocks/trucks';
import { toast } from 'sonner';

export function FleetOverviewCard() {
  const stats = MOCK_FLEET_STATS;
  const availablePercent = Math.round((stats.available / stats.total) * 100);
  const assignedPercent = Math.round((stats.assigned / stats.total) * 100);

  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] dark:border-[#243447]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#ECFDF5] dark:bg-[#0d2a1e] text-[#16A36A] rounded-lg flex items-center justify-center">
            <Truck size={16} />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-[#182230] dark:text-[#e2e8f0]">
              Fleet Capacity Overview
            </h2>
            <span className="text-[10px] text-[#94A3B8]">Current Asset Availability</span>
          </div>
        </div>
        <span className="text-[12px] font-bold text-[#182230] dark:text-[#e2e8f0]">
          {stats.total} Total Trucks
        </span>
      </div>

      {/* Progress representation */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#64748B] dark:text-[#94a3b8]">Availability Distribution</span>
          <span className="font-semibold text-[#16A36A]">{availablePercent}% Ready</span>
        </div>
        <div className="h-2 w-full bg-[#E2E8F0] dark:bg-[#2d3f55] rounded-full overflow-hidden flex">
          <div style={{ width: `${availablePercent}%` }} className="bg-[#16A36A]" title="Available" />
          <div style={{ width: `${assignedPercent}%` }} className="bg-[#3976A8]" title="Assigned" />
          <div style={{ width: `${100 - availablePercent - assignedPercent}%` }} className="bg-[#D94A4A]" title="Maintenance/Other" />
        </div>
      </div>

      {/* Stat Grid */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55]">
          <div className="text-[11px] font-medium text-[#64748B] dark:text-[#94a3b8]">Available</div>
          <div className="text-[18px] font-bold text-[#16A36A] leading-tight mt-0.5">{stats.available}</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55]">
          <div className="text-[11px] font-medium text-[#64748B] dark:text-[#94a3b8]">Assigned</div>
          <div className="text-[18px] font-bold text-[#3976A8] leading-tight mt-0.5">{stats.assigned}</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55]">
          <div className="text-[11px] font-medium text-[#64748B] dark:text-[#94a3b8]">Maintenance</div>
          <div className="text-[18px] font-bold text-[#D99A25] leading-tight mt-0.5">{stats.maintenance}</div>
        </div>
        <div className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55]">
          <div className="text-[11px] font-medium text-[#64748B] dark:text-[#94a3b8]">Unavailable</div>
          <div className="text-[18px] font-bold text-[#64748B] leading-tight mt-0.5">{stats.unavailable}</div>
        </div>
      </div>

      {/* Future GPS Placeholder */}
      <div className="p-3 bg-[#F1F5F9] dark:bg-[#243447] border border-dashed border-[#CBD5E1] dark:border-[#3d5a75] rounded-lg flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94a3b8]">
          <MapPin size={15} className="text-[#3976A8]" />
          <span>Live GPS Telematics Map</span>
        </div>
        <button
          type="button"
          onClick={() => toast.info('Interactive GPS fleet tracking map is planned for Phase 2')}
          className="text-[#3976A8] font-semibold hover:underline cursor-pointer"
        >
          Phase 2 Preview
        </button>
      </div>
    </div>
  );
}
