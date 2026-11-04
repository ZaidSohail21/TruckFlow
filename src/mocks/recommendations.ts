/**
 * MOCK DATA — Phase 1 demonstration only.
 * These are sample AI recommendation records for UI demonstration.
 * No actual AI agent is running in Phase 1.
 */
import type { AIRecommendation } from '../types';

export const MOCK_RECOMMENDATIONS: AIRecommendation[] = [
  {
    id: 'rec-001',
    type: 'DISPATCH',
    loadId: 'TF-1040',
    title: 'Suggested assignment for Load TF-1040',
    explanation: 'Load TF-1040 (Hartfield Retail Co., Columbus → Pittsburgh) may be suitable for TRK-001, which is currently available at Columbus depot. Driver assignment pending availability confirmation.',
    confidence: 'HIGH',
    createdAt: '2026-11-05T00:10:00Z',
  },
  {
    id: 'rec-002',
    type: 'ALERT',
    loadId: 'TF-1035',
    title: 'Delay risk detected for Load TF-1035',
    explanation: 'Based on current progress, Load TF-1035 (Dayton → Lexington) may not meet its original ETA. Consider proactive customer notification.',
    confidence: 'MEDIUM',
    createdAt: '2026-11-05T00:08:00Z',
  },
  {
    id: 'rec-003',
    type: 'DISPATCH',
    loadId: 'TF-1036',
    title: 'Suggested assignment for Load TF-1036',
    explanation: 'Load TF-1036 (Akron → Erie) is pending. TRK-004 and TRK-008 are both available and positioned near Akron. Review driver availability before assigning.',
    confidence: 'MEDIUM',
    createdAt: '2026-11-05T00:06:00Z',
  },
];
