import type { UserRole, LoadStatus, TruckStatus, DriverStatus } from '../types';

// ----------------------------------------------------------------
// Role Configuration
// ----------------------------------------------------------------

export const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'System Administrator',
  DISPATCHER: 'Dispatcher',
  FLEET_MANAGER: 'Fleet Manager',
  DRIVER: 'Driver',
  CUSTOMER: 'Customer',
};

export const ROLE_DEFAULT_PATHS: Record<UserRole, string> = {
  ADMIN: '/admin/dashboard',
  DISPATCHER: '/dispatcher/dashboard',
  FLEET_MANAGER: '/fleet/dashboard',
  DRIVER: '/driver/dashboard',
  CUSTOMER: '/track',
};

// ----------------------------------------------------------------
// Load Status
// ----------------------------------------------------------------

export const LOAD_STATUS_LABELS: Record<LoadStatus, string> = {
  PENDING: 'Pending',
  ASSIGNED: 'Assigned',
  IN_TRANSIT: 'In Transit',
  DELIVERED: 'Delivered',
  DELAYED: 'Delayed',
  CANCELLED: 'Cancelled',
};

export const LOAD_STATUS_VARIANTS: Record<
  LoadStatus,
  'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
> = {
  PENDING: 'neutral',
  ASSIGNED: 'info',
  IN_TRANSIT: 'default',
  DELIVERED: 'success',
  DELAYED: 'danger',
  CANCELLED: 'neutral',
};

// ----------------------------------------------------------------
// Truck Status
// ----------------------------------------------------------------

export const TRUCK_STATUS_LABELS: Record<TruckStatus, string> = {
  AVAILABLE: 'Available',
  ASSIGNED: 'Assigned',
  MAINTENANCE: 'Maintenance',
  UNAVAILABLE: 'Unavailable',
};

export const TRUCK_STATUS_VARIANTS: Record<
  TruckStatus,
  'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
> = {
  AVAILABLE: 'success',
  ASSIGNED: 'info',
  MAINTENANCE: 'warning',
  UNAVAILABLE: 'neutral',
};

// ----------------------------------------------------------------
// Driver Status
// ----------------------------------------------------------------

export const DRIVER_STATUS_LABELS: Record<DriverStatus, string> = {
  AVAILABLE: 'Available',
  ON_DUTY: 'On Duty',
  OFF_DUTY: 'Off Duty',
  ON_LEAVE: 'On Leave',
};

export const DRIVER_STATUS_VARIANTS: Record<
  DriverStatus,
  'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'
> = {
  AVAILABLE: 'success',
  ON_DUTY: 'info',
  OFF_DUTY: 'neutral',
  ON_LEAVE: 'warning',
};

// ----------------------------------------------------------------
// Pagination
// ----------------------------------------------------------------

export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [10, 20, 50];

// ----------------------------------------------------------------
// Application Metadata
// ----------------------------------------------------------------

export const APP_NAME = 'TruckFlow';
export const APP_TAGLINE = 'Intelligent Dispatch. Smarter Fleet Operations.';
export const APP_VERSION = '1.0.0-phase1';

// ----------------------------------------------------------------
// Mock Auth Credentials (Phase 1 only — clearly marked)
// ----------------------------------------------------------------

/**
 * MOCK CREDENTIALS — Phase 1 demonstration only.
 * Replace with real authentication in production.
 */
export const MOCK_CREDENTIALS = {
  dispatcher: { email: 'dispatcher@truckflow.com', password: 'demo1234' },
  fleet_manager: { email: 'fleet@truckflow.com', password: 'demo1234' },
  driver: { email: 'driver@truckflow.com', password: 'demo1234' },
  customer: { email: 'customer@truckflow.com', password: 'demo1234' },
  admin: { email: 'admin@truckflow.com', password: 'demo1234' },
} as const;
