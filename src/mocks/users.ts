/**
 * MOCK DATA — Phase 1 demonstration only.
 * Replace with real API calls in production.
 */
import type { User } from '../types';

export const MOCK_USERS: User[] = [
  {
    id: 'usr-001',
    email: 'admin@truckflow.com',
    name: 'Sarah Chen',
    role: 'ADMIN',
    avatarInitials: 'SC',
    avatarColor: '#183153',
    department: 'Administration',
    phone: '+1 (555) 001-0001',
    createdAt: '2025-01-15T08:00:00Z',
  },
  {
    id: 'usr-002',
    email: 'dispatcher@truckflow.com',
    name: 'Marcus Johnson',
    role: 'DISPATCHER',
    avatarInitials: 'MJ',
    avatarColor: '#3976A8',
    department: 'Dispatch Operations',
    phone: '+1 (555) 002-0002',
    createdAt: '2025-02-01T08:00:00Z',
  },
  {
    id: 'usr-003',
    email: 'fleet@truckflow.com',
    name: 'Linda Torres',
    role: 'FLEET_MANAGER',
    avatarInitials: 'LT',
    avatarColor: '#16A36A',
    department: 'Fleet Management',
    phone: '+1 (555) 003-0003',
    createdAt: '2025-02-15T08:00:00Z',
  },
  {
    id: 'usr-004',
    email: 'driver@truckflow.com',
    name: 'Roberto Vasquez',
    role: 'DRIVER',
    avatarInitials: 'RV',
    avatarColor: '#D99A25',
    department: 'Drivers',
    phone: '+1 (555) 004-0004',
    createdAt: '2025-03-01T08:00:00Z',
  },
  {
    id: 'usr-005',
    email: 'customer@truckflow.com',
    name: 'Alex Morgan',
    role: 'CUSTOMER',
    avatarInitials: 'AM',
    avatarColor: '#3976A8',
    phone: '+1 (555) 005-0005',
    createdAt: '2025-04-01T08:00:00Z',
  },
];

export function findUserByEmail(email: string): User | undefined {
  return MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
}
