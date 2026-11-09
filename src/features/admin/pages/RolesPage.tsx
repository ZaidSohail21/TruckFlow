import { useState } from 'react';
import { Save, RotateCcw } from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { toast } from 'sonner';

interface PermissionRow {
  module: string;
  action: string;
  admin: boolean;
  dispatcher: boolean;
  fleetManager: boolean;
  driver: boolean;
  customer: boolean;
}

const INITIAL_PERMISSIONS: PermissionRow[] = [
  { module: 'Loads & Dispatches', action: 'Create & Post New Loads', admin: true, dispatcher: true, fleetManager: false, driver: false, customer: true },
  { module: 'Loads & Dispatches', action: 'Assign Driver & Tractor', admin: true, dispatcher: true, fleetManager: true, driver: false, customer: false },
  { module: 'Loads & Dispatches', action: 'Update Trip Transit Status', admin: true, dispatcher: true, fleetManager: false, driver: true, customer: false },
  { module: 'Loads & Dispatches', action: 'Delete or Cancel Loads', admin: true, dispatcher: true, fleetManager: false, driver: false, customer: false },
  
  { module: 'Fleet & Equipment', action: 'Add / Register New Tractors', admin: true, dispatcher: false, fleetManager: true, driver: false, customer: false },
  { module: 'Fleet & Equipment', action: 'Schedule Service & Inspection', admin: true, dispatcher: false, fleetManager: true, driver: false, customer: false },
  { module: 'Fleet & Equipment', action: 'View Real-time GPS Telematics', admin: true, dispatcher: true, fleetManager: true, driver: false, customer: false },

  { module: 'Drivers & Compliance', action: 'Manage Driver CDL Roster', admin: true, dispatcher: false, fleetManager: true, driver: false, customer: false },
  { module: 'Drivers & Compliance', action: 'View HOS Electronic Logs', admin: true, dispatcher: true, fleetManager: true, driver: true, customer: false },
  { module: 'Drivers & Compliance', action: 'Submit Pre-Trip Inspections (DVIR)', admin: true, dispatcher: false, fleetManager: true, driver: true, customer: false },

  { module: 'System & Security', action: 'Invite & Deactivate Users', admin: true, dispatcher: false, fleetManager: false, driver: false, customer: false },
  { module: 'System & Security', action: 'Configure AI Dispatch Agents', admin: true, dispatcher: true, fleetManager: false, driver: false, customer: false },
  { module: 'System & Security', action: 'Access Audit Logs & Telemetry', admin: true, dispatcher: false, fleetManager: false, driver: false, customer: false },
];

export function RolesPage() {
  const [permissions, setPermissions] = useState<PermissionRow[]>(INITIAL_PERMISSIONS);

  const togglePermission = (index: number, role: 'admin' | 'dispatcher' | 'fleetManager' | 'driver' | 'customer') => {
    setPermissions(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [role]: !next[index][role] };
      return next;
    });
  };

  const handleSave = () => {
    toast.success('Enterprise Role-Based Access Control matrix saved successfully.');
  };

  const handleReset = () => {
    setPermissions(INITIAL_PERMISSIONS);
    toast.info('Role permissions reset to default templates.');
  };

  return (
    <PageContainer>
      <PageHeader
        title="Roles & Access Control Matrix"
        subtitle="Define granular permissions across TruckFlow modules for each organization role."
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="px-3.5 py-2 border border-[#E2E8F0] dark:border-[#2d3f55] hover:bg-[#F8FAFC] dark:hover:bg-[#1a2332] text-[#64748B] dark:text-[#94a3b8] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw size={14} />
              <span>Reset</span>
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <Save size={14} />
              <span>Save Matrix</span>
            </button>
          </div>
        }
      />

      {/* Matrix Table */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#131b26] border-b border-[#F1F5F9] dark:border-[#243447]">
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Module</th>
                <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Operation / Permission</th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Admin</th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Dispatcher</th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Fleet Mgr</th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Driver</th>
                <th className="px-4 py-3.5 text-center text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]">Customer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
              {permissions.map((p, idx) => (
                <tr key={idx} className="hover:bg-[#F8FAFC] dark:hover:bg-[#131b26] transition-colors">
                  <td className="px-5 py-3 font-semibold text-[#182230] dark:text-[#e2e8f0]">
                    {p.module}
                  </td>
                  <td className="px-5 py-3 text-[#64748B] dark:text-[#94a3b8]">
                    {p.action}
                  </td>
                  {(['admin', 'dispatcher', 'fleetManager', 'driver', 'customer'] as const).map(role => (
                    <td key={role} className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={p[role]}
                        onChange={() => togglePermission(idx, role)}
                        className="w-4 h-4 text-[#3976A8] rounded border-[#CBD5E1] dark:border-[#475569] focus:ring-[#3976A8] cursor-pointer"
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </PageContainer>
  );
}