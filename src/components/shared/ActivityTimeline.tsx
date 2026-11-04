import { Package, Truck, AlertTriangle, CheckCircle, MessageSquare, Activity } from 'lucide-react';
import { cn, timeAgo } from '@/lib/utils';
import type { ActivityEvent, ActivityType } from '@/types';

const ACTIVITY_ICONS: Record<ActivityType, React.ComponentType<{ size?: number; className?: string }>> = {
  LOAD_ASSIGNED: Package,
  LOAD_DELIVERED: CheckCircle,
  LOAD_DELAYED: AlertTriangle,
  DRIVER_UPDATE: MessageSquare,
  TRUCK_ASSIGNED: Truck,
  SYSTEM: Activity,
};

const ACTIVITY_COLORS: Record<ActivityType, string> = {
  LOAD_ASSIGNED: 'bg-[#EFF6FF] text-[#3976A8]',
  LOAD_DELIVERED: 'bg-[#ECFDF5] text-[#16A36A]',
  LOAD_DELAYED: 'bg-[#FEF2F2] text-[#D94A4A]',
  DRIVER_UPDATE: 'bg-[#FFFBEB] text-[#D99A25]',
  TRUCK_ASSIGNED: 'bg-[#EFF6FF] text-[#3976A8]',
  SYSTEM: 'bg-[#F8FAFC] text-[#64748B]',
};

interface ActivityTimelineProps {
  events: ActivityEvent[];
  className?: string;
}

export function ActivityTimeline({ events, className }: ActivityTimelineProps) {
  return (
    <div className={cn('space-y-0', className)}>
      {events.map((event, index) => {
        const IconComponent = ACTIVITY_ICONS[event.type] ?? Activity;
        const colorClass = ACTIVITY_COLORS[event.type] ?? 'bg-[#F8FAFC] text-[#64748B]';
        const isLast = index === events.length - 1;

        return (
          <div key={event.id} className="flex gap-3">
            {/* Timeline line + icon */}
            <div className="flex flex-col items-center">
              <div className={cn('w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0', colorClass)}>
                <IconComponent size={14} />
              </div>
              {!isLast && <div className="w-px flex-1 bg-[#E2E8F0] dark:bg-[#2d3f55] mt-1" />}
            </div>

            {/* Content */}
            <div className={cn('flex-1 min-w-0 pb-4', isLast && 'pb-0')}>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0] leading-snug">
                    {event.title}
                  </div>
                  <div className="text-[12px] text-[#64748B] dark:text-[#94a3b8] mt-0.5 leading-relaxed">
                    {event.description}
                  </div>
                </div>
                <span className="text-[11px] text-[#94A3B8] whitespace-nowrap flex-shrink-0">
                  {timeAgo(event.timestamp)}
                </span>
              </div>
              {event.referenceId && (
                <span className="inline-block mt-1 font-mono text-[10px] text-[#3976A8] bg-[#EFF6FF] dark:bg-[#1e2d44] px-1.5 py-0.5 rounded">
                  {event.referenceId}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
