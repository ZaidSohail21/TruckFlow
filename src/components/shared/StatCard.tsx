import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { StatCardData } from '@/types';
import {
  LayoutDashboard, Package, Truck, Users, AlertTriangle, CheckCircle,
  Clock, MapPin, Activity
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard, Package, Truck, Users, AlertTriangle, CheckCircle,
  Clock, MapPin, Activity
};

const VARIANT_STYLES = {
  default: {
    bg: 'bg-white dark:bg-[#1a2332]',
    iconBg: 'bg-[#EFF6FF] dark:bg-[#1e2d44]',
    iconColor: 'text-[#3976A8]',
    border: 'border-[#E2E8F0] dark:border-[#2d3f55]',
  },
  success: {
    bg: 'bg-white dark:bg-[#1a2332]',
    iconBg: 'bg-[#ECFDF5] dark:bg-[#0d2a1e]',
    iconColor: 'text-[#16A36A]',
    border: 'border-[#E2E8F0] dark:border-[#2d3f55]',
  },
  warning: {
    bg: 'bg-white dark:bg-[#1a2332]',
    iconBg: 'bg-[#FFFBEB] dark:bg-[#2a2010]',
    iconColor: 'text-[#D99A25]',
    border: 'border-[#E2E8F0] dark:border-[#2d3f55]',
  },
  danger: {
    bg: 'bg-white dark:bg-[#1a2332]',
    iconBg: 'bg-[#FEF2F2] dark:bg-[#2a1515]',
    iconColor: 'text-[#D94A4A]',
    border: 'border-[#E2E8F0] dark:border-[#2d3f55]',
  },
};

export function StatCard({ title, value, icon, description, delta, variant = 'default' }: StatCardData) {
  const styles = VARIANT_STYLES[variant];
  const IconComponent = ICON_MAP[icon];

  return (
    <div className={cn(
      'rounded-xl border p-5 flex flex-col gap-3 shadow-sm',
      styles.bg,
      styles.border
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-[#64748B] dark:text-[#94a3b8] uppercase tracking-wide">
            {title}
          </div>
          <div className="text-[28px] font-bold text-[#182230] dark:text-[#e2e8f0] mt-1 leading-none tabular-nums">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
        </div>
        {IconComponent && (
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0', styles.iconBg)}>
            <IconComponent size={19} className={styles.iconColor} />
          </div>
        )}
      </div>

      {(delta || description) && (
        <div className="flex items-center gap-1.5 pt-1 border-t border-[#F1F5F9] dark:border-[#2d3f55]">
          {delta && (
            <>
              <span className={cn(
                'flex items-center gap-0.5 text-[12px] font-semibold',
                delta.direction === 'up' && 'text-[#16A36A]',
                delta.direction === 'down' && 'text-[#D94A4A]',
                delta.direction === 'neutral' && 'text-[#64748B]',
              )}>
                {delta.direction === 'up' && <TrendingUp size={13} />}
                {delta.direction === 'down' && <TrendingDown size={13} />}
                {delta.direction === 'neutral' && <Minus size={13} />}
                {delta.value}
              </span>
              <span className="text-[11px] text-[#94A3B8] dark:text-[#64748b]">{delta.label}</span>
            </>
          )}
          {description && !delta && (
            <span className="text-[11px] text-[#94A3B8] dark:text-[#64748b]">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
