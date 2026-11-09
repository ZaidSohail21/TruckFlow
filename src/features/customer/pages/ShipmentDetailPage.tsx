import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  FileText, 
  CheckCircle2, 
  Bot, 
  Send
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { StatusBadge } from '@/components/shared/StatusBadge';
import { InfoRow } from '@/components/shared/InfoRow';
import { MOCK_LOADS } from '@/mocks/loads';
import { formatDate } from '@/lib/utils';
import { toast } from 'sonner';

export function ShipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const load = MOCK_LOADS.find(l => l.id === id) || MOCK_LOADS[0];

  // AI Chat mock state
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: `Hello! I am your TruckFlow AI Freight Assistant. I am monitoring consignment #${load.id}. How can I assist you with this shipment?`,
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userText = inputMessage;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setInputMessage('');

    // Generate responsive AI response
    setTimeout(() => {
      let reply = `Consignment #${load.id} is currently progressing on schedule towards ${load.destination}. Current vehicle telemetry indicates optimal speeds with an estimated arrival at ${load.eta ? formatDate(load.eta) : 'the scheduled window'}.`;
      if (userText.toLowerCase().includes('where') || userText.toLowerCase().includes('location')) {
        reply = `Vehicle ${load.truckNumber || 'TRK-012'} is currently en route on the regional corridor approximately 85 miles from ${load.destination}.`;
      } else if (userText.toLowerCase().includes('driver') || userText.toLowerCase().includes('phone')) {
        reply = `The assigned driver is ${load.driverName || 'James Walters'}. You can also reach our 24/7 central dispatch at +1 (800) 555-FLOW.`;
      } else if (userText.toLowerCase().includes('pod') || userText.toLowerCase().includes('bol')) {
        reply = `The digital Bill of Lading has been verified by the shipper. Signed delivery proof will be generated immediately upon destination scan.`;
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 600);
  };

  const milestones = [
    { label: 'Booking Confirmed', date: 'Nov 04, 07:00 AM', status: 'COMPLETED' },
    { label: 'Loaded at Shipper', date: 'Nov 04, 08:30 AM', status: 'COMPLETED' },
    { label: 'In Regional Transit', date: 'Currently Active', status: 'ACTIVE' },
    { label: 'Arrived at Destination', date: 'Expected 02:45 PM', status: 'UPCOMING' },
    { label: 'Signed Delivery (POD)', date: 'Expected 03:00 PM', status: 'UPCOMING' },
  ];

  return (
    <PageContainer>
      {/* Top Navigation */}
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={() => navigate('/customer/shipments')}
          className="flex items-center gap-2 text-xs font-semibold text-[#64748B] hover:text-[#182230] dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          <span>Back to All Shipments</span>
        </button>

        <div className="flex items-center gap-2">
          <StatusBadge status={load.status} type="load" />
        </div>
      </div>

      {/* Shipment Header Banner */}
      <div className="bg-white dark:bg-[#1a2332] rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] p-6 shadow-xs mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#F1F5F9] dark:border-[#243447] pb-5">
          <div>
            <span className="font-mono text-xs font-bold text-[#3976A8] dark:text-[#93c5fd] block mb-1">
              CONSIGNMENT #{load.id}
            </span>
            <h1 className="text-xl font-bold text-[#182230] dark:text-white">
              {load.pickup} → {load.destination}
            </h1>
            <p className="text-xs text-[#64748B] dark:text-[#94a3b8] mt-1">
              Consignee: <strong className="text-[#182230] dark:text-white">{load.customerName}</strong>
            </p>
          </div>

          <div className="bg-[#EFF6FF] dark:bg-[#1e2d44] px-4 py-3 rounded-xl border border-[#DBEAFE] dark:border-[#2d3f55] text-right">
            <span className="text-[10px] text-[#3976A8] dark:text-[#93c5fd] uppercase font-bold tracking-wider block">
              Estimated Delivery
            </span>
            <span className="text-sm font-bold text-[#182230] dark:text-white">
              {load.eta ? formatDate(load.eta) : 'Pending Schedule'}
            </span>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="pt-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-4">Milestone Progression</h3>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            {milestones.map((m, idx) => (
              <div 
                key={idx}
                className={`p-3 rounded-xl border transition-all text-xs ${
                  m.status === 'COMPLETED' 
                    ? 'bg-emerald-50/50 border-emerald-200 dark:bg-emerald-950/20 dark:border-emerald-800'
                    : m.status === 'ACTIVE'
                      ? 'bg-blue-50/60 border-[#3976A8] dark:bg-blue-950/30 ring-1 ring-[#3976A8]'
                      : 'bg-[#F8FAFC] border-[#E2E8F0] dark:bg-[#131b26] dark:border-[#243447]'
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1">
                  {m.status === 'COMPLETED' ? (
                    <CheckCircle2 size={14} className="text-emerald-600" />
                  ) : m.status === 'ACTIVE' ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#3976A8] animate-pulse" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                  )}
                  <span className="font-bold text-[#182230] dark:text-white text-[11px] truncate">
                    {m.label}
                  </span>
                </div>
                <span className="text-[10px] text-[#64748B] dark:text-[#94a3b8] block">
                  {m.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid: Telemetry & AI Concierge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Load Specs & Digital Documents (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Freight Specifications */}
          <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-3">Freight Specifications</h3>
            <InfoRow label="Commodity Description" value={load.commodity} />
            <InfoRow label="Billed Gross Weight" value={load.weight} />
            <InfoRow label="Origin Terminal" value={load.pickup} />
            <InfoRow label="Destination Facility" value={load.destination} />
            <InfoRow label="Assigned Tractor" value={load.truckNumber || 'TRK-012 (Cascadia)'} />
            <InfoRow label="Assigned Driver" value={load.driverName || 'James Walters'} />
          </div>

          {/* Documents Card */}
          <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8]">Associated Digital Manifests</h3>
            
            <div className="p-3 bg-[#F8FAFC] dark:bg-[#131b26] rounded-lg border border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <FileText size={16} className="text-[#3976A8]" />
                <div>
                  <span className="font-semibold text-[#182230] dark:text-white block">
                    Electronic Bill of Lading (BOL-{load.id})
                  </span>
                  <span className="text-[11px] text-emerald-600">Verified & Authenticated</span>
                </div>
              </div>
              <button
                onClick={() => toast.success(`Downloaded electronic BOL document for ${load.id}`)}
                className="px-3 py-1 bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] rounded text-[11px] font-semibold text-[#3976A8] hover:bg-[#F8FAFC]"
              >
                Download PDF
              </button>
            </div>
          </div>
        </div>

        {/* Right: AI Shipment Concierge (5 cols) */}
        <div className="lg:col-span-5 flex flex-col bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs overflow-hidden h-[540px]">
          {/* Concierge Header */}
          <div className="p-4 border-b border-[#F1F5F9] dark:border-[#243447] bg-[#F8FAFC] dark:bg-[#131b26] flex items-center gap-2.5">
            <div className="p-2 bg-gradient-to-br from-[#183153] to-[#3976A8] text-white rounded-lg">
              <Bot size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[#182230] dark:text-white flex items-center gap-1.5">
                <span>TruckFlow Assistant</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </h4>
              <p className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">Ask any question about this consignment</p>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#3976A8] text-white rounded-br-none'
                      : 'bg-[#F1F5F9] dark:bg-[#1e2a3a] text-[#182230] dark:text-[#cbd5e1] rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 border-t border-[#F1F5F9] dark:border-[#243447] flex gap-1.5 overflow-x-auto text-[10px]">
            <button
              onClick={() => setInputMessage('Where is my shipment right now?')}
              className="px-2.5 py-1 bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-full hover:bg-slate-100 text-[#64748B] whitespace-nowrap"
            >
              Where is it now?
            </button>
            <button
              onClick={() => setInputMessage('What is the latest arrival window?')}
              className="px-2.5 py-1 bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-full hover:bg-slate-100 text-[#64748B] whitespace-nowrap"
            >
              Arrival window?
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-3 border-t border-[#F1F5F9] dark:border-[#243447] flex items-center gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              placeholder="Ask about this shipment..."
              className="flex-1 px-3 py-2 text-xs bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg text-[#182230] dark:text-white placeholder-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3976A8]/30"
            />
            <button
              type="submit"
              className="p-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send size={14} />
            </button>
          </form>
        </div>
      </div>
    </PageContainer>
  );
}