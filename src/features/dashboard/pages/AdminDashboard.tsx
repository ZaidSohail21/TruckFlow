import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { StatCard } from '@/components/shared/StatCard';
import { MOCK_USERS } from '@/mocks/users';
import { ROLE_LABELS } from '@/lib/constants';
import { DataTable, type Column } from '@/components/tables/DataTable';
import type { User } from '@/types';
import { formatDate } from '@/lib/utils';
import { UserPlus, Bot, Shield, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export function AdminDashboard() {
  const userColumns: Column<User>[] = [
    {
      key: 'name',
      header: 'User',
      sortable: true,
      render: user => (
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold"
            style={{ backgroundColor: user.avatarColor ?? '#3976A8' }}
          >
            {user.avatarInitials}
          </div>
          <div>
            <div className="font-semibold text-xs text-[#182230] dark:text-[#e2e8f0]">{user.name}</div>
            <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      render: user => (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#EFF6FF] text-[#1E40AF] dark:bg-[#1e2d44] dark:text-[#93c5fd]">
          <Shield size={11} />
          {ROLE_LABELS[user.role]}
        </span>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: user => (
        <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
          {user.department ?? 'External / Customer'}
        </span>
      ),
    },
    {
      key: 'createdAt',
      header: 'Provisioned',
      render: user => (
        <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
          {formatDate(user.createdAt)}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: () => (
        <span className="inline-flex items-center gap-1 text-xs text-[#16A36A] font-semibold">
          <CheckCircle2 size={13} />
          Active
        </span>
      ),
    },
  ];

  return (
    <PageContainer>
      <PageHeader
        title="System Administration & Agent Governance"
        subtitle="Manage user permissions, monitor autonomous dispatch agents, and review system audit logs."
        actions={
          <button
            type="button"
            onClick={() => toast.info('User creation modal is planned for Phase 2')}
            className="px-3.5 py-2 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <UserPlus size={15} />
            <span>Create User</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Active Users"
          value={MOCK_USERS.length}
          icon="Users"
          variant="default"
        />
        <StatCard
          title="Supervised AI Agents"
          value="4"
          icon="Activity"
          description="Dispatcher, Driver, Support, Tracking"
          variant="default"
        />
        <StatCard
          title="System Health"
          value="99.98%"
          icon="CheckCircle"
          delta={{ value: 'Normal', direction: 'neutral', label: 'services operational' }}
          variant="success"
        />
        <StatCard
          title="Security Audits"
          value="0"
          icon="AlertTriangle"
          delta={{ value: 'No issues', direction: 'neutral', label: 'past 30 days' }}
          variant="default"
        />
      </div>

      {/* Agent Monitoring Status Card */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] p-5 shadow-sm mb-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9] dark:border-[#243447]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#3976A8] rounded-lg flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-[#182230] dark:text-[#e2e8f0]">
                Autonomous Agent Fleet Status
              </h2>
              <span className="text-[10px] text-[#94A3B8]">Agent Supervision & Safety Rails</span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#16A36A] bg-[#ECFDF5] dark:bg-[#0d2a1e] px-2 py-0.5 rounded-full">
            All Agents Healthy
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { name: 'Dispatcher Agent', role: 'Load matching recommendations', status: 'Online' },
            { name: 'Driver Comms Agent', role: 'Driver status & update collection', status: 'Online' },
            { name: 'Customer Support Agent', role: 'Authorized shipment Q&A', status: 'Online' },
            { name: 'Tracking Telematics Agent', role: 'ETA & geofence event monitoring', status: 'Standby' },
          ].map((agent, i) => (
            <div key={i} className="p-3 rounded-lg bg-[#F8FAFC] dark:bg-[#131b26] border border-[#E2E8F0] dark:border-[#2d3f55] space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#182230] dark:text-[#e2e8f0]">{agent.name}</span>
                <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
              </div>
              <div className="text-[11px] text-[#64748B] dark:text-[#94a3b8]">{agent.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* User Management Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-bold text-[#182230] dark:text-[#e2e8f0]">
            User & Role Roster
          </h2>
          <span className="text-xs text-[#64748B] dark:text-[#94a3b8]">
            Showing all provisioned accounts
          </span>
        </div>
        <DataTable
          columns={userColumns}
          data={MOCK_USERS}
          keyExtractor={user => user.id}
          searchPlaceholder="Search users by name, email, department..."
          searchFilter={(user, query) => {
            const q = query.toLowerCase();
            return (
              user.name.toLowerCase().includes(q) ||
              user.email.toLowerCase().includes(q) ||
              (user.department?.toLowerCase().includes(q) ?? false) ||
              ROLE_LABELS[user.role].toLowerCase().includes(q)
            );
          }}
          pageSize={5}
        />
      </div>
    </PageContainer>
  );
}
