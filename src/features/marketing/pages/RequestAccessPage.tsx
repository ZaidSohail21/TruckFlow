import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, Loader2, ArrowRight, ArrowLeft, Info } from 'lucide-react';
import { FormInput } from '@/components/forms/FormInput';
import { submitAccessRequest } from '../services/requestAccessService';
import type { AccessRequestData, AccessRequestRecord, PublicRoleOption } from '../types/marketing.types';

const accessRequestSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid work email address.'),
  organization: z.string().min(2, 'Organization or carrier name is required.'),
  role: z.enum(['DISPATCHER', 'FLEET_MANAGER', 'DRIVER', 'CUSTOMER'] as const, {
    message: 'Please select a valid role for your access request.',
  }),
  phone: z.string().optional(),
  reason: z.string().min(10, 'Please provide at least a brief explanation for your request.'),
  additionalInfo: z.string().optional(),
});

const ROLE_OPTIONS: { value: PublicRoleOption; label: string; desc: string }[] = [
  {
    value: 'DISPATCHER',
    label: 'Dispatcher',
    desc: 'Load matching recommendations & dispatch board operations',
  },
  {
    value: 'FLEET_MANAGER',
    label: 'Fleet Manager',
    desc: 'Vehicle fleet roster, asset readiness & maintenance scheduling',
  },
  {
    value: 'DRIVER',
    label: 'Driver',
    desc: 'Mobile-first assignment viewer & arrival check-in interface',
  },
  {
    value: 'CUSTOMER',
    label: 'Customer / Shipper',
    desc: 'Self-service freight shipment tracking & delivery support',
  },
];

export function RequestAccessPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedRecord, setSubmittedRecord] = useState<AccessRequestRecord | null>(null);

  useEffect(() => {
    document.title = 'Request Access — TruckFlow Enterprise Platform';
  }, []);

  const [selectedRole, setSelectedRole] = useState<PublicRoleOption>('DISPATCHER');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<AccessRequestData>({
    resolver: zodResolver(accessRequestSchema),
    defaultValues: {
      role: 'DISPATCHER',
    },
  });

  const onSubmit = async (data: AccessRequestData) => {
    setIsLoading(true);
    setErrorMessage(null);

    const result = await submitAccessRequest(data);
    setIsLoading(false);

    if (result.success && result.record) {
      setSubmittedRecord(result.record);
    } else {
      setErrorMessage(result.error ?? 'Failed to submit request. Please try again.');
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Hero Header */}
      <section className="py-20 lg:py-24 bg-[#183153] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3976A8]/40 border border-[#5b90bb]/40 text-[#c2dcfa]">
            Controlled Platform Access
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Become Part of TruckFlow.
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] max-w-xl mx-auto leading-relaxed">
            Interested in using TruckFlow for your fleet operations? Submit an access request and our team
            can review your operational requirements.
          </p>
        </div>
      </section>

      {/* Main Request Form Container */}
      <section className="py-16 lg:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm space-y-8">
          {/* Demonstration & Governance Notice */}
          <div className="p-4 rounded-xl bg-[#EFF6FF] dark:bg-[#152336] border border-[#BFDBFE] dark:border-[#2d4363] flex items-start gap-3 text-xs text-[#1E40AF] dark:text-[#93c5fd]">
            <Info size={16} className="text-[#3976A8] flex-shrink-0 mt-0.5" />
            <div>
              <strong>Supervised Provisioning Notice:</strong> TruckFlow does not offer unrestricted public
              self-registration. Submitting this request places your organization into the administrative
              review queue. System Administrator credentials are reserved for platform supervisors.
            </div>
          </div>

          {submittedRecord ? (
            /* Success Screen */
            <div className="py-10 text-center space-y-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#ECFDF5] text-[#16A36A] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={36} />
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-[#182230] dark:text-white">
                  Your Access Request Has Been Submitted
                </h2>
                <p className="text-sm text-[#64748B] dark:text-[#94a3b8] max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in TruckFlow. Your request for the{' '}
                  <strong className="text-[#182230] dark:text-white">
                    {submittedRecord.role.replace('_', ' ')}
                  </strong>{' '}
                  role at <strong className="text-[#182230] dark:text-white">{submittedRecord.organization}</strong> has
                  been recorded for review.
                </p>
              </div>

              <div className="p-4 bg-[#F8FAFC] dark:bg-[#1a2638] rounded-xl font-mono text-xs text-[#3976A8] inline-block border border-[#E2E8F0] dark:border-[#2d3f55]">
                REQUEST TRACKING ID: {submittedRecord.id}
              </div>

              <div className="p-4 rounded-xl bg-[#FFFBEB] dark:bg-[#201c10] border border-[#FDE68A] dark:border-[#382f14] text-xs text-[#92400E] dark:text-[#fde68a] max-w-md mx-auto text-left">
                <strong>Next Steps:</strong> Submitting a request does not automatically activate an account.
                Our operations team reviews submissions within 1–2 business days before issuing login
                credentials.
              </div>

              <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                <Link
                  to="/"
                  className="px-5 py-2.5 rounded-xl border border-[#CBD5E1] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-xs font-bold text-[#182230] dark:text-white hover:bg-[#F8FAFC] dark:hover:bg-[#243447] transition-colors"
                >
                  <ArrowLeft size={14} className="inline mr-1.5" />
                  Return to Home
                </Link>

                <Link
                  to="/login"
                  className="px-6 py-2.5 rounded-xl bg-[#183153] dark:bg-[#3976A8] text-white text-xs font-bold hover:bg-[#24426b] transition-colors shadow-xs"
                >
                  Go to Sign In
                  <ArrowRight size={14} className="inline ml-1.5" />
                </Link>
              </div>
            </div>
          ) : (
            /* Form Screen */
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {errorMessage && (
                <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-xl text-xs font-medium text-[#991B1B]">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Full Name"
                  placeholder="e.g. Rachel Sterling"
                  error={errors.fullName?.message}
                  required
                  {...register('fullName')}
                />

                <FormInput
                  label="Work Email Address"
                  type="email"
                  placeholder="rachel@carrier.com"
                  error={errors.email?.message}
                  required
                  {...register('email')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Organization / Carrier Name"
                  placeholder="e.g. Great Lakes Freight LLC"
                  error={errors.organization?.message}
                  required
                  {...register('organization')}
                />

                <FormInput
                  label="Phone Number (Optional)"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </div>

              {/* Role Selection Grid */}
              <div className="space-y-2">
                <label className="block text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0]">
                  Requested Role <span className="text-[#D94A4A]">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ROLE_OPTIONS.map(opt => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => {
                        setSelectedRole(opt.value);
                        setValue('role', opt.value);
                      }}
                      className={`p-3.5 rounded-xl text-left border transition-all cursor-pointer ${
                        selectedRole === opt.value
                          ? 'border-[#3976A8] bg-[#EFF6FF] dark:bg-[#1e2d44] text-[#1E40AF] dark:text-[#93c5fd] shadow-xs'
                          : 'border-[#E2E8F0] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-[#182230] dark:text-[#cbd5e1] hover:border-[#CBD5E1]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs">{opt.label}</span>
                        {selectedRole === opt.value && (
                          <CheckCircle2 size={15} className="text-[#3976A8]" />
                        )}
                      </div>
                      <p className="text-[11px] text-[#64748B] dark:text-[#94a3b8] mt-1 leading-snug">
                        {opt.desc}
                      </p>
                    </button>
                  ))}
                </div>
                {errors.role && (
                  <p className="text-[11px] font-medium text-[#D94A4A]">{errors.role.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0]">
                  Reason for Request <span className="text-[#D94A4A]">*</span>
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your fleet size, dispatch operations, or intended evaluation..."
                  className="w-full p-3.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-[13px] text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] outline-none focus:border-[#3976A8]"
                  {...register('reason')}
                />
                {errors.reason && (
                  <p className="text-[11px] font-medium text-[#D94A4A]">{errors.reason.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0]">
                  Additional Information (Optional)
                </label>
                <input
                  type="text"
                  placeholder="Operating regions, active tractor units, or TMS integrations"
                  className="w-full h-10 px-3.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-[13px] text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] outline-none focus:border-[#3976A8]"
                  {...register('additionalInfo')}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#183153] hover:bg-[#24426b] dark:bg-[#3976A8] dark:hover:bg-[#2c608a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Submitting access request...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck size={16} />
                    <span>Submit Access Request</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
