import { AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'primary';
  isLoading?: boolean;
}

export function ConfirmationDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  isLoading = false,
}: ConfirmationDialogProps) {
  if (!isOpen) return null;

  const confirmColors = {
    danger: 'bg-[#D94A4A] hover:bg-[#b83838] text-white',
    warning: 'bg-[#D99A25] hover:bg-[#b8801d] text-white',
    primary: 'bg-[#3976A8] hover:bg-[#2e628c] text-white',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog content */}
      <div className="relative bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xl max-w-md w-full p-6 overflow-hidden z-10">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#94A3B8] hover:text-[#182230] dark:hover:text-[#e2e8f0] transition-colors"
          aria-label="Close dialog"
        >
          <X size={18} />
        </button>

        <div className="flex items-start gap-4 mb-4">
          <div className={cn(
            'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
            variant === 'danger' && 'bg-[#FEF2F2] text-[#D94A4A]',
            variant === 'warning' && 'bg-[#FFFBEB] text-[#D99A25]',
            variant === 'primary' && 'bg-[#EFF6FF] text-[#3976A8]',
          )}>
            <AlertTriangle size={20} />
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-[#182230] dark:text-[#e2e8f0]">
              {title}
            </h3>
            <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8] mt-1 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] transition-colors cursor-pointer"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={cn(
              'px-4 py-2 rounded-lg text-[13px] font-medium transition-colors cursor-pointer',
              confirmColors[variant],
              isLoading && 'opacity-60 cursor-not-allowed'
            )}
          >
            {isLoading ? 'Processing...' : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
