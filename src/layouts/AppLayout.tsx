import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { X } from 'lucide-react';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { useSidebarStore } from '@/store/sidebarStore';
import { getNavConfig } from '@/lib/navigation';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';

interface AppLayoutProps {
  role: UserRole;
}

function getPageTitle(pathname: string, role: UserRole): string {
  const config = getNavConfig(role);
  if (!config) return 'TruckFlow';
  const item = config.items.find(i => {
    if (i.end) return pathname === i.path;
    return pathname.startsWith(i.path);
  });
  return item?.label ?? 'TruckFlow';
}

export function AppLayout({ role }: AppLayoutProps) {
  const { isMobileOpen, closeMobile } = useSidebarStore();
  const location = useLocation();
  const pageTitle = getPageTitle(location.pathname, role);

  // Close mobile nav on route change
  useEffect(() => {
    closeMobile();
  }, [location.pathname, closeMobile]);

  return (
    <div className="h-screen flex overflow-hidden bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar drawer */}
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 lg:hidden transition-transform duration-300',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="relative h-full w-[250px]">
          <AppSidebar role={role} />
          <button
            className="absolute top-4 right-[-48px] p-2 bg-white/10 rounded-lg text-white"
            onClick={closeMobile}
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-shrink-0 h-full">
        <AppSidebar role={role} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Top header */}
        <AppHeader pageTitle={pageTitle} />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
