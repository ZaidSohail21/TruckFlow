import { ActivityTimeline } from '@/components/shared/ActivityTimeline';
import { MOCK_ACTIVITY } from '@/mocks/activity';

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#F1F5F9] dark:border-[#243447]">
        <div>
          <h2 className="text-[15px] font-bold text-[#182230] dark:text-[#e2e8f0]">
            Recent Dispatch Activity
          </h2>
          <p className="text-[12px] text-[#64748B] dark:text-[#94a3b8] mt-0.5">
            Real-time feed of events across active loads and fleet
          </p>
        </div>
        <span className="text-[11px] font-semibold text-[#16A36A] bg-[#ECFDF5] dark:bg-[#0d2a1e] px-2 py-0.5 rounded-full">
          Live Feed
        </span>
      </div>

      <ActivityTimeline events={MOCK_ACTIVITY} />
    </div>
  );
}
