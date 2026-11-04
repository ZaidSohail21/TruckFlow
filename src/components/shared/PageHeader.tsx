import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function PageHeader({ title, subtitle, actions, className }: PageHeaderProps) {
  return (
    <div className={cn('flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6', className)}>
      <div>
        <h1 className="text-[22px] font-bold text-[#182230] dark:text-[#e2e8f0] leading-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8] mt-1">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex items-center gap-3 flex-shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
}
