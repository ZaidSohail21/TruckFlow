import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ClipboardList, MapPin, Truck, Users, Route,
  MessageSquare, FileText, BarChart3, ClipboardCheck, Bot, Phone, Shield,
  ScrollText, Settings, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { getNavConfig, type NavItem } from '@/lib/navigation';
import { ROLE_LABELS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types';
import { toast } from 'sonner';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  LayoutDashboard,
  Package,
  ClipboardList,
  MapPin,
  Truck,
  Users,
  Route,
  MessageSquare,
  FileText,
  BarChart3,
  ClipboardCheck,
  Bot,
  Phone,
  Shield,
  ScrollText,
  Settings,
};

interface AppSidebarProps {
  role: UserRole;
}

function TruckFlowLogo({ collapsed }: { collapsed: boolean }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-5">
      <div className="flex-shrink-0 w-8 h-8 bg-[#3976A8] rounded-lg flex items-center justify-center">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 3h15v13H1V3zM16 8h4l3 3v5h-7V8z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="5.5" cy="18.5" r="2.5" stroke="white" strokeWidth="1.5"/>
          <circle cx="18.5" cy="18.5" r="2.5" stroke="white" strokeWidth="1.5"/>
        </svg>
      </div>
      {!collapsed && (
        <div className="overflow-hidden">
          <span className="text-white font-bold text-[15px] tracking-tight leading-none block">TruckFlow</span>
          <span className="text-[#8BAFD4] text-[10px] leading-none block mt-0.5">Fleet Operations</span>
        </div>
      )}
    </div>
  );
}

function SidebarNavItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const IconComponent = ICON_MAP[item.icon];

  return (
    <NavLink
      to={item.path}
      end={item.end}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 px-3 py-2.5 mx-2 rounded-lg text-[13px] font-medium transition-all duration-150 cursor-pointer',
          isActive
            ? 'bg-[rgba(57,118,168,0.3)] text-white'
            : 'text-[#A8C4DC] hover:bg-[rgba(255,255,255,0.08)] hover:text-white',
          collapsed && 'justify-center px-0 mx-2'
        )
      }
      title={collapsed ? item.label : undefined}
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#3976A8] rounded-r-full" />
          )}
          {IconComponent && (
            <IconComponent
              size={17}
              className={cn(
                'flex-shrink-0 transition-colors',
                isActive ? 'text-[#5B90BB]' : 'text-[#6B92AD] group-hover:text-white'
              )}
            />
          )}
          {!collapsed && (
            <span className="truncate">{item.label}</span>
          )}
          {!collapsed && item.badge !== undefined && item.badge > 0 && (
            <span className="ml-auto bg-[#3976A8] text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {item.badge}
            </span>
          )}
          {collapsed && (
            <span className="absolute left-full ml-2 px-2 py-1 bg-[#1e3d66] text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
              {item.label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
}

export function AppSidebar({ role }: AppSidebarProps) {
  const { isCollapsed, toggle } = useSidebarStore();
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const navConfig = getNavConfig(role);

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully.');
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        'h-full flex flex-col bg-[#183153] border-r border-[#1e3d66] transition-all duration-300 ease-in-out overflow-hidden flex-shrink-0',
        isCollapsed ? 'w-[72px]' : 'w-[250px]'
      )}
    >
      {/* Logo */}
      <TruckFlowLogo collapsed={isCollapsed} />

      {/* Divider */}
      <div className="mx-4 h-px bg-[#1e3d66]" />

      {/* Role label */}
      {!isCollapsed && (
        <div className="px-5 pt-4 pb-2">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-[#4A7A9B]">
            {ROLE_LABELS[role]}
          </span>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 space-y-0.5">
        {navConfig.items.map(item => (
          <SidebarNavItem key={item.path} item={item} collapsed={isCollapsed} />
        ))}
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[#1e3d66]">
        {/* Collapse toggle */}
        <button
          onClick={toggle}
          className="w-full flex items-center gap-3 px-4 py-3 text-[#4A7A9B] hover:text-white hover:bg-[rgba(255,255,255,0.05)] transition-colors text-[12px]"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight size={16} />
          ) : (
            <>
              <ChevronLeft size={16} />
              <span className="font-medium">Collapse</span>
            </>
          )}
        </button>

        {/* User profile */}
        {user && (
          <div className={cn(
            'px-3 pb-4',
            isCollapsed && 'px-2'
          )}>
            <div className={cn(
              'flex items-center gap-3 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors',
              isCollapsed && 'justify-center'
            )}>
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-bold"
                style={{ backgroundColor: user.avatarColor ?? '#3976A8' }}
              >
                {user.avatarInitials}
              </div>
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <div className="text-white text-[12px] font-semibold truncate">{user.name}</div>
                  <div className="text-[#4A7A9B] text-[10px] truncate">{user.email}</div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className={cn(
                'w-full flex items-center gap-3 px-2 py-2 mt-1 rounded-lg text-[#4A7A9B] hover:text-[#D94A4A] hover:bg-[rgba(217,74,74,0.08)] transition-colors text-[12px] font-medium',
                isCollapsed && 'justify-center'
              )}
              title="Sign out"
            >
              <LogOut size={15} className="flex-shrink-0" />
              {!isCollapsed && <span>Sign Out</span>}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
