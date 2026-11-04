import { Construction, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';

interface ComingSoonProps {
  title: string;
  description: string;
  phase?: string;
}

export function ComingSoon({ title, description, phase = 'Phase 2' }: ComingSoonProps) {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <PageHeader title={title} />
      <div className="bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-[#FFFBEB] dark:bg-[#2a2010] rounded-full flex items-center justify-center mx-auto mb-5">
          <Construction size={28} className="text-[#D99A25]" />
        </div>
        <div className="inline-flex items-center gap-2 bg-[#FFFBEB] dark:bg-[#2a2010] border border-[#FDE68A] rounded-full px-3 py-1 mb-4">
          <span className="text-[11px] font-semibold text-[#92400E]">Planned for {phase}</span>
        </div>
        <h2 className="text-[18px] font-bold text-[#182230] dark:text-[#e2e8f0] mb-2">
          {title} — Coming Soon
        </h2>
        <p className="text-[13px] text-[#64748B] dark:text-[#94a3b8] max-w-sm mx-auto leading-relaxed mb-8">
          {description}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#3976A8] hover:underline text-[13px] font-medium cursor-pointer"
        >
          <ArrowLeft size={14} />
          Back to previous page
        </button>
      </div>
    </PageContainer>
  );
}
