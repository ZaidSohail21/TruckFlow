import type { AccessRequestData, AccessRequestRecord } from '../types/marketing.types';
import { delay } from '@/lib/utils';

const STORAGE_KEY = 'truckflow_access_requests';

/**
 * Isolated Mock Service for Access Requests
 * Phase 1.5: Stores demonstration access requests in localStorage.
 * Ready for REST/GraphQL API integration in future phases.
 */

export async function submitAccessRequest(
  data: AccessRequestData
): Promise<{ success: boolean; record?: AccessRequestRecord; error?: string }> {
  await delay(800); // Simulate network latency

  if (!data.email || !data.fullName || !data.organization || !data.role || !data.reason) {
    return { success: false, error: 'All required fields must be completed.' };
  }

  // Prevent duplicate submissions in same session
  const existing = getStoredRequests();
  const duplicate = existing.find(
    r => r.email.toLowerCase() === data.email.toLowerCase() && r.status === 'PENDING_REVIEW'
  );

  if (duplicate) {
    return {
      success: false,
      error: 'An access request for this email address is already under review.',
    };
  }

  const record: AccessRequestRecord = {
    ...data,
    id: `req-${Date.now().toString(36)}`,
    submittedAt: new Date().toISOString(),
    status: 'PENDING_REVIEW',
  };

  const updated = [record, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // If storage is full or disabled, gracefully continue
  }

  return { success: true, record };
}

export function getStoredRequests(): AccessRequestRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
