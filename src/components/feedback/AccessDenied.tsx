import { ShieldOff, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';

export function AccessDenied() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const handleGoBack = () => {
    if (user) {
      navigate(ROLE_DEFAULT_PATHS[user.role]);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0f1620] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#FEF2F2] dark:bg-[#2a1515] rounded-full flex items-center justify-center mx-auto mb-6">
          <ShieldOff size={36} className="text-[#D94A4A]" />
        </div>
        <h1 className="text-[22px] font-bold text-[#182230] dark:text-[#e2e8f0] mb-2">
          Access Denied
        </h1>
        <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8] leading-relaxed mb-8">
          You do not have permission to access this page. 
          If you believe this is an error, please contact your system administrator.
        </p>
        <button
          onClick={handleGoBack}
          className="inline-flex items-center gap-2 bg-[#183153] text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#1e3d66] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
