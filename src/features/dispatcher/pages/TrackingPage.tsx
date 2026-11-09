import { useState, useMemo } from 'react';
import { 
  Truck as TruckIcon, 
  Navigation, 
  Gauge, 
  BatteryCharging, 
  Clock
} from 'lucide-react';
import { PageContainer } from '@/components/shared/PageContainer';
import { PageHeader } from '@/components/shared/PageHeader';

interface MapPinData {
  id: string;
  name: string;
  x: number; // SVG percentage
  y: number; // SVG percentage
}

const CITIES: MapPinData[] = [
  { id: 'chi', name: 'Chicago, IL', x: 26, y: 34 },
  { id: 'mil', name: 'Milwaukee, WI', x: 24, y: 22 },
  { id: 'det', name: 'Detroit, MI', x: 50, y: 30 },
  { id: 'ind', name: 'Indianapolis, IN', x: 34, y: 52 },
  { id: 'col', name: 'Columbus, OH', x: 52, y: 56 },
  { id: 'cle', name: 'Cleveland, OH', x: 62, y: 36 },
  { id: 'pit', name: 'Pittsburgh, PA', x: 78, y: 46 },
  { id: 'cin', name: 'Cincinnati, OH', x: 46, y: 68 },
  { id: 'lou', name: 'Louisville, KY', x: 38, y: 78 },
  { id: 'buf', name: 'Buffalo, NY', x: 84, y: 25 },
];

interface TrackingVehicle {
  truckId: string;
  truckNumber: string;
  makeModel: string;
  driverName: string;
  loadId: string;
  status: 'IN_TRANSIT' | 'DELAYED' | 'IDLE';
  currentCity: string;
  destination: string;
  speedMph: number;
  heading: string;
  fuelPct: number;
  coords: { x: number; y: number };
  temp: string;
  hosRemaining: string;
  lastPing: string;
}

const VEHICLES: TrackingVehicle[] = [
  {
    truckId: 'trk-012',
    truckNumber: 'TRK-012',
    makeModel: 'Freightliner Cascadia',
    driverName: 'James Walters',
    loadId: 'TF-1042',
    status: 'IN_TRANSIT',
    currentCity: 'En Route to Detroit, MI',
    destination: 'Detroit, MI',
    speedMph: 64,
    heading: 'ENE 72°',
    fuelPct: 82,
    coords: { x: 39, y: 32 },
    temp: '68°F (Ambient)',
    hosRemaining: '6h 45m',
    lastPing: '2 mins ago',
  },
  {
    truckId: 'trk-007',
    truckNumber: 'TRK-007',
    makeModel: 'Peterbilt 389',
    driverName: 'Maria Santos',
    loadId: 'TF-1041',
    status: 'IN_TRANSIT',
    currentCity: 'Near Gary, IN',
    destination: 'Indianapolis, IN',
    speedMph: 58,
    heading: 'SSE 160°',
    fuelPct: 64,
    coords: { x: 29, y: 43 },
    temp: '65°F (Ambient)',
    hosRemaining: '4h 10m',
    lastPing: 'Just now',
  },
  {
    truckId: 'trk-005',
    truckNumber: 'TRK-005',
    makeModel: 'Volvo VNL 860',
    driverName: 'David Kim',
    loadId: 'TF-1037',
    status: 'DELAYED',
    currentCity: 'Toledo, OH (Rest Area)',
    destination: 'Grand Rapids, MI',
    speedMph: 0,
    heading: 'N 0°',
    fuelPct: 45,
    coords: { x: 52, y: 40 },
    temp: '66°F (Ambient)',
    hosRemaining: '2h 15m (Break Required)',
    lastPing: '4 mins ago',
  },
  {
    truckId: 'trk-003',
    truckNumber: 'TRK-003',
    makeModel: 'Peterbilt 579',
    driverName: 'Carlos Rivera',
    loadId: 'TF-1039',
    status: 'IN_TRANSIT',
    currentCity: 'Erie, PA Corridor',
    destination: 'Buffalo, NY',
    speedMph: 62,
    heading: 'NE 45°',
    fuelPct: 76,
    coords: { x: 73, y: 31 },
    temp: '62°F (Ambient)',
    hosRemaining: '8h 20m',
    lastPing: '1 min ago',
  },
  {
    truckId: 'trk-001',
    truckNumber: 'TRK-001',
    makeModel: 'Freightliner Cascadia',
    driverName: 'Unassigned',
    loadId: 'None',
    status: 'IDLE',
    currentCity: 'Columbus Depot, OH',
    destination: 'Depot Yard',
    speedMph: 0,
    heading: 'Parked',
    fuelPct: 95,
    coords: { x: 52, y: 56 },
    temp: '70°F',
    hosRemaining: 'N/A',
    lastPing: '12 mins ago',
  },
];

export function TrackingPage() {
  const [selectedVehicle, setSelectedVehicle] = useState<TrackingVehicle | null>(VEHICLES[0]);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filteredVehicles = useMemo(() => {
    if (filterStatus === 'ALL') return VEHICLES;
    return VEHICLES.filter(v => v.status === filterStatus);
  }, [filterStatus]);

  return (
    <PageContainer>
      <PageHeader
        title="Fleet Telematics & Live Tracking"
        subtitle="Real-time GPS telematics, speed monitoring, and corridor traffic progression."
        actions={
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live Telemetry Active</span>
            </span>
          </div>
        }
      />

      {/* Main Grid: Map + List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Map View Panel (8 cols) */}
        <div className="lg:col-span-8 flex flex-col bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs overflow-hidden">
          {/* Map Top Bar */}
          <div className="p-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between bg-[#F8FAFC] dark:bg-[#131b26]">
            <div className="flex items-center gap-2 text-xs font-bold text-[#182230] dark:text-[#e2e8f0]">
              <Navigation size={14} className="text-[#3976A8]" />
              <span>Midwest Freight Corridor (GPS Feed)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#94A3B8]">4 active, 1 idle</span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/10] bg-[#0E1A2B] overflow-hidden select-none">
            {/* Grid background styling */}
            <svg className="absolute inset-0 w-full h-full opacity-15" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#3976A8" strokeWidth="0.75" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Interstate Routes lines */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* I-94 / I-80 corridor: Milwaukee -> Chicago -> Detroit */}
              <polyline
                points="24%,22% 26%,34% 50%,30% 62%,36% 84%,25%"
                fill="none"
                stroke="#3976A8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
              />
              {/* Chicago -> Indianapolis -> Louisville */}
              <polyline
                points="26%,34% 34%,52% 38%,78%"
                fill="none"
                stroke="#3976A8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
              />
              {/* Indianapolis -> Cincinnati -> Columbus -> Pittsburgh */}
              <polyline
                points="34%,52% 46%,68% 52%,56% 78%,46%"
                fill="none"
                stroke="#3976A8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
              />
              {/* Detroit -> Toledo/Columbus */}
              <polyline
                points="50%,30% 52%,56%"
                fill="none"
                stroke="#3976A8"
                strokeWidth="2.5"
                strokeDasharray="4 4"
                strokeOpacity="0.4"
              />
            </svg>

            {/* City Pins */}
            {CITIES.map(city => (
              <div
                key={city.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-1 pointer-events-none"
                style={{ left: `${city.x}%`, top: `${city.y}%` }}
              >
                <div className="w-2 h-2 rounded-full bg-slate-500/80 border border-slate-300" />
                <span className="text-[10px] font-medium text-slate-400 tracking-tight whitespace-nowrap bg-slate-900/80 px-1 py-0.5 rounded">
                  {city.name.split(',')[0]}
                </span>
              </div>
            ))}

            {/* Truck Markers */}
            {VEHICLES.map(vehicle => {
              const isSelected = selectedVehicle?.truckId === vehicle.truckId;
              const isDelayed = vehicle.status === 'DELAYED';
              const isIdle = vehicle.status === 'IDLE';

              return (
                <button
                  key={vehicle.truckId}
                  onClick={() => setSelectedVehicle(vehicle)}
                  style={{ left: `${vehicle.coords.x}%`, top: `${vehicle.coords.y}%` }}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 group p-1.5 rounded-full transition-transform cursor-pointer ${
                    isSelected ? 'scale-125 z-20' : 'z-10 hover:scale-110'
                  }`}
                  aria-label={`Select ${vehicle.truckNumber}`}
                >
                  {/* Ping Animation for moving trucks */}
                  {!isIdle && (
                    <span 
                      className={`absolute inset-0 rounded-full animate-ping opacity-60 ${
                        isDelayed ? 'bg-rose-500' : 'bg-emerald-400'
                      }`} 
                    />
                  )}
                  {/* Marker Circle */}
                  <div className={`relative flex items-center justify-center w-7 h-7 rounded-full shadow-lg border-2 ${
                    isSelected 
                      ? 'bg-[#3976A8] border-white text-white' 
                      : isDelayed
                        ? 'bg-rose-600 border-white text-white'
                        : isIdle
                          ? 'bg-slate-700 border-slate-400 text-slate-200'
                          : 'bg-emerald-600 border-white text-white'
                  }`}>
                    <TruckIcon size={13} />
                  </div>
                  {/* Label */}
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 px-1.5 py-0.5 rounded text-[10px] font-bold whitespace-nowrap shadow-md ${
                    isSelected
                      ? 'bg-white text-[#183153]'
                      : 'bg-[#183153]/90 text-white'
                  }`}>
                    {vehicle.truckNumber}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick Selected Vehicle Banner */}
          {selectedVehicle && (
            <div className="p-4 bg-[#F8FAFC] dark:bg-[#131b26] border-t border-[#F1F5F9] dark:border-[#243447] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#3976A8]/10 text-[#3976A8] rounded-lg">
                  <TruckIcon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-[#182230] dark:text-white">
                      {selectedVehicle.truckNumber} — {selectedVehicle.driverName}
                    </h4>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      selectedVehicle.status === 'IN_TRANSIT' ? 'bg-emerald-100 text-emerald-800' :
                      selectedVehicle.status === 'DELAYED' ? 'bg-rose-100 text-rose-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {selectedVehicle.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] dark:text-[#94a3b8]">
                    Load: <strong className="font-mono text-[#3976A8]">{selectedVehicle.loadId}</strong> • {selectedVehicle.currentCity}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div className="flex items-center gap-1.5 text-[#64748B] dark:text-[#94a3b8]">
                  <Gauge size={14} className="text-[#3976A8]" />
                  <span>Speed: <strong className="text-[#182230] dark:text-white">{selectedVehicle.speedMph} mph</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#64748B] dark:text-[#94a3b8]">
                  <BatteryCharging size={14} className="text-emerald-600" />
                  <span>Fuel: <strong className="text-[#182230] dark:text-white">{selectedVehicle.fuelPct}%</strong></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#64748B] dark:text-[#94a3b8]">
                  <Clock size={14} className="text-amber-600" />
                  <span>HOS: <strong className="text-[#182230] dark:text-white">{selectedVehicle.hosRemaining}</strong></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vehicles Feed List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs overflow-hidden">
          <div className="p-3.5 border-b border-[#F1F5F9] dark:border-[#243447] flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#182230] dark:text-[#e2e8f0]">Active Vehicles</h3>
            <div className="flex gap-1">
              {['ALL', 'IN_TRANSIT', 'DELAYED'].map(st => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-2 py-0.5 rounded text-[10px] font-semibold transition-colors ${
                    filterStatus === st
                      ? 'bg-[#3976A8] text-white'
                      : 'text-[#64748B] hover:bg-[#F1F5F9] dark:hover:bg-[#243447]'
                  }`}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-[#F1F5F9] dark:divide-[#243447] overflow-y-auto max-h-[600px]">
            {filteredVehicles.map(veh => {
              const isSelected = selectedVehicle?.truckId === veh.truckId;
              return (
                <div
                  key={veh.truckId}
                  onClick={() => setSelectedVehicle(veh)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[#EFF6FF] dark:bg-[#1e2d44]/70 border-l-4 border-l-[#3976A8]'
                      : 'hover:bg-[#F8FAFC] dark:hover:bg-[#131b26]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-mono text-xs font-bold text-[#182230] dark:text-[#e2e8f0]">
                        {veh.truckNumber}
                      </span>
                      <p className="text-xs text-[#64748B] dark:text-[#94a3b8] font-medium">
                        {veh.driverName}
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      veh.status === 'IN_TRANSIT' ? 'bg-emerald-100 text-emerald-800' :
                      veh.status === 'DELAYED' ? 'bg-rose-100 text-rose-800' :
                      'bg-slate-100 text-slate-800'
                    }`}>
                      {veh.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="mt-2 text-[11px] text-[#64748B] dark:text-[#94a3b8] flex items-center justify-between">
                    <span className="truncate max-w-[160px]">{veh.currentCity}</span>
                    <span className="font-semibold text-[#182230] dark:text-white">{veh.speedMph} mph</span>
                  </div>

                  <div className="mt-1 flex items-center justify-between text-[10px] text-[#94A3B8]">
                    <span>Ping: {veh.lastPing}</span>
                    <span>Load: {veh.loadId}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}