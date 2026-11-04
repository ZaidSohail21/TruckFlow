/**
 * MOCK DATA — Phase 1 demonstration only.
 * Replace with real API calls in production.
 */
import type { Truck } from '../types';

export const MOCK_TRUCKS: Truck[] = [
  { id: 'trk-001', number: 'TRK-001', make: 'Freightliner', model: 'Cascadia', year: 2022, licensePlate: 'OH-TF001', status: 'AVAILABLE', driverId: null, lastLocation: 'Columbus, OH', mileage: 48200 },
  { id: 'trk-002', number: 'TRK-002', make: 'Kenworth', model: 'T680', year: 2021, licensePlate: 'OH-TF002', status: 'MAINTENANCE', driverId: null, lastLocation: 'Cleveland Depot', mileage: 92100 },
  { id: 'trk-003', number: 'TRK-003', make: 'Peterbilt', model: '579', year: 2023, licensePlate: 'OH-TF003', status: 'ASSIGNED', driverId: 'drv-001', lastLocation: 'Cleveland, OH', mileage: 31500 },
  { id: 'trk-004', number: 'TRK-004', make: 'Freightliner', model: 'Cascadia', year: 2020, licensePlate: 'OH-TF004', status: 'AVAILABLE', driverId: null, lastLocation: 'Columbus, OH', mileage: 115300 },
  { id: 'trk-005', number: 'TRK-005', make: 'Volvo', model: 'VNL 860', year: 2022, licensePlate: 'OH-TF005', status: 'ASSIGNED', driverId: 'drv-003', lastLocation: 'Toledo, OH', mileage: 67800 },
  { id: 'trk-006', number: 'TRK-006', make: 'Kenworth', model: 'W900', year: 2019, licensePlate: 'OH-TF006', status: 'UNAVAILABLE', driverId: null, lastLocation: 'Columbus Depot', mileage: 189000 },
  { id: 'trk-007', number: 'TRK-007', make: 'Peterbilt', model: '389', year: 2021, licensePlate: 'OH-TF007', status: 'ASSIGNED', driverId: 'drv-002', lastLocation: 'Milwaukee, WI', mileage: 54200 },
  { id: 'trk-008', number: 'TRK-008', make: 'Freightliner', model: 'Cascadia', year: 2023, licensePlate: 'OH-TF008', status: 'AVAILABLE', driverId: null, lastLocation: 'Columbus, OH', mileage: 18900 },
  { id: 'trk-009', number: 'TRK-009', make: 'Mack', model: 'Anthem', year: 2021, licensePlate: 'OH-TF009', status: 'ASSIGNED', driverId: 'drv-006', lastLocation: 'Cincinnati, OH', mileage: 78300 },
  { id: 'trk-010', number: 'TRK-010', make: 'Volvo', model: 'VNL 760', year: 2020, licensePlate: 'OH-TF010', status: 'AVAILABLE', driverId: null, lastLocation: 'Columbus, OH', mileage: 103500 },
];

export const MOCK_FLEET_STATS = {
  total: 24,
  available: 18,
  assigned: 14,
  maintenance: 2,
  unavailable: 2,
};
