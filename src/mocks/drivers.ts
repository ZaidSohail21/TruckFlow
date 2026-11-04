/**
 * MOCK DATA — Phase 1 demonstration only.
 * Replace with real API calls in production.
 */
import type { Driver } from '../types';

export const MOCK_DRIVERS: Driver[] = [
  { id: 'drv-001', name: 'Carlos Rivera', email: 'c.rivera@truckflow.com', phone: '+1 (555) 101-0001', licenseNumber: 'OH-CDL-4812937', status: 'ON_DUTY', assignedTruckId: 'trk-003', assignedLoadId: 'TF-1039', currentLocation: 'Cleveland, OH' },
  { id: 'drv-002', name: 'Maria Santos', email: 'm.santos@truckflow.com', phone: '+1 (555) 101-0002', licenseNumber: 'OH-CDL-5923841', status: 'ON_DUTY', assignedTruckId: 'trk-007', assignedLoadId: 'TF-1041', currentLocation: 'Milwaukee, WI' },
  { id: 'drv-003', name: 'David Kim', email: 'd.kim@truckflow.com', phone: '+1 (555) 101-0003', licenseNumber: 'OH-CDL-6034752', status: 'ON_DUTY', assignedTruckId: 'trk-005', assignedLoadId: 'TF-1037', currentLocation: 'Toledo, OH' },
  { id: 'drv-004', name: 'James Walters', email: 'j.walters@truckflow.com', phone: '+1 (555) 101-0004', licenseNumber: 'OH-CDL-7145863', status: 'ON_DUTY', assignedTruckId: 'trk-012', assignedLoadId: 'TF-1042', currentLocation: 'South Bend, IN' },
  { id: 'drv-005', name: 'Patricia Moore', email: 'p.moore@truckflow.com', phone: '+1 (555) 101-0005', licenseNumber: 'OH-CDL-8256974', status: 'ON_DUTY', assignedTruckId: 'trk-011', assignedLoadId: 'TF-1035', currentLocation: 'Dayton, OH' },
  { id: 'drv-006', name: 'Angela Brooks', email: 'a.brooks@truckflow.com', phone: '+1 (555) 101-0006', licenseNumber: 'OH-CDL-9367085', status: 'AVAILABLE', assignedTruckId: null, assignedLoadId: null, currentLocation: 'Columbus, OH' },
  { id: 'drv-007', name: 'Thomas Grant', email: 't.grant@truckflow.com', phone: '+1 (555) 101-0007', licenseNumber: 'OH-CDL-0478196', status: 'OFF_DUTY', assignedTruckId: null, assignedLoadId: null, currentLocation: null },
  { id: 'drv-008', name: 'Sandra Lee', email: 's.lee@truckflow.com', phone: '+1 (555) 101-0008', licenseNumber: 'OH-CDL-1589207', status: 'ON_LEAVE', assignedTruckId: null, assignedLoadId: null, currentLocation: null },
];
