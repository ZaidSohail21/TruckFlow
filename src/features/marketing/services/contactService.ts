import type { ContactFormData } from '../types/marketing.types';
import { delay } from '@/lib/utils';

export interface ContactSubmissionResult {
  success: boolean;
  message: string;
  referenceId?: string;
  error?: string;
}

/**
 * Isolated Mock Service for Contact Inquiries
 * Phase 1.5: Validates and accepts demonstration contact inquiries.
 */
export async function submitContactInquiry(
  data: ContactFormData
): Promise<ContactSubmissionResult> {
  await delay(700);

  if (!data.name || !data.email || !data.subject || !data.message) {
    return {
      success: false,
      message: 'Please fill in all required fields.',
      error: 'Incomplete form data',
    };
  }

  const referenceId = `inq-${Date.now().toString(36).toUpperCase()}`;

  return {
    success: true,
    referenceId,
    message: 'Your inquiry has been logged in demonstration mode. Thank you for connecting with TruckFlow.',
  };
}
