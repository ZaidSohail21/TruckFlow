import { useState } from 'react';
import { Plus, Calendar, Download } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { ActiveLoadsPreview } from '../components/ActiveLoadsPreview';
import { RecentActivity } from '../components/RecentActivity';
import { AIRecommendationCard } from '../components/AIRecommendationCard';
import { FleetOverviewCard } from '../components/FleetOverviewCard';
import { ConfirmationDialog } from '@/components/feedback/ConfirmationDialog';
import { MOCK_LOAD_STATS } from '@/mocks/loads';
import { MOCK_FLEET_STATS } from '@/mocks/trucks';
import { toast } from 'sonner';

const TODAY_FORMATTED = new Date().toLocaleDateString('en-US', {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
});

export function DispatcherDashboard() {
  const [createLoadOpen, setCreateLoadOpen] = useState(false);
  const today = TODAY_FORMATTED;

  return (
    <PageContainer>
      {/* Header */}
      <PageHeader
        title="Good morning, Dispatcher"
        subtitle="Here is an overview of your dispatch operations and active fleet assignments."
        actions={
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg text-xs font-medium text-[#64748B] dark:text-[#94a3b8] shadow-2xs">
              <Calendar size={14} className="text-[#3976A8]" />
              <span>{today}</span>
            </div>

            <button
              type="button"
              onClick={() => toast.info('Exporting dispatch operations summary report (Phase 2 feature)')}
              className="p-2 sm:px-3 sm:py-2 bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] text-[#182230] dark:text-[#e2e8f0] rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
              title="Export Report"
            >
              <Download size={14} />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={() => setCreateLoadOpen(true)}
              className="px-3.5 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <Plus size={15} />
              <span>Create New Load</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Loads"
          value={MOCK_LOAD_STATS.total}
          icon="Package"
          delta={{ value: '+12%', direction: 'up', label: 'vs last week' }}
          variant="default"
        />
        <StatCard
          title="Active Loads"
          value={MOCK_LOAD_STATS.active}
          icon="Activity"
          delta={{ value: '+4', direction: 'up', label: 'today' }}
          variant="default"
        />
        <StatCard
          title="Available Trucks"
          value={MOCK_FLEET_STATS.available}
          icon="Truck"
          delta={{ value: '75%', direction: 'neutral', label: 'fleet ready' }}
          variant="success"
        />
        <StatCard
          title="Delayed Loads"
          value={String(MOCK_LOAD_STATS.delayed).padStart(2, '0')}
          icon="AlertTriangle"
          delta={{ value: '-2', direction: 'down', label: 'resolved' }}
          variant="danger"
        />
      </div>

      {/* Main Grid: Loads Table + Right Insights Column */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Left 2 Cols: Active Loads Data Table */}
        <div className="lg:col-span-2 space-y-6">
          <ActiveLoadsPreview />
        </div>

        {/* Right 1 Col: AI Insights + Fleet Overview */}
        <div className="space-y-6">
          <AIRecommendationCard />
          <FleetOverviewCard />
        </div>
      </div>

      {/* Bottom Full-Width Section: Recent Activity Timeline */}
      <div className="mb-6">
        <RecentActivity />
      </div>

      {/* Placeholder Load Creation Dialog */}
      <ConfirmationDialog
        isOpen={createLoadOpen}
        onClose={() => setCreateLoadOpen(false)}
        onConfirm={() => {
          setCreateLoadOpen(false);
          toast.success('Load creation workflow placeholder triggered. Full creation form is planned for Phase 2.');
        }}
        title="Create New Load"
        description="The interactive multi-step load creation module (specifying customer, freight type, pickup/drop dates, and rate) will be fully implemented in Phase 2: Load Management."
        confirmLabel="Understood"
        cancelLabel="Close"
        variant="primary"
      />
    </PageContainer>
  );
}
