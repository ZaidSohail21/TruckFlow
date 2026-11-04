import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AppLayout } from '@/layouts/AppLayout';
import { AuthLayout } from '@/layouts/AuthLayout';
import { MarketingLayout } from '@/layouts/MarketingLayout';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';

// Public Marketing Pages
import { HomePage } from '@/features/marketing/pages/HomePage';
import { RequestAccessPage } from '@/features/marketing/pages/RequestAccessPage';

// Auth pages
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage';
import { ResetPasswordPage } from '@/features/auth/pages/ResetPasswordPage';

// Dashboard pages
import { DispatcherDashboard } from '@/features/dashboard/pages/DispatcherDashboard';
import { FleetDashboard } from '@/features/dashboard/pages/FleetDashboard';
import { DriverDashboard } from '@/features/dashboard/pages/DriverDashboard';
import { AdminDashboard } from '@/features/dashboard/pages/AdminDashboard';
import { CustomerTrackPage } from '@/features/dashboard/pages/CustomerTrackPage';

// Shared feedback pages
import { AccessDenied } from '@/components/feedback/AccessDenied';
import { NotFound } from '@/components/feedback/NotFound';
import { ComingSoon } from '@/components/feedback/ComingSoon';

export const router = createBrowserRouter([
  // ----------------------------------------------------------------
  // Public Marketing Website Routes (Single-Page Anchor Scrolling)
  // ----------------------------------------------------------------
  {
    element: <MarketingLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/what-we-do', element: <Navigate to="/#what-we-do" replace /> },
      { path: '/platform', element: <Navigate to="/#platform" replace /> },
      { path: '/how-it-works', element: <Navigate to="/#how-it-works" replace /> },
      { path: '/work', element: <Navigate to="/#how-it-works" replace /> },
      { path: '/solutions', element: <Navigate to="/#solutions" replace /> },
      { path: '/about', element: <Navigate to="/#about" replace /> },
      { path: '/reviews', element: <Navigate to="/#reviews" replace /> },
      { path: '/contact', element: <Navigate to="/#contact" replace /> },
      { path: '/request-access', element: <RequestAccessPage /> },
    ],
  },

  // ----------------------------------------------------------------
  // Public / Auth Routes
  // ----------------------------------------------------------------
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
      { path: '/reset-password', element: <ResetPasswordPage /> },
    ],
  },

  // ----------------------------------------------------------------
  // Public Customer Shipment Tracking
  // ----------------------------------------------------------------
  {
    path: '/track',
    element: <CustomerTrackPage />,
  },

  // ----------------------------------------------------------------
  // Dispatcher Routes (Protected)
  // ----------------------------------------------------------------
  {
    path: '/dispatcher',
    element: <ProtectedRoute allowedRoles={['DISPATCHER']} />,
    children: [
      {
        element: <AppLayout role="DISPATCHER" />,
        children: [
          { index: true, element: <Navigate to="/dispatcher/dashboard" replace /> },
          { path: 'dashboard', element: <DispatcherDashboard /> },
          {
            path: 'loads',
            element: (
              <ComingSoon
                title="Loads"
                description="Manage, create, and track all freight loads in the TruckFlow system."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'dispatch',
            element: (
              <ComingSoon
                title="Dispatch Board"
                description="Assign loads to trucks and drivers. View the full dispatch board."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'tracking',
            element: (
              <ComingSoon
                title="Fleet Tracking"
                description="Real-time and recorded fleet location visibility."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'trucks',
            element: (
              <ComingSoon
                title="Trucks"
                description="Manage the full truck inventory, maintenance records, and availability."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'drivers',
            element: (
              <ComingSoon
                title="Drivers"
                description="Manage driver profiles, assignments, and availability."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'routes',
            element: (
              <ComingSoon
                title="Routes & ETA"
                description="Route suggestions, ETA calculation, and planning tools."
                phase="Phase 3"
              />
            ),
          },
          {
            path: 'communications',
            element: (
              <ComingSoon
                title="Communications"
                description="Driver communication history and message management."
                phase="Phase 3"
              />
            ),
          },
          {
            path: 'documents',
            element: (
              <ComingSoon
                title="Documents"
                description="Digital delivery confirmations and load documents."
                phase="Phase 3"
              />
            ),
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // Fleet Manager Routes (Protected)
  // ----------------------------------------------------------------
  {
    path: '/fleet',
    element: <ProtectedRoute allowedRoles={['FLEET_MANAGER']} />,
    children: [
      {
        element: <AppLayout role="FLEET_MANAGER" />,
        children: [
          { index: true, element: <Navigate to="/fleet/dashboard" replace /> },
          { path: 'dashboard', element: <FleetDashboard /> },
          {
            path: 'trucks',
            element: (
              <ComingSoon
                title="Trucks"
                description="Fleet inventory, truck profiles, and maintenance tracking."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'drivers',
            element: (
              <ComingSoon
                title="Drivers"
                description="Driver roster, license management, and status tracking."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'tracking',
            element: (
              <ComingSoon
                title="Fleet Tracking"
                description="Location history and fleet movement visibility."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'reports',
            element: (
              <ComingSoon
                title="Reports"
                description="Fleet performance analytics, utilization, and compliance reports."
                phase="Phase 3"
              />
            ),
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // Driver Routes (Protected)
  // ----------------------------------------------------------------
  {
    path: '/driver',
    element: <ProtectedRoute allowedRoles={['DRIVER']} />,
    children: [
      {
        element: <AppLayout role="DRIVER" />,
        children: [
          { index: true, element: <Navigate to="/driver/dashboard" replace /> },
          { path: 'dashboard', element: <DriverDashboard /> },
          {
            path: 'assignments',
            element: (
              <ComingSoon
                title="My Assignments"
                description="View your current and upcoming load assignments."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'documents',
            element: (
              <ComingSoon
                title="Documents"
                description="Access delivery confirmations and load documents."
                phase="Phase 3"
              />
            ),
          },
          {
            path: 'messages',
            element: (
              <ComingSoon
                title="Messages"
                description="Communicate with dispatch and receive load updates."
                phase="Phase 3"
              />
            ),
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // Customer Authenticated Portal Routes (Protected)
  // ----------------------------------------------------------------
  {
    path: '/customer',
    element: <ProtectedRoute allowedRoles={['CUSTOMER']} />,
    children: [
      {
        element: <AppLayout role="CUSTOMER" />,
        children: [
          {
            path: 'shipments',
            element: (
              <ComingSoon
                title="Shipment Details"
                description="View detailed information about your shipments."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'shipments/:id',
            element: (
              <ComingSoon
                title="Shipment Details"
                description="View detailed information about your shipment."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'support',
            element: (
              <ComingSoon
                title="AI Support"
                description="Get automated answers to shipment-related questions."
                phase="Phase 3"
              />
            ),
          },
          {
            path: 'contact',
            element: (
              <ComingSoon
                title="Contact Support"
                description="Reach our human support team for assistance."
                phase="Phase 2"
              />
            ),
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // Administrator Routes (Protected)
  // ----------------------------------------------------------------
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['ADMIN']} />,
    children: [
      {
        element: <AppLayout role="ADMIN" />,
        children: [
          { index: true, element: <Navigate to="/admin/dashboard" replace /> },
          { path: 'dashboard', element: <AdminDashboard /> },
          {
            path: 'users',
            element: (
              <ComingSoon
                title="User Management"
                description="Create, edit, and manage TruckFlow user accounts and roles."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'roles',
            element: (
              <ComingSoon
                title="Roles & Permissions"
                description="Configure role-based access control and permission sets."
                phase="Phase 2"
              />
            ),
          },
          {
            path: 'agents',
            element: (
              <ComingSoon
                title="Agent Monitoring"
                description="Monitor the status and performance of AI dispatch agents."
                phase="Phase 3"
              />
            ),
          },
          {
            path: 'agents/logs',
            element: (
              <ComingSoon
                title="Activity Logs"
                description="Full audit trail of agent actions and system events."
                phase="Phase 3"
              />
            ),
          },
          {
            path: 'settings',
            element: (
              <ComingSoon
                title="System Settings"
                description="Configure global TruckFlow system settings and preferences."
                phase="Phase 2"
              />
            ),
          },
        ],
      },
    ],
  },

  // ----------------------------------------------------------------
  // Shared & Error Routes
  // ----------------------------------------------------------------
  {
    path: '/unauthorized',
    element: <AccessDenied />,
  },
  {
    path: '/404',
    element: <NotFound />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
