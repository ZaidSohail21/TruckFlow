import { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
  side?: 'right' | 'left';
}

const WIDTH_CLASSES = {
  sm: 'w-[360px]',
  md: 'w-[480px]',
  lg: 'w-[600px]',
};

export function Drawer({ isOpen, onClose, title, subtitle, children, width = 'md', side = 'right' }: DrawerProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        className={cn(
          'fixed inset-y-0 z-50 flex flex-col bg-white dark:bg-[#1a2332] border-[#E2E8F0] dark:border-[#2d3f55] shadow-2xl transition-transform duration-300 ease-in-out overflow-hidden',
          WIDTH_CLASSES[width],
          side === 'right' ? 'right-0 border-l' : 'left-0 border-r',
          isOpen
            ? 'translate-x-0'
            : side === 'right' ? 'translate-x-full' : '-translate-x-full'
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 py-5 border-b border-[#F1F5F9] dark:border-[#243447] flex-shrink-0">
          <div>
            <h2 className="text-[15px] font-bold text-[#182230] dark:text-[#e2e8f0]">{title}</h2>
            {subtitle && <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-0.5">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-1.5 rounded-lg text-[#94A3B8] hover:text-[#182230] dark:hover:text-white hover:bg-[#F1F5F9] dark:hover:bg-[#243447] transition-colors"
            aria-label="Close drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {children}
        </div>
      </div>
    </>
  );
}
