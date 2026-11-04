import { Truck, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

const CURRENT_YEAR = new Date().getFullYear();

export function MarketingFooter() {
  const handlePlaceholder = (title: string) => {
    toast.info(`${title} document is currently in review for upcoming operational deployment.`);
  };

  const scrollToAnchor = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#F5F7FA] text-[#536477] border-t border-[#E5EAF0] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#E5EAF0]">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#183153] rounded-xl flex items-center justify-center shadow-xs">
                <Truck size={22} className="text-white" />
              </div>
              <span className="font-extrabold text-2xl text-[#142B45] tracking-tight">
                TruckFlow
              </span>
            </div>

            <p className="text-[15px] text-[#536477] max-w-sm leading-relaxed">
              Intelligent truck dispatching and fleet management software connecting dispatchers,
              carriers, drivers, and shippers through structured, supervised operational workflows.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white border border-[#E5EAF0] text-xs font-semibold text-[#183153] shadow-2xs">
              <ShieldCheck size={15} className="text-[#16A36A]" />
              <span>Supervised Agentic Logistics Architecture</span>
            </div>
          </div>

          {/* Quick Navigation Anchors */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#142B45]">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToAnchor('home')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('what-we-do')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  What We Do
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('platform')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Platform
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('how-it-works')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('solutions')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('about')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('contact')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Operations & Tracking */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#142B45]">
              Operations
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => scrollToAnchor('solutions')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Dispatcher Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('solutions')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Fleet Roster & Assets
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToAnchor('solutions')}
                  className="hover:text-[#3976A8] transition-colors cursor-pointer text-left"
                >
                  Driver Mobile UI
                </button>
              </li>
              <li>
                <Link
                  to="/track"
                  className="hover:text-[#3976A8] transition-colors flex items-center gap-1 font-semibold text-[#3976A8]"
                >
                  <span>Public Shipment Tracking</span>
                  <ArrowUpRight size={13} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Access & Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#142B45]">
              Access & Terms
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/request-access"
                  className="text-[#3976A8] font-bold hover:underline"
                >
                  Request Platform Access →
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-[#142B45] transition-colors">
                  Sign In to Workspace
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePlaceholder('Privacy Policy')}
                  className="hover:text-[#142B45] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handlePlaceholder('Terms of Service')}
                  className="hover:text-[#142B45] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7E8F9E]">
          <div>
            © {CURRENT_YEAR} TruckFlow Logistics Software. All rights reserved.
          </div>
          <div>
            Enterprise fleet dispatching and cargo transportation platform.
          </div>
        </div>
      </div>
    </footer>
  );
}
