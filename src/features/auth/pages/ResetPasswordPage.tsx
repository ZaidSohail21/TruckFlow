import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Loader2, Truck } from 'lucide-react';
import { FormPasswordInput } from '@/components/forms/FormPasswordInput';
import { resetPassword } from '@/services/authService';
import { toast } from 'sonner';

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password must be at least 8 characters.'),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);
    await resetPassword('mock-token', data.password);
    setIsLoading(false);
    setIsSuccess(true);
    toast.success('Password updated successfully.');
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

        {isSuccess ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-14 h-14 bg-[#ECFDF5] text-[#16A36A] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 size={28} />
            </div>
            <h1 className="text-xl font-bold text-[#182230] dark:text-[#e2e8f0]">
              Password updated
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#94a3b8]">
              Your password has been changed. You can now log in with your new credentials.
            </p>
            <div className="pt-4">
              <button
                onClick={() => navigate('/login')}
                className="w-full h-11 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg font-semibold text-sm transition-colors cursor-pointer"
              >
                Continue to sign in
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h1 className="text-xl font-bold text-[#182230] dark:text-[#e2e8f0]">
                Set a new password
              </h1>
              <p className="text-sm text-[#64748B] dark:text-[#94a3b8] mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormPasswordInput
                label="New Password"
                placeholder="••••••••"
                error={errors.password?.message}
                required
                {...register('password')}
              />

              <FormPasswordInput
                label="Confirm Password"
                placeholder="••••••••"
                error={errors.confirmPassword?.message}
                required
                {...register('confirmPassword')}
              />

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-11 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Updating password...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-sm text-[#64748B] dark:text-[#94a3b8] hover:text-[#182230] dark:hover:text-[#e2e8f0]"
              >
                Cancel and back to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
