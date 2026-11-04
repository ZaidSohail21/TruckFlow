import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Loader2, Truck, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { FormInput } from '@/components/forms/FormInput';
import { FormPasswordInput } from '@/components/forms/FormPasswordInput';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';
import { toast } from 'sonner';

const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

const QUICK_ROLES = [
  { role: 'Dispatcher', email: 'dispatcher@truckflow.com', tag: 'Primary Demo' },
  { role: 'Fleet Manager', email: 'fleet@truckflow.com', tag: 'Fleet Ops' },
  { role: 'Driver', email: 'driver@truckflow.com', tag: 'Mobile UI' },
  { role: 'Customer', email: 'customer@truckflow.com', tag: 'Tracking' },
  { role: 'Administrator', email: 'admin@truckflow.com', tag: 'System' },
];

export function LoginPage() {
  const navigate = useNavigate();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [selectedRole, setSelectedRole] = useState('dispatcher@truckflow.com');

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'dispatcher@truckflow.com',
      password: 'demo1234',
      rememberMe: true,
    },
  });

  const handleQuickSelect = (email: string) => {
    setSelectedRole(email);
    setValue('email', email);
    setValue('password', 'demo1234');
    clearError();
  };

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    const success = await login({
      email: data.email,
      password: data.password,
      rememberMe: data.rememberMe,
    });

    if (success) {
      const user = useAuthStore.getState().user;
      if (user) {
        toast.success(`Welcome back, ${user.name}!`);
        navigate(ROLE_DEFAULT_PATHS[user.role]);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#F5F7FA] dark:bg-[#0f1620]">
      {/* Brand Side Panel */}
      <div className="w-full md:w-1/2 lg:w-5/12 bg-[#183153] p-8 md:p-12 flex flex-col justify-between text-white relative overflow-hidden">
        {/* Subtle geometric background texture */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
          </svg>
        </div>

        {/* Top: Logo & Mark */}
        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3976A8] rounded-xl flex items-center justify-center shadow-md">
              <Truck size={22} className="text-white" />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight leading-none block">TruckFlow</span>
              <span className="text-[#8BAFD4] text-xs font-medium">Logistics Intelligence</span>
            </div>
          </div>
        </div>

        {/* Middle: Brand Message */}
        <div className="my-10 relative z-10 space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#8BAFD4] border border-white/10">
            <ShieldCheck size={14} className="text-[#16A36A]" />
            Enterprise Logistics Platform
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
            Intelligent Dispatch. Smarter Fleet Operations.
          </h2>

          <p className="text-[#A8C4DC] text-sm leading-relaxed">
            TruckFlow streamlines load matching, driver workflows, and customer communication with task-focused AI agents operating under dispatch supervision.
          </p>

          <div className="space-y-2.5 pt-2">
            {[
              'Autonomous load-to-truck recommendations',
              'Driver dispatch and status collection',
              'Self-service customer shipment tracking',
              'Role-governed security & audit logs',
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2.5 text-xs text-[#E2EAFD]">
                <CheckCircle2 size={15} className="text-[#3976A8] flex-shrink-0" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Note */}
        <div className="relative z-10 pt-4 border-t border-white/10 text-xs text-[#8BAFD4]">
          TruckFlow Enterprise v1.0 • Phase 1 Architecture
        </div>
      </div>

      {/* Login Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 lg:p-16">
        <div className="w-full max-w-md space-y-6">
          <div>
            <h1 className="text-2xl font-bold text-[#182230] dark:text-[#e2e8f0]">
              Sign in to your account
            </h1>
            <p className="text-sm text-[#64748B] dark:text-[#94a3b8] mt-1">
              Select a demo role or enter your credentials to access the workspace.
            </p>
          </div>

          {/* Quick Demo Role Selector */}
          <div className="p-3 bg-white dark:bg-[#1a2332] rounded-xl border border-[#E2E8F0] dark:border-[#2d3f55] shadow-xs">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-[#64748B] dark:text-[#94a3b8] block mb-2">
              Select Demo Role (Phase 1)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
              {QUICK_ROLES.map(item => (
                <button
                  key={item.email}
                  type="button"
                  onClick={() => handleQuickSelect(item.email)}
                  className={`px-2.5 py-1.5 rounded-lg text-left text-xs font-medium border transition-colors cursor-pointer ${
                    selectedRole === item.email
                      ? 'bg-[#EFF6FF] border-[#3976A8] text-[#1E40AF] dark:bg-[#1e2d44] dark:border-[#3976A8] dark:text-[#93c5fd]'
                      : 'border-[#E2E8F0] dark:border-[#2d3f55] text-[#182230] dark:text-[#e2e8f0] hover:bg-[#F8FAFC] dark:hover:bg-[#243447]'
                  }`}
                >
                  <div className="font-semibold truncate">{item.role}</div>
                  <div className="text-[10px] text-[#64748B] dark:text-[#94a3b8]">{item.tag}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <div className="p-3 bg-[#FEF2F2] border border-[#FECACA] rounded-lg text-xs font-medium text-[#991B1B]">
                {error}
              </div>
            )}

            <FormInput
              label="Email Address"
              type="email"
              placeholder="name@company.com"
              error={errors.email?.message}
              required
              {...register('email')}
            />

            <FormPasswordInput
              label="Password"
              placeholder="••••••••"
              error={errors.password?.message}
              required
              {...register('password')}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[#182230] dark:text-[#e2e8f0]">
                <input
                  type="checkbox"
                  className="rounded border-[#CBD5E1] text-[#3976A8] focus:ring-[#3976A8]"
                  {...register('rememberMe')}
                />
                Remember me
              </label>

              <Link
                to="/forgot-password"
                className="text-[#3976A8] hover:underline font-medium"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-[#183153] hover:bg-[#1e3d66] text-white rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 cursor-pointer shadow-sm"
            >
              {isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In to Workspace
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

          {/* Customer Self-Service Tracking Link */}
          <div className="pt-2 border-t border-[#E2E8F0] dark:border-[#2d3f55] text-center text-xs text-[#64748B] dark:text-[#94a3b8]">
            Customer tracking a shipment?{' '}
            <Link to="/track" className="text-[#3976A8] font-semibold hover:underline">
              Track without logging in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
