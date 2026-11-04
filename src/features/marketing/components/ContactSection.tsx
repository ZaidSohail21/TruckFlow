import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle2, Loader2, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
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

export function ContactSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [successResult, setSuccessResult] = useState<{ referenceId: string; message: string } | null>(null);

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
    <section
      id="contact"
      className="py-24 lg:py-32 bg-white text-[#142B45] border-t border-[#E5EAF0] scroll-mt-24"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#3976A8] bg-[#EFF6FF] px-3.5 py-1.5 rounded-full border border-[#BFDBFE]">
            Contact & Consultation
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold tracking-tight text-[#142B45] leading-[1.12]">
            Let's Move Freight Forward Together.
          </h2>
          <p className="text-lg sm:text-xl text-[#536477] font-normal leading-relaxed">
            Have questions regarding platform capabilities, fleet pilot participation, or technical
            architecture? Send our operations desk a message below.
          </p>
        </div>

        {/* Contact Form Container */}
        <div className="p-8 sm:p-12 rounded-3xl bg-[#F5F7FA] border border-[#E5EAF0] shadow-sm space-y-8">
          {/* Demonstration Notice */}
          <div className="p-4 rounded-2xl bg-white border border-[#E5EAF0] flex items-start gap-3 text-xs sm:text-sm text-[#536477]">
            <Info size={18} className="text-[#3976A8] flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#142B45]">Demonstration Mode:</strong> Contact submissions are
              logged locally in the isolated service adapter and return a unique demonstration tracking
              code.
            </div>
          </div>

          {successResult ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#ECFDF5] text-[#16A36A] rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-2xl font-bold text-[#142B45]">Inquiry Received</h3>
              <p className="text-base text-[#536477] max-w-md mx-auto">{successResult.message}</p>
              <div className="p-3 bg-white rounded-xl font-mono text-xs font-bold text-[#3976A8] border border-[#E5EAF0] inline-block">
                REFERENCE CODE: {successResult.referenceId}
              </div>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={() => setSuccessResult(null)}
                  className="px-6 py-3 bg-[#183153] hover:bg-[#224470] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput
                  label="Your Full Name"
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput
                  label="Organization / Carrier Name"
                  placeholder="e.g. Apex Freight Logistics"
                  error={errors.organization?.message}
                  {...register('organization')}
                />

                <div className="space-y-1.5">
                  <label className="block text-[13px] font-semibold text-[#142B45]">
                    Inquiry Type <span className="text-[#D94A4A]">*</span>
                  </label>
                  <select
                    className="w-full h-10 px-3.5 rounded-lg border border-[#E5EAF0] bg-white text-[13px] text-[#142B45] outline-none focus:border-[#3976A8] transition-colors"
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
                <label className="block text-[13px] font-semibold text-[#142B45]">
                  Message <span className="text-[#D94A4A]">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your operational requirements, fleet size, or questions..."
                  className="w-full p-3.5 rounded-lg border border-[#E5EAF0] bg-white text-[13px] text-[#142B45] placeholder-[#94A3B8] outline-none focus:border-[#3976A8] transition-colors"
                  {...register('message')}
                />
                {errors.message && (
                  <p className="text-[11px] font-medium text-[#D94A4A]">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#183153] hover:bg-[#224470] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Logging message...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Message to Operations Desk</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Alternative Actions: Request Access & Sign In */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left p-6 rounded-2xl bg-[#F5F7FA] border border-[#E5EAF0]">
          <div>
            <h4 className="font-bold text-[#142B45] text-base">Looking for immediate account access?</h4>
            <p className="text-xs sm:text-sm text-[#536477]">
              Submit your company credentials to join the review queue or sign in to your existing portal.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/request-access"
              className="px-5 py-2.5 bg-[#3976A8] hover:bg-[#2C5E87] text-white text-xs sm:text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
            >
              <span>Request Access</span>
              <ArrowRight size={14} />
            </Link>
            <Link
              to="/login"
              className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-[#CBD5E1] text-[#142B45] text-xs sm:text-sm font-bold rounded-xl transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
