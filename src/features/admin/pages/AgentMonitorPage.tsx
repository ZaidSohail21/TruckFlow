import { useState } from 'react';
import { 
  Bot, 
  ShieldCheck, 
  RefreshCw,
  Terminal
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { toast } from 'sonner';

interface AgentInfo {
  id: string;
  name: string;
  role: string;
  status: 'ACTIVE' | 'STANDBY' | 'LEARNING';
  model: string;
  confidence: number;
  decisionsToday: number;
  lastAction: string;
  uptime: string;
}

const AGENTS: AgentInfo[] = [
  {
    id: 'agt-01',
    name: 'Dispatch Match Optimizer',
    role: 'Autonomous Load-to-Truck Matching',
    status: 'ACTIVE',
    model: 'Gemini 2.5 Pro (Fine-tuned)',
    confidence: 96.4,
    decisionsToday: 48,
    lastAction: 'Suggested Angela Brooks for Load #TF-1040 (96% fit)',
    uptime: '99.98%',
  },
  {
    id: 'agt-02',
    name: 'Corridor ETA & Anomaly Forecaster',
    role: 'Real-time Delay & Weather Analysis',
    status: 'ACTIVE',
    model: 'Gemini 2.5 Flash (Streaming)',
    confidence: 98.1,
    decisionsToday: 312,
    lastAction: 'Predicted +45 min delay on I-80 due to Toledo congestion',
    uptime: '100%',
  },
  {
    id: 'agt-03',
    name: 'Preventive Fleet Diagnostics Agent',
    role: 'Telematics & Maintenance Scheduling',
    status: 'ACTIVE',
    model: 'TruckFlow Core Rule-Engine',
    confidence: 94.0,
    decisionsToday: 18,
    lastAction: 'Scheduled 50k-mi servicing for TRK-002',
    uptime: '99.95%',
  },
  {
    id: 'agt-04',
    name: 'Customer Concierge & Tracking Bot',
    role: 'Self-Service Conversational Support',
    status: 'STANDBY',
    model: 'Gemini 2.5 Flash',
    confidence: 92.5,
    decisionsToday: 84,
    lastAction: 'Answered BOL inquiry for Apex Industrial Supply',
    uptime: '99.90%',
  },
];

interface LogEntry {
  id: string;
  timestamp: string;
  agent: string;
  action: string;
  confidence: string;
  status: 'SUCCESS' | 'WARNING';
}

const LOGS: LogEntry[] = [
  { id: 'log-1', timestamp: '17:42:10', agent: 'Dispatch Optimizer', action: 'Evaluated 8 candidate drivers for TF-1040. Recommended TRK-009.', confidence: '96%', status: 'SUCCESS' },
  { id: 'log-2', timestamp: '17:39:04', agent: 'ETA Forecaster', action: 'Telemetry alert: TRK-005 speed 0 mph at Toledo rest stop.', confidence: '99%', status: 'WARNING' },
  { id: 'log-3', timestamp: '17:30:15', agent: 'Customer Concierge', action: 'Dispatched automated webhook ETA update to GreenLeaf Distributors.', confidence: '94%', status: 'SUCCESS' },
  { id: 'log-4', timestamp: '17:15:22', agent: 'Fleet Diagnostics', action: 'TRK-001 passed remote engine telematics health check (No DTC codes).', confidence: '98%', status: 'SUCCESS' },
];

export function AgentMonitorPage() {
  const [requireHumanApproval, setRequireHumanApproval] = useState(true);

  const toggleApproval = () => {
    setRequireHumanApproval(!requireHumanApproval);
    toast.info(`Human-in-the-loop dispatch approval is now ${!requireHumanApproval ? 'ENABLED' : 'DISABLED'}`);
  };

  return (
    <PageContainer>
      <PageHeader
        title="AI Agent Intelligence & Automation Center"
        subtitle="Monitor autonomous dispatch models, confidence scores, and real-time operational reasoning."
        actions={
          <div className="flex items-center gap-3">
            <button
              onClick={() => toast.info('Agent diagnostic tests completed. All neural nodes operating within parameters.')}
              className="px-3.5 py-2 bg-white dark:bg-[#1a2332] border border-[#E2E8F0] dark:border-[#2d3f55] hover:bg-[#F8FAFC] text-[#182230] dark:text-[#e2e8f0] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
            >
              <RefreshCw size={14} className="text-[#3976A8]" />
              <span>Run Diagnostics</span>
            </button>
          </div>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Autonomous Agents"
          value="4"
          icon="Bot"
          variant="success"
          description="100% operational cluster"
        />
        <StatCard
          title="Match Accuracy / Confidence"
          value="96.4%"
          icon="Sparkles"
          description="Average model confidence"
        />
        <StatCard
          title="Daily Automated Decisions"
          value="462"
          icon="Cpu"
          description="Dispatches, ETAs, alerts"
        />
        <StatCard
          title="Inference Latency"
          value="182 ms"
          icon="Activity"
          description="Real-time corridor edge"
        />
      </div>

      {/* Safety Policy & Human-In-The-Loop Banner */}
      <div className="mb-6 p-4 bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 dark:bg-blue-950/40 text-[#3976A8] rounded-lg flex-shrink-0">
            <ShieldCheck size={22} />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#182230] dark:text-white">
              Human-in-the-Loop Safeguard Policy
            </h4>
            <p className="text-xs text-[#64748B] dark:text-[#94a3b8]">
              {requireHumanApproval 
                ? 'Mandatory: Dispatchers must confirm AI load assignments before drivers are notified.'
                : 'Fully Autonomous: AI agents automatically assign and dispatch loads without manual click.'}
            </p>
          </div>
        </div>

        <button
          onClick={toggleApproval}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] text-xs font-semibold hover:bg-[#F8FAFC] dark:hover:bg-[#131b26] transition-colors cursor-pointer"
        >
          {requireHumanApproval ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Human Approval Active</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
              <span>Full Autonomous Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Agent Roster Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {AGENTS.map(agent => (
          <div 
            key={agent.id}
            className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-[#183153] to-[#3976A8] text-white rounded-lg">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#182230] dark:text-white">
                    {agent.name}
                  </h3>
                  <p className="text-xs text-[#64748B] dark:text-[#94a3b8]">
                    {agent.role}
                  </p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                {agent.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs py-2 border-y border-[#F1F5F9] dark:border-[#243447]">
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Model Backbone</span>
                <span className="font-semibold text-[#182230] dark:text-white truncate block">{agent.model}</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Confidence</span>
                <span className="font-semibold text-emerald-600">{agent.confidence}%</span>
              </div>
              <div>
                <span className="text-[#94A3B8] block text-[10px]">Uptime</span>
                <span className="font-semibold text-[#182230] dark:text-white">{agent.uptime}</span>
              </div>
            </div>

            <div className="text-xs bg-[#F8FAFC] dark:bg-[#131b26] p-2.5 rounded-lg border border-[#F1F5F9] dark:border-[#1e2a3a]">
              <span className="text-[#94A3B8] block text-[10px] uppercase font-bold tracking-wider mb-0.5">Last Neural Action</span>
              <p className="text-[#182230] dark:text-[#cbd5e1] font-mono text-[11px] truncate">
                {agent.lastAction}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Decision Log */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-[#182230] dark:text-white">
            <Terminal size={15} className="text-[#3976A8]" />
            <span>Agent Decision Audit Stream</span>
          </div>
          <span className="text-[11px] text-[#94A3B8]">Streaming live events</span>
        </div>

        <div className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
          {LOGS.map(log => (
            <div key={log.id} className="p-3.5 flex items-start justify-between gap-4 text-xs hover:bg-[#F8FAFC] dark:hover:bg-[#131b26]">
              <div className="flex items-start gap-3">
                <span className="font-mono text-[#94A3B8] text-[11px] mt-0.5">{log.timestamp}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#182230] dark:text-white">{log.agent}</span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                      {log.confidence}
                    </span>
                  </div>
                  <p className="text-[#64748B] dark:text-[#94a3b8] mt-0.5">{log.action}</p>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                log.status === 'SUCCESS' ? 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30' : 'text-amber-600 bg-amber-50 dark:bg-amber-950/30'
              }`}>
                {log.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}