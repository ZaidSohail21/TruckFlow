import { useState } from 'react';
import { Bell, Search, Sun, Moon, Menu, ChevronDown, User, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { ROLE_LABELS } from '@/lib/constants';
import { MOCK_NOTIFICATIONS } from '@/mocks/activity';
import { timeAgo, cn } from '@/lib/utils';
import { toast } from 'sonner';

interface AppHeaderProps {
  pageTitle?: string;
}

export function AppHeader({ pageTitle }: AppHeaderProps) {
  const { user, logout } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const { openMobile } = useSidebarStore();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const unreadCount = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const handleLogout = async () => {
    setUserMenuOpen(false);
    await logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  return (
    <header className="h-[60px] flex items-center border-b border-[#E2E8F0] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] px-4 gap-4 flex-shrink-0 z-30">
      {/* Mobile hamburger */}
      <button
        className="lg:hidden p-2 rounded-md text-[#64748B] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] transition-colors"
        onClick={openMobile}
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Page title */}
      <div className="flex-1 min-w-0">
        {pageTitle && (
          <h1 className="text-[15px] font-semibold text-[#182230] dark:text-[#e2e8f0] truncate">
            {pageTitle}
          </h1>
        )}
      </div>

      {/* Search */}
      <div className="hidden md:flex items-center gap-2 bg-[#F5F7FA] dark:bg-[#243447] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg px-3 h-9 w-56 lg:w-72">
        <Search size={14} className="text-[#94A3B8] flex-shrink-0" />
        <input
          type="text"
          placeholder="Search loads, trucks, drivers…"
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          className="bg-transparent flex-1 text-[13px] text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] outline-none"
        />
      </div>

      {/* Theme toggle */}
      <button
        onClick={() => {
          toggleTheme();
          toast.success(theme === 'light' ? 'Switched to Dark mode' : 'Switched to Light mode', { duration: 1500 });
        }}
        className="p-2 rounded-lg text-[#64748B] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] dark:text-[#94a3b8] transition-colors cursor-pointer"
        aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
        title={theme === 'light' ? 'Dark mode' : 'Light mode'}
      >
        {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
      </button>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => { setNotifOpen(!notifOpen); setUserMenuOpen(false); }}
          className="relative p-2 rounded-lg text-[#64748B] hover:bg-[#F5F7FA] dark:hover:bg-[#243447] dark:text-[#94a3b8] transition-colors"
          aria-label={`Notifications${unreadCount > 0 ? ` — ${unreadCount} unread` : ''}`}
        >
          <Bell size={17} />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-[#D94A4A] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {notifOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
            <div className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-xl shadow-lg z-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#E2E8F0] dark:border-[#2d3f55]">
                <span className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0]">Notifications</span>
                {unreadCount > 0 && (
                  <span className="text-[11px] text-[#3976A8] font-medium">{unreadCount} unread</span>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto">
                {MOCK_NOTIFICATIONS.map(notif => (
                  <div
                    key={notif.id}
                    className={cn(
                      'px-4 py-3 border-b border-[#F1F5F9] dark:border-[#243447] last:border-0 cursor-pointer hover:bg-[#F8FAFC] dark:hover:bg-[#243447] transition-colors',
                      !notif.read && 'bg-[#EFF6FF] dark:bg-[#1e2d44]'
                    )}
                  >
                    <div className="flex items-start gap-2">
                      <div className={cn('w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0', notif.read ? 'bg-[#E2E8F0]' : 'bg-[#3976A8]')} />
                      <div className="flex-1 min-w-0">
                        <div className="text-[12px] font-semibold text-[#182230] dark:text-[#e2e8f0] truncate">{notif.title}</div>
                        <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8] mt-0.5 leading-relaxed">{notif.body}</div>
                        <div className="text-[10px] text-[#94A3B8] mt-1">{timeAgo(notif.timestamp)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-[#E2E8F0] dark:border-[#2d3f55]">
                <button className="text-[12px] text-[#3976A8] font-medium hover:underline w-full text-center">
                  View all notifications
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User menu */}
      {user && (
        <div className="relative">
          <button
            onClick={() => { setUserMenuOpen(!userMenuOpen); setNotifOpen(false); }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-lg hover:bg-[#F5F7FA] dark:hover:bg-[#243447] transition-colors"
            aria-label="User account menu"
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
              style={{ backgroundColor: user.avatarColor ?? '#3976A8' }}
            >
              {user.avatarInitials}
            </div>
            <div className="hidden sm:block text-left min-w-0">
              <div className="text-[12px] font-semibold text-[#182230] dark:text-[#e2e8f0] truncate max-w-24">{user.name}</div>
              <div className="text-[10px] text-[#64748B] dark:text-[#94a3b8] truncate max-w-24">{ROLE_LABELS[user.role]}</div>
            </div>
            <ChevronDown size={13} className="text-[#94A3B8] flex-shrink-0" />
          </button>

          {userMenuOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
              <div className="absolute right-0 top-full mt-2 w-52 bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-xl shadow-lg z-50 overflow-hidden py-1">
                <div className="px-4 py-3 border-b border-[#F1F5F9] dark:border-[#243447]">
                  <div className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0]">{user.name}</div>
                  <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8] mt-0.5">{user.email}</div>
                  <div className="inline-flex items-center mt-1.5 px-2 py-0.5 bg-[#EFF6FF] dark:bg-[#1e2d44] rounded text-[10px] font-medium text-[#3976A8]">
                    {ROLE_LABELS[user.role]}
                  </div>
                </div>
                <button
                  onClick={() => { setUserMenuOpen(false); toast.info('Profile view planned for Phase 2'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#64748B] dark:text-[#94a3b8] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] hover:text-[#182230] dark:hover:text-[#e2e8f0] transition-colors"
                >
                  <User size={14} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => { setUserMenuOpen(false); toast.info('System settings planned for Phase 2'); }}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#64748B] dark:text-[#94a3b8] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] hover:text-[#182230] dark:hover:text-[#e2e8f0] transition-colors"
                >
                  <Settings size={14} />
                  <span>Settings</span>
                </button>
                <div className="border-t border-[#F1F5F9] dark:border-[#243447] mt-1" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-[12px] text-[#D94A4A] hover:bg-[#FEF2F2] dark:hover:bg-[rgba(217,74,74,0.08)] transition-colors"
                >
                  <LogOut size={14} />
                  <span>Sign Out</span>
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </header>
  );
}
