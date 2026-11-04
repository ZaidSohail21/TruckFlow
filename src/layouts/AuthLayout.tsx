import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';

export function AuthLayout() {
  const { isAuthenticated, user } = useAuthStore();

  // Redirect already-authenticated users to their dashboard
  if (isAuthenticated && user) {
    const defaultPath = ROLE_DEFAULT_PATHS[user.role] ?? '/dispatcher/dashboard';
    return <Navigate to={defaultPath} replace />;
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0f1620]">
      <Outlet />
    </div>
  );
}
