import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import type { UserRole } from '@/types';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
}

/**
 * Route guard that handles:
 * 1. Unauthenticated users → redirect to /login
 * 2. Authenticated but wrong role → redirect to /unauthorized
 * 3. Authenticated and authorized → render <Outlet />
 */
export function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}

/**
 * Redirect authenticated users to their role-specific dashboard.
 * Used at the root "/" route.
 */
export function RoleRedirect() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const defaultPath = ROLE_DEFAULT_PATHS[user.role] ?? '/login';
  return <Navigate to={defaultPath} replace />;
}
