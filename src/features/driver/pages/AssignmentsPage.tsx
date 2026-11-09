import { useState } from 'react';
import { 
  Navigation, 
  AlertTriangle, 
  FileText, 
  Phone, 
  ShieldAlert, 
  UploadCloud, 
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { Modal } from '@/components/shared/Modal';
import { toast } from 'sonner';

interface TripStop {
  id: string;
  type: 'PICKUP' | 'DELIVERY';
  facility: string;
  address: string;
  cityState: string;
  scheduledTime: string;
  contactName: string;
  contactPhone: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PENDING';
  specialInstructions: string;
}

export function AssignmentsPage() {
  const [loadStatus, setLoadStatus] = useState<'ASSIGNED' | 'EN_ROUTE_PICKUP' | 'LOADED' | 'IN_TRANSIT' | 'ARRIVED_DELIVERY' | 'DELIVERED'>('IN_TRANSIT');
  const [delayModalOpen, setDelayModalOpen] = useState(false);
  const [podModalOpen, setPodModalOpen] = useState(false);
  const [delayReason, setDelayReason] = useState('Heavy Highway Traffic');
  const [delayDuration, setDelayDuration] = useState('45 mins');
  const [signerName, setSignerName] = useState('');
  const [podUploaded, setPodUploaded] = useState(false);

  const stops: TripStop[] = [
    {
      id: 'stp-1',
      type: 'PICKUP',
      facility: 'BrightStar Manufacturing Terminal #4',
      address: '1420 Riverbed Way',
      cityState: 'Cleveland, OH 44113',
      scheduledTime: 'Today, 07:30 AM',
      contactName: 'Frank Miller (Dock Foreman)',
      contactPhone: '+1 (555) 321-4455',
      status: 'COMPLETED',
      specialInstructions: 'Check-in at gate 2. PPE required (Hard hat & steel-toe boots).',
    },
    {
      id: 'stp-2',
      type: 'DELIVERY',
      facility: 'Great Lakes Logistics Hub',
      address: '880 Harborfront Blvd',
      cityState: 'Buffalo, NY 14203',
      scheduledTime: 'Today, 03:00 PM (ETA 02:45 PM)',
      contactName: 'Sarah Jenkins (Receiving Mgr)',
      contactPhone: '+1 (555) 789-2233',
      status: 'IN_PROGRESS',
      specialInstructions: 'Dock bay 14 through 18. Consignee signature required on BOL.',
    },
  ];

  const handleAdvanceStatus = () => {
    if (loadStatus === 'ASSIGNED') {
      setLoadStatus('EN_ROUTE_PICKUP');
      toast.success('Status updated: Heading to Shipper Pickup.');
    } else if (loadStatus === 'EN_ROUTE_PICKUP') {
      setLoadStatus('LOADED');
      toast.success('Pickup Confirmed: Freight loaded.');
    } else if (loadStatus === 'LOADED') {
      setLoadStatus('IN_TRANSIT');
      toast.success('Status updated: In Transit to Consignee.');
    } else if (loadStatus === 'IN_TRANSIT') {
      setLoadStatus('ARRIVED_DELIVERY');
      toast.success('Status updated: Arrived at Receiving Dock.');
    } else if (loadStatus === 'ARRIVED_DELIVERY') {
      setPodModalOpen(true);
    }
  };

  const handleReportDelay = (e: React.FormEvent) => {
    e.preventDefault();
    toast.warning(`Dispatch notified: ${delayReason} (+${delayDuration})`);
    setDelayModalOpen(false);
  };

  const handleCompletePod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signerName) {
      toast.error('Please enter the consignee receiver signature name');
      return;
    }
    setLoadStatus('DELIVERED');
    setPodModalOpen(false);
    toast.success(`Trip completed! Signed delivery receipt captured by ${signerName}.`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Active Driver Workflow"
        subtitle="Current load manifest, stop sequence, real-time dispatch status, and digital POD."
      />

      {/* Primary Action Card / Active Banner */}
      <div className="bg-gradient-to-r from-[#183153] to-[#264c7d] text-white rounded-2xl p-6 shadow-md mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#3976A8] text-white">
                LOAD #TF-1039
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {loadStatus.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-xl font-bold">Cleveland, OH → Buffalo, NY</h2>
            <p className="text-xs text-slate-300 mt-1">
              Tractor: <strong className="text-white">TRK-003 (Peterbilt 579)</strong> • Trailer: <strong>53ft Dry Van (#TL-882)</strong>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setDelayModalOpen(true)}
              className="px-3.5 py-2 bg-rose-600/30 hover:bg-rose-600/50 text-rose-200 border border-rose-400/30 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <AlertTriangle size={14} />
              <span>Report Delay</span>
            </button>
            <button
              onClick={handleAdvanceStatus}
              disabled={loadStatus === 'DELIVERED'}
              className="px-4 py-2 bg-white hover:bg-slate-100 text-[#183153] rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer disabled:opacity-50"
            >
              {loadStatus === 'ARRIVED_DELIVERY' ? (
                <>
                  <FileText size={14} className="text-[#3976A8]" />
                  <span>Upload POD & Complete</span>
                </>
              ) : loadStatus === 'DELIVERED' ? (
                <>
                  <CheckCircle size={14} className="text-emerald-600" />
                  <span>Trip Completed</span>
                </>
              ) : (
                <>
                  <span>Next: Advance Status</span>
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Quick telemetry indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px]">Commodity</span>
            <span className="font-semibold text-white">Raw Materials (Steel coils)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Gross Weight</span>
            <span className="font-semibold text-white">22,000 lbs</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Target Arrival</span>
            <span className="font-semibold text-amber-300">03:00 PM EST (On Track)</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Dispatch Contact</span>
            <span className="font-semibold text-white">Marcus J. (+1 555-002)</span>
          </div>
        </div>
      </div>

      {/* Trip Stops Sequence */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Stops (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <h3 className="text-sm font-bold text-[#182230] dark:text-[#e2e8f0] flex items-center gap-2">
            <Navigation size={16} className="text-[#3976A8]" />
            <span>Trip Routing & Stops</span>
          </h3>

          <div className="space-y-4">
            {stops.map((stop, idx) => {
              const isCompleted = stop.status === 'COMPLETED';
              const isCurrent = stop.status === 'IN_PROGRESS';

              return (
                <div
                  key={stop.id}
                  className={`bg-white dark:bg-[#1a2332] rounded-xl border p-5 transition-all shadow-xs ${
                    isCurrent
                      ? 'border-[#3976A8] ring-2 ring-[#3976A8]/10'
                      : 'border-[#E2E8F0] dark:border-[#2d3f55]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : isCurrent
                            ? 'bg-[#3976A8] text-white'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {idx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            stop.type === 'PICKUP' 
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300' 
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                          }`}>
                            {stop.type}
                          </span>
                          <span className="text-xs font-semibold text-[#182230] dark:text-white">
                            {stop.scheduledTime}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-[#182230] dark:text-white mt-1">
                          {stop.facility}
                        </h4>
                        <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-0.5">
                          {stop.address}, {stop.cityState}
                        </p>
                      </div>
                    </div>

                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      isCompleted 
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : isCurrent
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 animate-pulse'
                          : 'bg-slate-100 text-slate-600'
                    }`}>
                      {stop.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Contact & Gate Info */}
                  <div className="mt-4 pt-3 border-t border-[#F1F5F9] dark:border-[#243447] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="flex items-center gap-2 text-[#64748B] dark:text-[#94a3b8]">
                      <Phone size={13} className="text-[#3976A8]" />
                      <span>{stop.contactName}: {stop.contactPhone}</span>
                    </div>
                    <div className="text-[#64748B] dark:text-[#94a3b8]">
                      <strong>Note:</strong> {stop.specialInstructions}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Documentation & Safety Checklist (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="text-sm font-bold text-[#182230] dark:text-[#e2e8f0] flex items-center gap-2">
            <FileText size={16} className="text-[#3976A8]" />
            <span>Trip Documents & Safety Check</span>
          </h3>

          <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 space-y-4 shadow-xs">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Required Digital Documents</h4>
            
            <div className="space-y-2">
              <div className="p-3 bg-[#F8FAFC] dark:bg-[#131b26] rounded-lg border border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-[#3976A8]" />
                  <div>
                    <span className="text-xs font-semibold text-[#182230] dark:text-white block">
                      Bill of Lading (BOL #BOL-9921)
                    </span>
                    <span className="text-[11px] text-emerald-600 font-medium">Verified by Shipper</span>
                  </div>
                </div>
                <button
                  onClick={() => toast.info('Displaying digital electronic BOL.')}
                  className="px-2.5 py-1 text-[11px] font-semibold text-[#3976A8] hover:underline"
                >
                  View
                </button>
              </div>

              <div className="p-3 bg-[#F8FAFC] dark:bg-[#131b26] rounded-lg border border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <ShieldAlert size={16} className="text-amber-600" />
                  <div>
                    <span className="text-xs font-semibold text-[#182230] dark:text-white block">
                      Pre-Trip Inspection (DVIR)
                    </span>
                    <span className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">Logged at 06:45 AM today</span>
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-emerald-600">Passed</span>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] pt-2">Direct Terminal Support</h4>
            <div className="p-3 bg-[#EFF6FF] dark:bg-[#1e2d44] rounded-lg text-xs space-y-1.5 text-[#182230] dark:text-[#cbd5e1]">
              <p>Need immediate route help or breakdown assistance?</p>
              <button
                onClick={() => toast.success('Connecting to emergency dispatcher...')}
                className="w-full py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded font-semibold text-center transition-colors"
              >
                Call Dispatch Emergency (+1 800-555-TRUCK)
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delay Modal */}
      <Modal
        isOpen={delayModalOpen}
        onClose={() => setDelayModalOpen(false)}
        title="Report Route Exception / Delay"
        subtitle="This immediately alerts the dispatcher and updates customer ETA forecasts."
        footer={
          <>
            <button
              onClick={() => setDelayModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-[#64748B]"
            >
              Cancel
            </button>
            <button
              onClick={handleReportDelay}
              className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-semibold"
            >
              Broadcast Alert
            </button>
          </>
        }
      >
        <form onSubmit={handleReportDelay} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Delay Reason
            </label>
            <select
              value={delayReason}
              onChange={e => setDelayReason(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
            >
              <option value="Heavy Highway Traffic">Heavy Highway Traffic / Accident Ahead</option>
              <option value="Severe Weather / Blizzard">Severe Weather / Road Conditions</option>
              <option value="Mechanical / Tire Issue">Mechanical or Tire Issue</option>
              <option value="Shipper / Receiver Congestion">Shipper / Receiver Dock Congestion</option>
              <option value="Mandatory HOS 10hr Break">Mandatory HOS 10-Hour Reset</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Estimated Delay Impact
            </label>
            <select
              value={delayDuration}
              onChange={e => setDelayDuration(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
            >
              <option value="30 mins">Approx 30 minutes</option>
              <option value="45 mins">Approx 45 minutes</option>
              <option value="1 to 2 hours">1 to 2 hours</option>
              <option value="Over 3 hours">Over 3 hours</option>
            </select>
          </div>
        </form>
      </Modal>

      {/* Proof of Delivery (POD) Modal */}
      <Modal
        isOpen={podModalOpen}
        onClose={() => setPodModalOpen(false)}
        title="Complete Delivery & Capture POD"
        subtitle="Capture consignee receiving signature to mark load TF-1039 completed."
        footer={
          <>
            <button
              onClick={() => setPodModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-[#64748B]"
            >
              Cancel
            </button>
            <button
              onClick={handleCompletePod}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold"
            >
              Confirm Delivery Complete
            </button>
          </>
        }
      >
        <form onSubmit={handleCompletePod} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Receiver Representative Name *
            </label>
            <input
              type="text"
              value={signerName}
              onChange={e => setSignerName(e.target.value)}
              placeholder="e.g. Sarah Jenkins (Receiving Manager)"
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Receiver Digital Signature Box
            </label>
            <div className="h-28 border-2 border-dashed border-[#CBD5E1] dark:border-[#2d3f55] rounded-lg bg-[#F8FAFC] dark:bg-[#131b26] flex items-center justify-center text-xs text-[#94A3B8]">
              <span>[Receiver signs on screen or terminal tablet]</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Bill of Lading Photo / Proof
            </label>
            <button
              type="button"
              onClick={() => {
                setPodUploaded(true);
                toast.success('BOL delivery document photo attached.');
              }}
              className="w-full py-3 border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg bg-white dark:bg-[#1a2332] text-xs font-semibold text-[#3976A8] hover:bg-[#F8FAFC] flex items-center justify-center gap-2"
            >
              <UploadCloud size={16} />
              <span>{podUploaded ? 'Photo Attached (bol_receipt_signed.pdf)' : 'Take Photo of Signed Paper BOL'}</span>
            </button>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}