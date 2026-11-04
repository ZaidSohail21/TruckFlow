import { Outlet } from 'react-router-dom';
import { MarketingNavbar } from '@/features/marketing/components/MarketingNavbar';
import { MarketingFooter } from '@/features/marketing/components/MarketingFooter';

export function MarketingLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#142B45] selection:bg-[#3976A8] selection:text-white font-sans">
      {/* Top sticky marketing navigation */}
      <MarketingNavbar />

      {/* Main page content area */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Public website footer */}
      <MarketingFooter />
    </div>
  );
}
