import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Truck, Menu, X, ArrowRight, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ROLE_DEFAULT_PATHS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface NavAnchor {
  id: string;
  label: string;
}

const NAV_ITEMS: NavAnchor[] = [
  { id: 'home', label: 'Home' },
  { id: 'what-we-do', label: 'What We Do' },
  { id: 'how-it-works', label: 'Work' },
  { id: 'about', label: 'About' },
];

export function MarketingNavbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  const isTransparent = !isScrolled && location.pathname === '/';

  // Listen to scroll position for dynamic header styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll spy: observe which section is currently in view
  useEffect(() => {
    if (location.pathname !== '/') return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0.1,
      }
    );

    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const handleDashboardRedirect = () => {
    if (user) {
      navigate(ROLE_DEFAULT_PATHS[user.role]);
    } else {
      navigate('/login');
    }
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isTransparent
          ? 'bg-gradient-to-b from-black/60 via-black/25 to-transparent border-transparent'
          : 'bg-white/95 backdrop-blur-md border-b border-[#E5EAF0] shadow-2xs'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Wordmark */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-3 group cursor-pointer text-left"
        >
          <div
            className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-105',
              isTransparent
                ? 'bg-white/20 backdrop-blur-md border border-white/35 text-white'
                : 'bg-[#183153] text-white shadow-xs'
            )}
          >
            <Truck size={22} className="text-white" />
          </div>
          <div>
            <span
              className={cn(
                'font-extrabold text-xl tracking-tight leading-none block transition-colors',
                isTransparent ? 'text-white drop-shadow-sm' : 'text-[#142B45]'
              )}
            >
              TruckFlow
            </span>
            <span
              className={cn(
                'text-[10px] font-bold uppercase tracking-wider block mt-0.5 transition-colors',
                isTransparent ? 'text-white/80' : 'text-[#3976A8]'
              )}
            >
              Fleet Operations
            </span>
          </div>
        </button>

        {/* Center: Desktop Anchor Links */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {NAV_ITEMS.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'px-4 py-2 rounded-lg text-[15px] font-semibold transition-all cursor-pointer',
                  isTransparent
                    ? isActive
                      ? 'text-white font-bold bg-white/25 backdrop-blur-sm border border-white/30 shadow-xs'
                      : 'text-white/85 hover:text-white hover:bg-white/15'
                    : isActive
                      ? 'text-[#3976A8] bg-[#EFF6FF]'
                      : 'text-[#536477] hover:text-[#142B45] hover:bg-[#F5F7FA]'
                )}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right: Actions */}
        <div className="hidden sm:flex items-center gap-4">
          {isAuthenticated && user ? (
            <button
              onClick={handleDashboardRedirect}
              className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer',
                isTransparent
                  ? 'bg-white text-[#183153] hover:bg-white/90 shadow-md'
                  : 'bg-[#EFF6FF] text-[#1E40AF] border border-[#BFDBFE] hover:bg-[#DBEAFE]'
              )}
            >
              <LayoutDashboard size={15} />
              <span>Go to {user.role.replace('_', ' ')} Dashboard</span>
            </button>
          ) : (
            <Link
              to="/login"
              className={cn(
                'text-sm font-bold transition-colors px-2 py-2',
                isTransparent
                  ? 'text-white/90 hover:text-white drop-shadow-xs'
                  : 'text-[#142B45] hover:text-[#3976A8]'
              )}
            >
              Sign In
            </Link>
          )}

          <Link
            to="/request-access"
            className={cn(
              'inline-flex items-center gap-1.5 text-sm font-bold shadow-xs transition-all',
              isTransparent
                ? 'px-6 py-2.5 bg-white/20 hover:bg-white/30 border border-white/45 text-white rounded-full backdrop-blur-md shadow-sm hover:scale-[1.02]'
                : 'px-5 py-2.5 bg-[#3976A8] hover:bg-[#2c608a] text-white rounded-xl hover:shadow-sm'
            )}
          >
            <span>Request Access</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            'p-2 lg:hidden cursor-pointer transition-colors',
            isTransparent ? 'text-white' : 'text-[#142B45]'
          )}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E5EAF0] px-4 pt-3 pb-6 space-y-3 animate-in fade-in slide-in-from-top-3 duration-150">
          <div className="space-y-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  'w-full text-left px-3.5 py-3 rounded-xl text-base font-semibold transition-colors cursor-pointer',
                  activeSection === item.id
                    ? 'bg-[#EFF6FF] text-[#3976A8]'
                    : 'text-[#536477] hover:bg-[#F5F7FA] hover:text-[#142B45]'
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E5EAF0] space-y-2">
            {isAuthenticated && user ? (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleDashboardRedirect();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#EFF6FF] text-[#1E40AF] font-bold text-sm"
              >
                <LayoutDashboard size={15} />
                <span>Go to {user.role.replace('_', ' ')} Dashboard</span>
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 rounded-xl border border-[#CBD5E1] text-sm font-bold text-[#142B45]"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/request-access"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[#3976A8] text-white text-sm font-bold shadow-xs"
            >
              <span>Request Access</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
