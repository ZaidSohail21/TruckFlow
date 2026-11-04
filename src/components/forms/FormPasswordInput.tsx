import { forwardRef, useState, type InputHTMLAttributes } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface FormPasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const FormPasswordInput = forwardRef<HTMLInputElement, FormPasswordInputProps>(
  ({ label, error, helperText, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id ?? label?.toLowerCase().replace(/\s+/g, '-');

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0]"
          >
            {label}
            {props.required && <span className="text-[#D94A4A] ml-1">*</span>}
          </label>
        )}
        <div className="relative">
          <input
            ref={ref}
            id={inputId}
            type={showPassword ? 'text' : 'password'}
            className={cn(
              'w-full h-10 pl-3.5 pr-10 rounded-lg border bg-white dark:bg-[#1a2332] text-[13px] text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] transition-colors outline-none',
              error
                ? 'border-[#D94A4A] focus:border-[#D94A4A] focus:ring-1 focus:ring-[#D94A4A]'
                : 'border-[#E2E8F0] dark:border-[#2d3f55] focus:border-[#3976A8] focus:ring-1 focus:ring-[#3976A8]',
              props.disabled && 'bg-[#F8FAFC] dark:bg-[#131b26] text-[#94A3B8] cursor-not-allowed',
              className
            )}
            {...props}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#182230] dark:hover:text-[#e2e8f0] transition-colors cursor-pointer"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
        {error && (
          <p className="text-[11px] font-medium text-[#D94A4A] mt-1">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-[11px] text-[#64748B] dark:text-[#94a3b8] mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

FormPasswordInput.displayName = 'FormPasswordInput';
