import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('skeleton rounded', className)} />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-8 w-16" />
        </div>
        <Skeleton className="w-10 h-10 rounded-lg" />
      </div>
      <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#2d3f55]">
        <Skeleton className="h-3 w-32" />
      </div>
    </div>
  );
}

export function TableRowSkeleton({ columns = 7 }: { columns?: number }) {
  return (
    <tr className="border-b border-[#F1F5F9] dark:border-[#243447]">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <Skeleton className="h-4 w-full max-w-[120px]" />
        </td>
      ))}
    </tr>
  );
}
