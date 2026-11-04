import type { UserRole } from '@/types';

export type PublicRoleOption = Exclude<UserRole, 'ADMIN'>;

export interface AccessRequestData {
  fullName: string;
  email: string;
  organization: string;
  role: PublicRoleOption;
  reason: string;
  phone?: string;
  additionalInfo?: string;
}

export interface AccessRequestRecord extends AccessRequestData {
  id: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED';
}

export interface ContactFormData {
  name: string;
  email: string;
  organization?: string;
  inquiryType: 'sales' | 'support' | 'partnership' | 'general';
  subject: string;
  message: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  roleTitle: string;
  focusArea: string;
  perspective: 'Fleet Operator' | 'Independent Dispatcher' | 'Regional Logistics' | 'Cargo Shipper';
  isVerifiedStudy: boolean;
}

export interface PlatformFeatureItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  iconName: string;
  bulletPoints: string[];
  plannedPhase: string;
}
