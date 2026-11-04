import { cn } from '@/lib/utils';
import type { LoadStatus, TruckStatus, DriverStatus } from '@/types';
import {
  LOAD_STATUS_LABELS, TRUCK_STATUS_LABELS, DRIVER_STATUS_LABELS,
  LOAD_STATUS_VARIANTS, TRUCK_STATUS_VARIANTS, DRIVER_STATUS_VARIANTS
} from '@/lib/constants';

type StatusVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

const VARIANT_CLASSES: Record<StatusVariant, string> = {
  default: 'bg-[#EFF6FF] text-[#1D4ED8] border border-[#BFDBFE]',
  success: 'bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]',
  warning: 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]',
  danger: 'bg-[#FEF2F2] text-[#991B1B] border border-[#FECACA]',
  info: 'bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE]',
  neutral: 'bg-[#F8FAFC] text-[#475569] border border-[#E2E8F0]',
};

interface StatusBadgeProps {
  status: LoadStatus | TruckStatus | DriverStatus;
  type?: 'load' | 'truck' | 'driver';
  className?: string;
}

function getLabel(status: string, type: 'load' | 'truck' | 'driver'): string {
  if (type === 'load') return LOAD_STATUS_LABELS[status as LoadStatus] ?? status;
  if (type === 'truck') return TRUCK_STATUS_LABELS[status as TruckStatus] ?? status;
  return DRIVER_STATUS_LABELS[status as DriverStatus] ?? status;
}

function getVariant(status: string, type: 'load' | 'truck' | 'driver'): StatusVariant {
  if (type === 'load') return LOAD_STATUS_VARIANTS[status as LoadStatus] ?? 'neutral';
  if (type === 'truck') return TRUCK_STATUS_VARIANTS[status as TruckStatus] ?? 'neutral';
  return DRIVER_STATUS_VARIANTS[status as DriverStatus] ?? 'neutral';
}

export function StatusBadge({ status, type = 'load', className }: StatusBadgeProps) {
  const label = getLabel(status, type);
  const variant = getVariant(status, type);

  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold leading-none whitespace-nowrap',
      VARIANT_CLASSES[variant],
      className
    )}>
      <span className={cn(
        'w-1.5 h-1.5 rounded-full',
        variant === 'success' && 'bg-[#16A36A]',
        variant === 'warning' && 'bg-[#D99A25]',
        variant === 'danger' && 'bg-[#D94A4A]',
        (variant === 'info' || variant === 'default') && 'bg-[#3976A8]',
        variant === 'neutral' && 'bg-[#94A3B8]',
      )} />
      {label}
    </span>
  );
}
