import { useState, useMemo } from 'react';
import { 
  UserPlus, 
  CheckCircle2, 
  KeyRound
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';
import { FilterBar } from '@/components/shared/FilterBar';
import { Modal } from '@/components/shared/Modal';
import { Drawer } from '@/components/shared/Drawer';
import { InfoRow } from '@/components/shared/InfoRow';
import { MOCK_USERS } from '@/mocks/users';
import type { User, UserRole } from '@/types';
import { toast } from 'sonner';
import { formatDate } from '@/lib/utils';

export function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [inviteModalOpen, setInviteModalOpen] = useState(false);

  // Invite state
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'DISPATCHER' as UserRole,
    department: 'Dispatch Operations',
    phone: '',
  });

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const q = search.toLowerCase();
      const matchesSearch = !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        (u.department?.toLowerCase().includes(q) ?? false);
      const matchesRole = !roleFilter || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, search, roleFilter]);

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inviteForm.name || !inviteForm.email) {
      toast.error('Please enter name and email');
      return;
    }
    const initials = inviteForm.name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newUser: User = {
      id: `usr-00${users.length + 1}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      avatarInitials: initials,
      avatarColor: '#3976A8',
      department: inviteForm.department,
      phone: inviteForm.phone || '+1 (555) 000-0000',
      createdAt: new Date().toISOString(),
    };

    setUsers(prev => [newUser, ...prev]);
    toast.success(`Invitation email sent to ${newUser.email}`);
    setInviteModalOpen(false);
    setInviteForm({
      name: '',
      email: '',
      role: 'DISPATCHER',
      department: 'Dispatch Operations',
      phone: '',
    });
  };

  const getRoleBadgeStyle = (role: UserRole) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300 border-purple-200';
      case 'DISPATCHER': return 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200';
      case 'FLEET_MANAGER': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200';
      case 'DRIVER': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300 border-amber-200';
      case 'CUSTOMER': return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  return (
    <PageContainer>
      <PageHeader
        title="User & Access Management"
        subtitle="Provision accounts, assign system roles, and govern enterprise permissions."
        actions={
          <button
            onClick={() => setInviteModalOpen(true)}
            className="px-3.5 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
          >
            <UserPlus size={15} />
            <span>Invite User</span>
          </button>
        }
      />

      {/* Filter Bar */}
      <div className="mb-5">
        <FilterBar
          searchValue={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search by name, email, department..."
          filters={[
            {
              label: 'Role',
              value: roleFilter,
              onChange: setRoleFilter,
              options: [
                { label: 'All Roles', value: '' },
                { label: 'Administrator', value: 'ADMIN' },
                { label: 'Dispatcher', value: 'DISPATCHER' },
                { label: 'Fleet Manager', value: 'FLEET_MANAGER' },
                { label: 'Driver', value: 'DRIVER' },
                { label: 'Customer', value: 'CUSTOMER' },
              ],
            },
          ]}
        />
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm overflow-hidden">
        <div className="px-5 py-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
          <span className="text-[13px] font-semibold text-[#182230] dark:text-[#e2e8f0]">Active User Accounts</span>
          <span className="text-xs text-[#94A3B8]">{filteredUsers.length} user{filteredUsers.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F8FAFC] dark:bg-[#131b26] border-b border-[#F1F5F9] dark:border-[#243447]">
                {['User', 'Assigned Role', 'Department', 'Phone', 'Created Date', 'Status', 'Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wide text-[#94A3B8]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9] dark:divide-[#243447]">
              {filteredUsers.map(user => (
                <tr
                  key={user.id}
                  className="hover:bg-[#F8FAFC] dark:hover:bg-[#131b26] transition-colors"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-white text-xs flex-shrink-0"
                        style={{ backgroundColor: user.avatarColor || '#183153' }}
                      >
                        {user.avatarInitials}
                      </div>
                      <div>
                        <div className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{user.name}</div>
                        <div className="text-[11px] text-[#94A3B8]">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${getRoleBadgeStyle(user.role)}`}>
                      {user.role.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                    {user.department || 'General'}
                  </td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                    {user.phone || '—'}
                  </td>
                  <td className="px-4 py-3 text-[#64748B] dark:text-[#94a3b8]">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                      <CheckCircle2 size={12} />
                      <span>Active</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="px-2.5 py-1 text-[11px] font-semibold text-[#3976A8] hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded transition-colors"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => toast.info(`Password reset link dispatched for ${user.email}`)}
                        className="p-1 text-[#94A3B8] hover:text-[#182230] dark:hover:text-white"
                        title="Reset Password"
                      >
                        <KeyRound size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Drawer */}
      <Drawer
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title={selectedUser?.name ?? ''}
        subtitle={selectedUser?.email}
        width="md"
      >
        {selectedUser && (
          <div className="space-y-6">
            <div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${getRoleBadgeStyle(selectedUser.role)}`}>
                {selectedUser.role.replace('_', ' ')}
              </span>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Account Details</h3>
              <InfoRow label="User ID" value={<span className="font-mono">{selectedUser.id}</span>} />
              <InfoRow label="Full Name" value={selectedUser.name} />
              <InfoRow label="Email" value={selectedUser.email} />
              <InfoRow label="Department" value={selectedUser.department || 'Not specified'} />
              <InfoRow label="Phone" value={selectedUser.phone || 'Not provided'} />
              <InfoRow label="Created" value={formatDate(selectedUser.createdAt)} />
              <InfoRow label="MFA Authentication" value="Enabled (Authenticator App)" />
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">Administrative Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    toast.success(`Access permissions updated for ${selectedUser.name}`);
                    setSelectedUser(null);
                  }}
                  className="w-full py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold transition-colors"
                >
                  Save Permission Overrides
                </button>
                <button
                  onClick={() => {
                    toast.warning(`User account ${selectedUser.name} deactivated.`);
                    setSelectedUser(null);
                  }}
                  className="w-full py-2 border border-rose-300 dark:border-rose-800 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-lg text-xs font-semibold transition-colors"
                >
                  Deactivate User Account
                </button>
              </div>
            </div>
          </div>
        )}
      </Drawer>

      {/* Invite User Modal */}
      <Modal
        isOpen={inviteModalOpen}
        onClose={() => setInviteModalOpen(false)}
        title="Invite New User"
        subtitle="Send an activation link and grant workspace privileges."
        footer={
          <>
            <button
              onClick={() => setInviteModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold text-[#64748B]"
            >
              Cancel
            </button>
            <button
              onClick={handleInvite}
              className="px-4 py-2 bg-[#3976A8] hover:bg-[#2e628c] text-white rounded-lg text-xs font-semibold"
            >
              Send Invitation
            </button>
          </>
        }
      >
        <form onSubmit={handleInvite} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Full Legal Name *
            </label>
            <input
              type="text"
              value={inviteForm.name}
              onChange={e => setInviteForm(p => ({ ...p, name: e.target.value }))}
              placeholder="e.g. Rachel Miller"
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
              Corporate Email Address *
            </label>
            <input
              type="email"
              value={inviteForm.email}
              onChange={e => setInviteForm(p => ({ ...p, email: e.target.value }))}
              placeholder="e.g. r.miller@truckflow.com"
              className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
                Workspace Role *
              </label>
              <select
                value={inviteForm.role}
                onChange={e => setInviteForm(p => ({ ...p, role: e.target.value as UserRole }))}
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              >
                <option value="DISPATCHER">Dispatcher</option>
                <option value="FLEET_MANAGER">Fleet Manager</option>
                <option value="DRIVER">Driver</option>
                <option value="CUSTOMER">Customer Representative</option>
                <option value="ADMIN">Administrator</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#182230] dark:text-[#e2e8f0] mb-1">
                Department
              </label>
              <input
                type="text"
                value={inviteForm.department}
                onChange={e => setInviteForm(p => ({ ...p, department: e.target.value }))}
                placeholder="e.g. Dispatch Operations"
                className="w-full px-3 py-2 text-xs border border-[#E2E8F0] dark:border-[#2d3f55] rounded-lg dark:bg-[#1a2332] dark:text-white"
              />
            </div>
          </div>
        </form>
      </Modal>
    </PageContainer>
  );
}