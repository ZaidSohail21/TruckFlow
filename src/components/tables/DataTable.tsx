import { useState, type ReactNode } from 'react';
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { EmptyState } from '../shared/EmptyState';
import { TableRowSkeleton } from '../shared/LoadingSkeleton';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string;
  isLoading?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  searchFilter?: (row: T, query: string) => boolean;
  filters?: ReactNode;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  searchable = true,
  searchPlaceholder = 'Search records...',
  searchFilter,
  filters,
  pageSize = 10,
  emptyTitle,
  emptyDescription,
  onRowClick,
  className,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Filter
  const filteredData = data.filter(row => {
    if (!searchQuery.trim() || !searchFilter) return true;
    return searchFilter(row, searchQuery);
  });

  // Sort
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = (a as Record<string, unknown>)[sortKey];
    const valB = (b as Record<string, unknown>)[sortKey];
    if (valA === valB) return 0;
    if (valA === null || valA === undefined) return 1;
    if (valB === null || valB === undefined) return -1;
    const comparison = String(valA).localeCompare(String(valB));
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = sortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  return (
    <div className={cn('bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm overflow-hidden', className)}>
      {/* Table toolbar */}
      {(searchable || filters) && (
        <div className="p-4 border-b border-[#E2E8F0] dark:border-[#2d3f55] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {searchable && (
            <div className="relative flex-1 max-w-sm">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChange={e => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#131b26] text-[13px] text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] outline-none focus:border-[#3976A8]"
              />
            </div>
          )}
          {filters && <div className="flex items-center gap-2 flex-wrap">{filters}</div>}
        </div>
      )}

      {/* Responsive table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E2E8F0] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#131b26]">
              {columns.map(column => (
                <th
                  key={column.key}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={cn(
                    'px-4 py-3 text-[11px] font-semibold text-[#64748B] dark:text-[#94a3b8] uppercase tracking-wider select-none whitespace-nowrap',
                    column.sortable && 'cursor-pointer hover:text-[#182230] dark:hover:text-[#e2e8f0]',
                    column.align === 'right' && 'text-right',
                    column.align === 'center' && 'text-center',
                    column.className
                  )}
                >
                  <div className={cn(
                    'flex items-center gap-1.5',
                    column.align === 'right' && 'justify-end',
                    column.align === 'center' && 'justify-center'
                  )}>
                    <span>{column.header}</span>
                    {column.sortable && (
                      <ArrowUpDown size={12} className={cn(
                        'transition-opacity',
                        sortKey === column.key ? 'text-[#3976A8] opacity-100' : 'opacity-40'
                      )} />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRowSkeleton key={i} columns={columns.length} />
              ))
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="p-0">
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            ) : (
              paginatedData.map(row => (
                <tr
                  key={keyExtractor(row)}
                  onClick={() => onRowClick?.(row)}
                  className={cn(
                    'hover:bg-[#F8FAFC] dark:hover:bg-[#1e2d44] transition-colors',
                    onRowClick && 'cursor-pointer'
                  )}
                >
                  {columns.map(column => (
                    <td
                      key={column.key}
                      className={cn(
                        'px-4 py-3 text-[13px] text-[#182230] dark:text-[#e2e8f0]',
                        column.align === 'right' && 'text-right',
                        column.align === 'center' && 'text-center',
                        column.className
                      )}
                    >
                      {column.render
                        ? column.render(row)
                        : String((row as Record<string, unknown>)[column.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination footer */}
      {!isLoading && sortedData.length > 0 && (
        <div className="px-4 py-3 border-t border-[#E2E8F0] dark:border-[#2d3f55] flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-[#64748B] dark:text-[#94a3b8]">
          <div>
            Showing <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{Math.min(1 + (currentPage - 1) * pageSize, sortedData.length)}</span> to{' '}
            <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{Math.min(currentPage * pageSize, sortedData.length)}</span> of{' '}
            <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{sortedData.length}</span> results
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Previous page"
            >
              <ChevronLeft size={15} />
            </button>
            <span className="px-3 py-1 font-medium text-[#182230] dark:text-[#e2e8f0]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              aria-label="Next page"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
