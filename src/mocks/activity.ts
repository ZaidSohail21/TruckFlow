/**
 * MOCK DATA — Phase 1 demonstration only.
 * Replace with real API calls in production.
 */
import type { ActivityEvent, Notification } from '../types';

export const MOCK_ACTIVITY: ActivityEvent[] = [
  {
    id: 'act-001',
    type: 'LOAD_ASSIGNED',
    title: 'Load assigned to truck',
    description: 'Load TF-1042 assigned to Truck TRK-012 with Driver James Walters.',
    timestamp: '2026-11-05T00:05:00Z',
    referenceId: 'TF-1042',
    referenceType: 'load',
  },
  {
    id: 'act-002',
    type: 'DRIVER_UPDATE',
    title: 'Driver updated pickup status',
    description: 'James Walters confirmed pickup for Load TF-1042 at Chicago, IL.',
    timestamp: '2026-11-04T23:48:00Z',
    referenceId: 'TF-1042',
    referenceType: 'load',
  },
  {
    id: 'act-003',
    type: 'LOAD_DELIVERED',
    title: 'Load delivered successfully',
    description: 'Load TF-1038 marked as delivered at Louisville, KY. POD received.',
    timestamp: '2026-11-04T22:30:00Z',
    referenceId: 'TF-1038',
    referenceType: 'load',
  },
  {
    id: 'act-004',
    type: 'LOAD_DELAYED',
    title: 'Delay alert generated',
    description: 'Load TF-1035 is running approximately 2 hours behind schedule due to weather conditions.',
    timestamp: '2026-11-04T21:15:00Z',
    referenceId: 'TF-1035',
    referenceType: 'load',
  },
  {
    id: 'act-005',
    type: 'TRUCK_ASSIGNED',
    title: 'Truck assignment updated',
    description: 'TRK-003 assigned to Load TF-1039. Driver Carlos Rivera notified.',
    timestamp: '2026-11-04T20:00:00Z',
    referenceId: 'TF-1039',
    referenceType: 'load',
  },
  {
    id: 'act-006',
    type: 'DRIVER_UPDATE',
    title: 'Driver status update received',
    description: 'Maria Santos reported in-transit on TF-1041. ETA confirmed for 4:00 PM.',
    timestamp: '2026-11-04T18:45:00Z',
    referenceId: 'TF-1041',
    referenceType: 'load',
  },
  {
    id: 'act-007',
    type: 'LOAD_ASSIGNED',
    title: 'New load created and pending',
    description: 'Load TF-1040 created for Hartfield Retail Co. Awaiting truck assignment.',
    timestamp: '2026-11-04T17:30:00Z',
    referenceId: 'TF-1040',
    referenceType: 'load',
  },
];

export const MOCK_NOTIFICATIONS: Notification[] = [
  { id: 'notif-001', title: 'Load TF-1035 Delayed', body: 'Running 2 hours behind schedule due to weather.', read: false, timestamp: '2026-11-04T21:15:00Z', type: 'warning', link: '/dispatcher/loads' },
  { id: 'notif-002', title: 'Load TF-1038 Delivered', body: 'Successfully delivered to Louisville, KY.', read: false, timestamp: '2026-11-04T22:30:00Z', type: 'success', link: '/dispatcher/loads' },
  { id: 'notif-003', title: 'New Load Pending Assignment', body: 'TF-1040 from Hartfield Retail needs a truck.', read: true, timestamp: '2026-11-04T17:30:00Z', type: 'info', link: '/dispatcher/dispatch' },
  { id: 'notif-004', title: 'Driver Update Received', body: 'James Walters confirmed pickup for TF-1042.', read: true, timestamp: '2026-11-04T23:48:00Z', type: 'info', link: '/dispatcher/loads' },
];
