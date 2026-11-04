import { type ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <div className={cn('p-4 sm:p-6 lg:p-8 max-w-[1400px] mx-auto w-full', className)}>
      {children}
    </div>
  );
}
