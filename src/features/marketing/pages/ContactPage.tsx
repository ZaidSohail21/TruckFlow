import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2, Info } from 'lucide-react';
import { FormInput } from '@/components/forms/FormInput';
import { submitContactInquiry } from '../services/contactService';
import type { ContactFormData } from '../types/marketing.types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid work email address.'),
  organization: z.string().optional(),
  inquiryType: z.enum(['sales', 'support', 'partnership', 'general'] as const),
  subject: z.string().min(5, 'Subject must be at least 5 characters.'),
  message: z.string().min(15, 'Message must be at least 15 characters.'),
});

export function ContactPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{ referenceId: string; message: string } | null>(null);

  useEffect(() => {
    document.title = 'Contact TruckFlow — Inquiries & Operational Support';
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'general',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsLoading(true);
    const result = await submitContactInquiry(data);
    setIsLoading(false);

    if (result.success && result.referenceId) {
      setSuccessResult({
        referenceId: result.referenceId,
        message: result.message,
      });
      reset();
    }
  };

  return (
    <div className="flex flex-col w-full bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Hero */}
      <section className="py-20 lg:py-24 bg-[#183153] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-[#3976A8]/40 border border-[#5b90bb]/40 text-[#c2dcfa]">
            Get In Touch
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            Connect With the TruckFlow Team.
          </h1>
          <p className="text-base sm:text-lg text-[#cbd5e1] max-w-xl mx-auto leading-relaxed">
            Have questions regarding platform capabilities, fleet pilot participation, or technical
            architecture? Send us a message below.
          </p>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-16 lg:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-[#131d2a] border border-[#E2E8F0] dark:border-[#2d3f55] shadow-sm space-y-8">
          {/* Demonstration Notice */}
          <div className="p-4 rounded-xl bg-[#EFF6FF] dark:bg-[#152336] border border-[#BFDBFE] dark:border-[#2d4363] flex items-start gap-3 text-xs text-[#1E40AF] dark:text-[#93c5fd]">
            <Info size={16} className="text-[#3976A8] flex-shrink-0 mt-0.5" />
            <div>
              <strong>Demonstration Mode:</strong> In Phase 1.5, form submissions are logged locally in
              the isolated mock adapter and assign a demonstration reference identifier. No production
              email server is connected yet.
            </div>
          </div>

          {successResult ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-14 h-14 bg-[#ECFDF5] text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 size={32} />
              </div>
              <h2 className="text-2xl font-bold text-[#182230] dark:text-white">
                Inquiry Logged Successfully
              </h2>
              <p className="text-sm text-[#64748B] dark:text-[#94a3b8] max-w-md mx-auto">
                {successResult.message}
              </p>
              <div className="p-3 bg-[#F8FAFC] dark:bg-[#1a2638] rounded-xl font-mono text-xs text-[#3976A8] inline-block">
                Reference ID: {successResult.referenceId}
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSuccessResult(null)}
                  className="px-6 py-2.5 bg-[#183153] dark:bg-[#3976A8] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Your Name"
                  placeholder="e.g. Marcus Vance"
                  error={errors.name?.message}
                  required
                  {...register('name')}
                />

                <FormInput
                  label="Work Email Address"
                  type="email"
                  placeholder="name@company.com"
                  error={errors.email?.message}
                  required
                  {...register('email')}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput
                  label="Organization / Carrier Name"
                  placeholder="e.g. Apex Freight Logistics"
                  error={errors.organization?.message}
                  {...register('organization')}
                />

                <div className="space-y-1.5">
                  <label className="block text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0]">
                    Inquiry Type <span className="text-[#D94A4A]">*</span>
                  </label>
                  <select
                    className="w-full h-10 px-3 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-[13px] text-[#182230] dark:text-[#e2e8f0] outline-none focus:border-[#3976A8]"
                    {...register('inquiryType')}
                  >
                    <option value="general">General Information</option>
                    <option value="sales">Platform Evaluation & Access</option>
                    <option value="support">Technical & Dispatch Support</option>
                    <option value="partnership">Carrier & Technology Partnership</option>
                  </select>
                </div>
              </div>

              <FormInput
                label="Subject"
                placeholder="Brief summary of your inquiry"
                error={errors.subject?.message}
                required
                {...register('subject')}
              />

              <div className="space-y-1.5">
                <label className="block text-[13px] font-medium text-[#182230] dark:text-[#e2e8f0]">
                  Message <span className="text-[#D94A4A]">*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your operational requirements, fleet size, or questions..."
                  className="w-full p-3.5 rounded-lg border border-[#E2E8F0] dark:border-[#2d3f55] bg-white dark:bg-[#1a2332] text-[13px] text-[#182230] dark:text-[#e2e8f0] placeholder-[#94A3B8] outline-none focus:border-[#3976A8]"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-[11px] font-medium text-[#D94A4A]">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#183153] hover:bg-[#24426b] dark:bg-[#3976A8] dark:hover:bg-[#2c608a] text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Logging inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>Submit Inquiry</span>
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
