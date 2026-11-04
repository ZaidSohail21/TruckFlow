import { Bot, ArrowRight, Sparkles } from 'lucide-react';
import { MOCK_RECOMMENDATIONS } from '@/mocks/recommendations';
import { toast } from 'sonner';

export function AIRecommendationCard() {
  return (
    <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] dark:border-[#243447]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] rounded-lg flex items-center justify-center">
            <Bot size={16} />
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-[#182230] dark:text-[#e2e8f0]">
              AI Dispatch Insights
            </h2>
            <span className="text-[10px] text-[#94A3B8]">Supervised Agent Recommendations</span>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-[#3976A8] bg-[#EFF6FF] dark:bg-[#1e2d44] px-2 py-0.5 rounded-full">
          <Sparkles size={10} />
          Sample Output
        </span>
      </div>

      <div className="space-y-3">
        {MOCK_RECOMMENDATIONS.map(rec => (
          <div
            key={rec.id}
            className="p-3.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] bg-[#F8FAFC] dark:bg-[#131b26] space-y-2 hover:border-[#3976A8] dark:hover:border-[#3976A8] transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-[12px] font-semibold text-[#182230] dark:text-[#e2e8f0]">
                {rec.title}
              </span>
              <span className="font-mono text-[10px] font-bold text-[#3976A8] bg-white dark:bg-[#1a2332] border border-[#CBD5E1] dark:border-[#2d3f55] px-1.5 py-0.5 rounded">
                {rec.loadId}
              </span>
            </div>

            <p className="text-[11px] text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
              {rec.explanation}
            </p>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[10px] font-medium text-[#16A36A]">
                Confidence: {rec.confidence}
              </span>
              <button
                type="button"
                onClick={() => toast.info(`Reviewing recommendation for ${rec.loadId} (Available in Phase 2 Dispatch module)`)}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#3976A8] hover:underline cursor-pointer"
              >
                Review Action
                <ArrowRight size={11} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 text-center border-t border-[#F1F5F9] dark:border-[#243447]">
        <p className="text-[10px] text-[#94A3B8]">
          Agentic suggestions require human dispatcher confirmation before dispatch execution.
        </p>
      </div>
    </div>
  );
}
