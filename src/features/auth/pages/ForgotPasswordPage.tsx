import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';
import { ArrowLeft, MailCheck, Loader2, Truck } from 'lucide-react';
import { FormInput } from '@/components/forms/FormInput';
import { requestPasswordReset } from '@/services/authService';

const forgotPasswordSchema = z.object({
  email: z.string().email('Please enter a valid work email address.'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    await requestPasswordReset(data.email);
    setIsLoading(false);
    setSubmittedEmail(data.email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#F5F7FA] dark:bg-[#0f1620]">
      <div className="w-full max-w-md bg-white dark:bg-[#1a2332] rounded-2xl border border-[#E2E8F0] dark:border-[#2d3f55] p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-8 h-8 bg-[#3976A8] rounded-lg flex items-center justify-center">
            <Truck size={18} className="text-white" />
          </div>
          <span className="font-bold text-lg text-[#182230] dark:text-[#e2e8f0]">TruckFlow</span>
        </div>

        {isSubmitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-[#ECFDF5] text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
              <MailCheck size={28} />
            </div>
            <h1 className="text-xl font-bold text-[#182230] dark:text-[#e2e8f0]">
              Check your email
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#94a3b8] leading-relaxed">
              If an account is associated with <span className="font-semibold text-[#182230] dark:text-[#e2e8f0]">{submittedEmail}</span>, we have sent instructions to reset your password.
            </p>
            <div className="pt-4">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-[#3976A8] font-medium hover:underline"
              >
                <ArrowLeft size={16} />
                Return to sign in
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#182230] dark:text-[#e2e8f0]">
                Reset your password
              </h1>
              <p className="text-sm text-[#64748B] dark:text-[#94a3b8] mt-1">
                Enter your registered work email and we'll send you a password reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormInput
                label="Email Address"
                type="email"
                placeholder="name@company.com"
                error={errors.email?.message}
                required
                {...register('email')}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Sending link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 text-sm text-[#64748B] dark:text-[#94a3b8] hover:text-[#182230] dark:hover:text-[#e2e8f0]"
              >
                <ArrowLeft size={14} />
                Back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
