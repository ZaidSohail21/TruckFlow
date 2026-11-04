import { useState } from 'react';
import { Search, Package, MapPin, Truck, CheckCircle2, ArrowRight, LogOut, Sun, Moon, ArrowLeft, Bot, Phone } from 'lucide-react';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MOCK_LOADS } from '@/mocks/loads';
import type { Load } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';
import { toast } from 'sonner';

export function CustomerTrackPage() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [trackingNumber, setTrackingNumber] = useState('TF-1042');
  const [searchResult, setSearchResult] = useState<Load | null>(MOCK_LOADS[0]);
  const [searched, setSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = MOCK_LOADS.find(
      l => l.id.toLowerCase() === trackingNumber.trim().toLowerCase()
    );
    setSearchResult(found ?? null);
    setSearched(true);
  };

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0f1620] flex flex-col">
      {/* Customer Header */}
      <header className="h-16 bg-white dark:bg-[#1a2332] border-b border-[#E2E8F0] dark:border-[#2d3f55] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[#3976A8] rounded-lg flex items-center justify-center shadow-xs">
            <Truck size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-base text-[#182230] dark:text-[#e2e8f0]">TruckFlow</span>
            <span className="text-[10px] text-[#64748B] dark:text-[#94a3b8] block leading-none">Shipment Portal</span>
          </div>

          {/* Customer Navigation Links for logged-in customer */}
          {isAuthenticated && user?.role === 'CUSTOMER' && (
            <nav className="hidden md:flex items-center gap-1 ml-6 pl-6 border-l border-[#E2E8F0] dark:border-[#2d3f55]">
              <Link
                to="/track"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#EFF6FF] text-[#1E40AF] dark:bg-[#1e2d44] dark:text-[#93c5fd]"
              >
                Track Shipment
              </Link>
              <Link
                to="/customer/shipments"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#64748B] dark:text-[#94a3b8] hover:text-[#182230] dark:hover:text-[#e2e8f0] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] transition-colors"
              >
                Shipment Details
              </Link>
              <Link
                to="/customer/support"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#64748B] dark:text-[#94a3b8] hover:text-[#182230] dark:hover:text-[#e2e8f0] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] transition-colors flex items-center gap-1"
              >
                <Bot size={13} />
                AI Support
              </Link>
              <Link
                to="/customer/contact"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-[#64748B] dark:text-[#94a3b8] hover:text-[#182230] dark:hover:text-[#e2e8f0] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] transition-colors flex items-center gap-1"
              >
                <Phone size={13} />
                Contact
              </Link>
            </nav>
          )}
        </div>

        {/* Right Header Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={() => {
              toggleTheme();
              toast.success(theme === 'light' ? 'Switched to Dark mode' : 'Switched to Light mode', { duration: 1500 });
            }}
            className="p-2 rounded-lg text-[#64748B] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] dark:text-[#94a3b8] transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
          >
            {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
          </button>

          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              {/* If staff user is visiting tracking portal, allow returning to staff dashboard */}
              {user.role !== 'CUSTOMER' && (
                <button
                  onClick={() => navigate(ROLE_DEFAULT_PATHS[user.role])}
                  className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#F1F5F9] dark:bg-[#243447] text-[#182230] dark:text-[#e2e8f0] hover:bg-[#E2E8F0] dark:hover:bg-[#2d3f55] transition-colors cursor-pointer"
                >
                  <ArrowLeft size={13} />
                  Staff Dashboard
                </button>
              )}

              {/* User badge */}
              <div className="flex items-center gap-2">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                  style={{ backgroundColor: user.avatarColor ?? '#3976A8' }}
                >
                  {user.avatarInitials}
                </div>
                <div className="hidden sm:block text-left">
                  <div className="text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] leading-none">
                    {user.name}
                  </div>
                  <div className="text-[10px] text-[#64748B] dark:text-[#94a3b8] mt-0.5">
                    {user.role === 'CUSTOMER' ? 'Customer Account' : user.role}
                  </div>
                </div>
              </div>

              {/* Sign Out Button */}
              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-[#D94A4A] bg-[#FEF2F2] dark:bg-[#2a1515] border border-[#FECACA] dark:border-[#4a2020] hover:bg-[#FEE2E2] dark:hover:bg-[#3d1818] transition-colors cursor-pointer"
                title="Sign out of your account"
              >
                <LogOut size={13} />
                <span>Sign Out</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg text-xs font-semibold transition-colors shadow-2xs"
            >
              <span>Sign In</span>
              <ArrowRight size={13} />
            </Link>
          )}
        </div>
      </header>

      {/* Main Track Container */}
      <main className="flex-1 max-w-2xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="text-center space-y-2 py-4">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#182230] dark:text-[#e2e8f0]">
            Track Your Freight Shipment
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] dark:text-[#94a3b8] max-w-md mx-auto">
            Enter your TruckFlow shipment or bill-of-lading identifier to receive live delivery status and estimated arrival times.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="e.g. TF-1042, TF-1038"
              value={trackingNumber}
              onChange={e => setTrackingNumber(e.target.value)}
              className="w-full h-12 pl-10 pr-4 rounded-xl border border-[#CBD5E1] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-sm font-mono text-[#182230] dark:text-[#e2e8f0] outline-none focus:border-[#3976A8] shadow-xs"
            />
          </div>
          <button
            type="submit"
            className="px-6 h-12 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-xl font-semibold text-sm transition-colors cursor-pointer shadow-xs flex items-center gap-1.5"
          >
            <span>Track</span>
            <ArrowRight size={15} />
          </button>
        </form>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center justify-center gap-2 text-xs text-[#64748B] dark:text-[#94a3b8]">
          <span>Try demo IDs:</span>
          {['TF-1042', 'TF-1038', 'TF-1037'].map(id => (
            <button
              key={id}
              type="button"
              onClick={() => {
                setTrackingNumber(id);
                const found = MOCK_LOADS.find(l => l.id === id);
                setSearchResult(found ?? null);
                setSearched(true);
              }}
              className="font-mono text-[11px] underline text-[#3976A8] hover:text-[#183153] dark:hover:text-[#93c5fd] cursor-pointer"
            >
              {id}
            </button>
          ))}
        </div>

        {/* Result Card */}
        {searched && (
          searchResult ? (
            <div className="bg-white dark:bg-[#1a2332] rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] p-6 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9] dark:border-[#243447]">
                <div>
                  <div className="text-[11px] font-semibold text-[#64748B] dark:text-[#94a3b8] uppercase tracking-wider">
                    Shipment Identifier
                  </div>
                  <div className="text-xl font-bold font-mono text-[#182230] dark:text-[#e2e8f0]">
                    {searchResult.id}
                  </div>
                  <div className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-0.5">
                    Customer: {searchResult.customerName}
                  </div>
                </div>
                <StatusBadge status={searchResult.status} type="load" className="text-xs px-3 py-1" />
              </div>

              {/* Transit Step Graphic */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55]">
                  <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94a3b8] text-xs font-semibold uppercase mb-1">
                    <MapPin size={14} className="text-[#3976A8]" />
                    Origin
                  </div>
                  <div className="font-bold text-base text-[#182230] dark:text-[#e2e8f0]">
                    {searchResult.pickup}
                  </div>
                  <div className="text-xs text-[#16A36A] mt-1">Dispatched</div>
                </div>

                <div className="p-4 rounded-xl bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55]">
                  <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94a3b8] text-xs font-semibold uppercase mb-1">
                    <CheckCircle2 size={14} className="text-[#16A36A]" />
                    Destination
                  </div>
                  <div className="font-bold text-base text-[#182230] dark:text-[#e2e8f0]">
                    {searchResult.destination}
                  </div>
                  <div className="text-xs text-[#3976A8] mt-1">
                    {searchResult.eta ? `ETA: ${formatDateTime(searchResult.eta)}` : 'In Transit'}
                  </div>
                </div>
              </div>

              {/* Load Specs */}
              <div className="p-4 rounded-xl bg-[#F1F5F9] dark:bg-[#243447] text-xs flex justify-between">
                <div>
                  <span className="text-[#64748B] dark:text-[#94a3b8] block">Commodity</span>
                  <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{searchResult.commodity}</span>
                </div>
                <div>
                  <span className="text-[#64748B] dark:text-[#94a3b8] block">Weight</span>
                  <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{searchResult.weight}</span>
                </div>
                <div>
                  <span className="text-[#64748B] dark:text-[#94a3b8] block">Transport Unit</span>
                  <span className="font-mono font-semibold text-[#182230] dark:text-[#e2e8f0]">
                    {searchResult.truckNumber ?? 'In Yard'}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-[#1a2332] rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] p-8 text-center space-y-2">
              <Package size={32} className="mx-auto text-[#94A3B8]" />
              <h2 className="text-base font-bold text-[#182230] dark:text-[#e2e8f0]">
                No shipment found for "{trackingNumber}"
              </h2>
              <p className="text-xs text-[#64748B] dark:text-[#94a3b8]">
                Please double-check your load reference ID or contact customer support for assistance.
              </p>
            </div>
          )
        )}
      </main>
    </div>
  );
}
