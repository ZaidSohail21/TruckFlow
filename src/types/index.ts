// ============================================================
// TruckFlow — Core TypeScript Types & Interfaces
// ============================================================

export type UserRole =
  | 'ADMIN'
  | 'DISPATCHER'
  | 'FLEET_MANAGER'
  | 'DRIVER'
  | 'CUSTOMER';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarInitials: string;
  avatarColor?: string;
  department?: string;
  phone?: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// ----------------------------------------------------------------
// Navigation
// ----------------------------------------------------------------

export interface NavItem {
  label: string;
  path: string;
  icon: string; // Lucide icon name string
  badge?: number;
  children?: NavItem[];
}

export interface NavConfig {
  role: UserRole;
  defaultPath: string;
  items: NavItem[];
}

// ----------------------------------------------------------------
// Loads
// ----------------------------------------------------------------

export type LoadStatus =
  | 'PENDING'
  | 'ASSIGNED'
  | 'IN_TRANSIT'
  | 'DELIVERED'
  | 'DELAYED'
  | 'CANCELLED';

export interface Load {
  id: string;
  customerId: string;
  customerName: string;
  pickup: string;
  destination: string;
  truckId: string | null;
  truckNumber: string | null;
  driverId: string | null;
  driverName: string | null;
  status: LoadStatus;
  eta: string | null;
  createdAt: string;
  weight: string;
  commodity: string;
}

// ----------------------------------------------------------------
// Trucks
// ----------------------------------------------------------------

export type TruckStatus = 'AVAILABLE' | 'ASSIGNED' | 'MAINTENANCE' | 'UNAVAILABLE';

export interface Truck {
  id: string;
  number: string;
  make: string;
  model: string;
  year: number;
  licensePlate: string;
  status: TruckStatus;
  driverId: string | null;
  lastLocation: string | null;
  mileage: number;
}

// ----------------------------------------------------------------
// Drivers
// ----------------------------------------------------------------

export type DriverStatus = 'AVAILABLE' | 'ON_DUTY' | 'OFF_DUTY' | 'ON_LEAVE';

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  status: DriverStatus;
  assignedTruckId: string | null;
  assignedLoadId: string | null;
  currentLocation: string | null;
}

// ----------------------------------------------------------------
// Activity
// ----------------------------------------------------------------

export type ActivityType =
  | 'LOAD_ASSIGNED'
  | 'LOAD_DELIVERED'
  | 'LOAD_DELAYED'
  | 'DRIVER_UPDATE'
  | 'TRUCK_ASSIGNED'
  | 'SYSTEM';

export interface ActivityEvent {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  referenceId?: string;
  referenceType?: 'load' | 'truck' | 'driver';
}

// ----------------------------------------------------------------
// KPI / Stats
// ----------------------------------------------------------------

export interface StatCardData {
  title: string;
  value: string | number;
  icon: string;
  description?: string;
  delta?: {
    value: string;
    direction: 'up' | 'down' | 'neutral';
    label: string;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
}

// ----------------------------------------------------------------
// AI Recommendations (Phase 1 — Mock only)
// ----------------------------------------------------------------

export interface AIRecommendation {
  id: string;
  type: 'DISPATCH' | 'ROUTE' | 'ETA' | 'ALERT';
  loadId: string;
  title: string;
  explanation: string;
  confidence: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}

// ----------------------------------------------------------------
// API Response Shapes (future-ready)
// ----------------------------------------------------------------

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ----------------------------------------------------------------
// Theme
// ----------------------------------------------------------------

export type Theme = 'light' | 'dark';

// ----------------------------------------------------------------
// Notifications
// ----------------------------------------------------------------

export interface Notification {
  id: string;
  title: string;
  body: string;
  read: boolean;
  timestamp: string;
  type: 'info' | 'success' | 'warning' | 'danger';
  link?: string;
}
