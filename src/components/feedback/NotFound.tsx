import { FileQuestion, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FA] dark:bg-[#0f1620] flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-[#EFF6FF] dark:bg-[#1e2d44] rounded-full flex items-center justify-center mx-auto mb-6">
          <FileQuestion size={36} className="text-[#3976A8]" />
        </div>
        <div className="text-[64px] font-black text-[#CBD5E1] dark:text-[#2d3f55] leading-none mb-3">404</div>
        <h1 className="text-[22px] font-bold text-[#182230] dark:text-[#e2e8f0] mb-2">
          Page Not Found
        </h1>
        <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8] leading-relaxed mb-8">
          The page you are looking for does not exist or has been moved.
          Return to the previous page or dashboard to continue.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 bg-[#183153] text-white px-5 py-2.5 rounded-lg text-[13px] font-medium hover:bg-[#1e3d66] transition-colors cursor-pointer"
        >
          <ArrowLeft size={15} />
          Go Back
        </button>
      </div>
    </div>
  );
}
