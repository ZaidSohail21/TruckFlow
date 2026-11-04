import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';

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
