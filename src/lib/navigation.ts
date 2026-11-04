/**
 * Centralized navigation configuration for all TruckFlow roles.
 * This is the single source of truth for sidebar items and route permissions.
 */
import type { UserRole } from '../types';

export interface NavItem {
  label: string;
  path: string;
  icon: string;  // Lucide icon name
  badge?: number;
  end?: boolean; // exact match for active state
}

export interface RoleNavConfig {
  role: UserRole;
  defaultPath: string;
  items: NavItem[];
}

export const NAV_CONFIG: Record<UserRole, RoleNavConfig> = {
  DISPATCHER: {
    role: 'DISPATCHER',
    defaultPath: '/dispatcher/dashboard',
    items: [
      { label: 'Dashboard', path: '/dispatcher/dashboard', icon: 'LayoutDashboard', end: true },
      { label: 'Loads', path: '/dispatcher/loads', icon: 'Package' },
      { label: 'Dispatch Board', path: '/dispatcher/dispatch', icon: 'ClipboardList' },
      { label: 'Fleet Tracking', path: '/dispatcher/tracking', icon: 'MapPin' },
      { label: 'Trucks', path: '/dispatcher/trucks', icon: 'Truck' },
      { label: 'Drivers', path: '/dispatcher/drivers', icon: 'Users' },
      { label: 'Routes & ETA', path: '/dispatcher/routes', icon: 'Route' },
      { label: 'Communications', path: '/dispatcher/communications', icon: 'MessageSquare' },
      { label: 'Documents', path: '/dispatcher/documents', icon: 'FileText' },
    ],
  },
  FLEET_MANAGER: {
    role: 'FLEET_MANAGER',
    defaultPath: '/fleet/dashboard',
    items: [
      { label: 'Dashboard', path: '/fleet/dashboard', icon: 'LayoutDashboard', end: true },
      { label: 'Trucks', path: '/fleet/trucks', icon: 'Truck' },
      { label: 'Drivers', path: '/fleet/drivers', icon: 'Users' },
      { label: 'Fleet Tracking', path: '/fleet/tracking', icon: 'MapPin' },
      { label: 'Reports', path: '/fleet/reports', icon: 'BarChart3' },
    ],
  },
  DRIVER: {
    role: 'DRIVER',
    defaultPath: '/driver/dashboard',
    items: [
      { label: 'Dashboard', path: '/driver/dashboard', icon: 'LayoutDashboard', end: true },
      { label: 'My Assignments', path: '/driver/assignments', icon: 'ClipboardCheck' },
      { label: 'Documents', path: '/driver/documents', icon: 'FileText' },
      { label: 'Messages', path: '/driver/messages', icon: 'MessageSquare' },
    ],
  },
  CUSTOMER: {
    role: 'CUSTOMER',
    defaultPath: '/track',
    items: [
      { label: 'Track Shipment', path: '/track', icon: 'MapPin', end: true },
      { label: 'Shipment Details', path: '/customer/shipments', icon: 'Package' },
      { label: 'AI Support', path: '/customer/support', icon: 'Bot' },
      { label: 'Contact Support', path: '/customer/contact', icon: 'Phone' },
    ],
  },
  ADMIN: {
    role: 'ADMIN',
    defaultPath: '/admin/dashboard',
    items: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard', end: true },
      { label: 'User Management', path: '/admin/users', icon: 'Users' },
      { label: 'Roles & Permissions', path: '/admin/roles', icon: 'Shield' },
      { label: 'Agent Monitoring', path: '/admin/agents', icon: 'Bot' },
      { label: 'Activity Logs', path: '/admin/agents/logs', icon: 'ScrollText' },
      { label: 'System Settings', path: '/admin/settings', icon: 'Settings' },
    ],
  },
};

/**
 * Get nav config for a given role.
 */
export function getNavConfig(role: UserRole): RoleNavConfig {
  return NAV_CONFIG[role];
}

/**
 * Check if a path is accessible to a given role.
 */
export function canAccessPath(role: UserRole, path: string): boolean {
  const config = NAV_CONFIG[role];
  return config.items.some(item => path.startsWith(item.path));
}
