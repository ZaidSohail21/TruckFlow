import { useState } from 'react';
import { PageContainer } from '@/components/shared/PageContainer';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { MOCK_LOADS } from '@/mocks/loads';
import { formatDateTime } from '@/lib/utils';
import { MapPin, Navigation, Phone, CheckCircle2, FileUp, AlertCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export function DriverDashboard() {
  const currentLoad = MOCK_LOADS[0]; // TF-1042
  const [driverStatus, setDriverStatus] = useState<'EN_ROUTE' | 'AT_STOP' | 'COMPLETED'>('EN_ROUTE');

  return (
    <PageContainer className="max-w-3xl">
      {/* Mobile-first Header */}
      <div className="mb-5 pb-3 border-b border-[#E2E8F0] dark:border-[#2d3f55]">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#3976A8]">
              Driver Workspace
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-[#182230] dark:text-[#e2e8f0]">
              My Active Assignment
            </h1>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
            <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
            On Duty
          </span>
        </div>
      </div>

      {/* Main Focus: Active Assignment Hero Card */}
      <div className="bg-white dark:bg-[#1a2332] rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 sm:p-6 shadow-sm space-y-5 mb-5">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#F1F5F9] dark:border-[#243447]">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-[#3976A8] bg-[#EFF6FF] dark:bg-[#1e2d44] px-2.5 py-1 rounded-lg">
              {currentLoad.id}
            </span>
            <span className="text-sm font-semibold text-[#182230] dark:text-[#e2e8f0]">
              {currentLoad.customerName}
            </span>
          </div>
          <StatusBadge status={currentLoad.status} type="load" />
        </div>

        {/* Route Details */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#EFF6FF] text-[#3976A8] flex items-center justify-center flex-shrink-0 mt-0.5">
              <MapPin size={16} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#64748B] dark:text-[#94a3b8]">
                Origin Pickup
              </div>
              <div className="text-[15px] font-bold text-[#182230] dark:text-[#e2e8f0]">
                {currentLoad.pickup}
              </div>
              <div className="text-xs text-[#64748B] dark:text-[#94a3b8]">
                Picked up: Yesterday, 7:00 AM
              </div>
            </div>
          </div>

          <div className="ml-4 pl-4 border-l-2 border-dashed border-[#CBD5E1] dark:border-[#2d3f55] py-1">
            <span className="text-[11px] font-mono text-[#64748B] dark:text-[#94a3b8]">
              284 miles • Est. 4h 30m driving
            </span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-[#ECFDF5] text-[#16A36A] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Navigation size={16} />
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-wider font-semibold text-[#64748B] dark:text-[#94a3b8]">
                Delivery Destination
              </div>
              <div className="text-[15px] font-bold text-[#182230] dark:text-[#e2e8f0]">
                {currentLoad.destination}
              </div>
              <div className="text-xs text-[#16A36A] font-semibold flex items-center gap-1 mt-0.5">
                <Clock size={13} />
                ETA: {currentLoad.eta ? formatDateTime(currentLoad.eta) : 'Today, 2:30 PM'}
              </div>
            </div>
          </div>
        </div>

        {/* Load Specs */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-[#F1F5F9] dark:border-[#243447] text-xs">
          <div className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26]">
            <span className="text-[#64748B] dark:text-[#94a3b8] block">Weight</span>
            <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{currentLoad.weight}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26]">
            <span className="text-[#64748B] dark:text-[#94a3b8] block">Commodity</span>
            <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{currentLoad.commodity}</span>
          </div>
        </div>

        {/* Large Touch-Friendly Driver Action Buttons */}
        <div className="pt-2 space-y-2">
          <button
            type="button"
            onClick={() => {
              setDriverStatus('AT_STOP');
              toast.success('Status updated: Arrived at Destination');
            }}
            className="w-full h-12 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer active:scale-[0.99]"
          >
            <CheckCircle2 size={18} />
            {driverStatus === 'AT_STOP' ? '✓ Checked in at Destination' : 'Confirm Arrival at Destination'}
          </button>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => toast.info('Proof of delivery camera upload planned for Phase 2')}
              className="h-11 bg-white dark:bg-[#131b26] border border-[#CBD5E1] dark:border-[#2d3f55] hover:bg-[#F8FAFC] dark:hover:bg-[#243447] text-[#182230] dark:text-[#e2e8f0] rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <FileUp size={15} />
              Upload POD
            </button>

            <button
              type="button"
              onClick={() => toast.warning('Dispatcher emergency line contacted (Simulated)')}
              className="h-11 bg-[#FEF2F2] dark:bg-[#2a1515] border border-[#FECACA] dark:border-[#4a2020] text-[#D94A4A] rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertCircle size={15} />
              Report Issue
            </button>
          </div>
        </div>
      </div>

      {/* Dispatch Support Fast Call */}
      <div className="p-4 bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] flex items-center justify-between text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#EFF6FF] text-[#3976A8] flex items-center justify-center">
            <Phone size={16} />
          </div>
          <div>
            <div className="font-bold text-[#182230] dark:text-[#e2e8f0]">Dispatch Desk: Marcus Johnson</div>
            <div className="text-[#64748B] dark:text-[#94a3b8]">+1 (555) 002-0002</div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => toast.info('Connecting call to Dispatch Desk...')}
          className="px-3 py-1.5 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg font-semibold text-xs transition-colors cursor-pointer"
        >
          Call
        </button>
      </div>
    </PageContainer>
  );
}
