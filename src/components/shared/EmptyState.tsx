import { type ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title = 'No results found',
  description = 'There is nothing to display here yet.',
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-12 px-4 text-center', className)}>
      <div className="w-12 h-12 bg-[#F1F5F9] dark:bg-[#243447] rounded-full flex items-center justify-center mb-3">
        {icon ?? <Inbox size={22} className="text-[#94A3B8]" />}
      </div>
      <h3 className="text-[14px] font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">{title}</h3>
      <p className="text-[12px] text-[#64748B] dark:text-[#94a3b8] max-w-xs">{description}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
