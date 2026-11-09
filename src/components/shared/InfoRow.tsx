import { cn } from '@/lib/utils';

interface InfoRowProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function InfoRow({ label, value, className }: InfoRowProps) {
  return (
    <div className={cn('flex items-start justify-between py-2.5 border-b border-[#F1F5F9] dark:border-[#1e2d44] last:border-0', className)}>
      <span className="text-xs font-medium text-[#64748B] dark:text-[#94a3b8] min-w-[120px]">{label}</span>
      <span className="text-xs text-[#182230] dark:text-[#e2e8f0] text-right font-medium">{value}</span>
    </div>
  );
}
