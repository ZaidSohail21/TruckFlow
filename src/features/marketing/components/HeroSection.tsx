import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ShieldCheck, CheckCircle2, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import heroFleetImage from '@/assets/her.avif';

// High-resolution commercial fleet photography (restored previous pic)
const HERO_FLEET_IMAGE = heroFleetImage;

export function HeroSection() {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: 0.1,
      },
    },
  };
// scsaxc
  const itemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden text-white isolate bg-[#142B45]"
    >
      {/* Full-bleed Daytime Commercial Fleet Background Image */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
        <img
          src={HERO_FLEET_IMAGE}
          alt="Commercial semi-truck convoy traveling at sunset"
          className="w-full h-full object-cover object-center"
          loading="eager"
        />
        {/* Subtle cinematic gradient overlay to ensure crisp white text contrast without losing ambiance */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/65" />
      </div>

      {/* Main Sky Area: Centered Bold Typography matching JUNA */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 text-center pt-32 sm:pt-36 pb-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl space-y-6"
        >
          {/* Eyebrow Pill */}
          <motion.div variants={itemVariants} className="inline-flex items-center justify-center">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-white/15 backdrop-blur-md text-white border border-white/25 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#16A36A] animate-pulse" />
              INTELLIGENT LOGISTICS TECHNOLOGY
            </span>
          </motion.div>

          {/* Bold Dominant Headline (Large like About) */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-extrabold tracking-tight text-white leading-[1.10] drop-shadow-md"
          >
            Driving the transition to <br className="hidden sm:inline" />
            autonomous road logistics
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-xs"
          >
            Intelligent dispatch orchestration, autonomous driver coordination, and
            human-supervised fleet operations for modern road freight.
          </motion.p>

          {/* Action Pills */}
          <motion.div
            variants={itemVariants}
            className="pt-2 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              to="/request-access"
              className="px-8 py-4 bg-white text-[#142B45] hover:bg-slate-100 text-base font-bold rounded-full shadow-xl transition-all duration-150 transform hover:scale-[1.02] active:scale-98"
            >
              Request Access
            </Link>

            <button
              onClick={() => scrollToSection('what-we-do')}
              className="px-8 py-4 bg-white/20 hover:bg-white/30 border border-white/40 text-white text-base font-semibold rounded-full backdrop-blur-md transition-all duration-150 flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Platform</span>
              <ArrowRight size={17} />
            </button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm font-semibold text-white/80"
          >
            <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#16A36A]" />
              <span>Supervised AI Safety Guardrails</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-[#38BDF8]" />
              <span>Real-Time Fleet & Dispatch Board</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Floating Telemetry & Scroll Cue Bar */}
      <div className="relative z-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/60 shadow-xl flex flex-wrap items-center justify-between gap-4 text-[#142B45]"
        >
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16A36A] animate-ping" />
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#183153] block">
                Commercial Fleet Operations
              </span>
              <span className="text-[11px] text-[#536477]">
                Live Dispatch & Route Telemetry Stream
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs font-semibold text-[#536477]">
            <span className="flex items-center gap-1.5 text-[#142B45] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#3976A8]" />
              128 Active Loads
            </span>
            <span className="hidden sm:inline text-[#CBD5E1]">•</span>
            <span className="flex items-center gap-1.5 text-[#142B45] font-bold">
              <span className="w-2 h-2 rounded-full bg-[#16A36A]" />
              42 Units En Route
            </span>
            <span className="hidden sm:inline text-[#CBD5E1]">•</span>
            <span className="text-[#16A36A] font-bold">99.4% On-Time Protocol</span>
          </div>

          <button
            onClick={() => scrollToSection('what-we-do')}
            className="flex items-center gap-1 text-xs font-bold text-[#3976A8] hover:text-[#183153] transition-colors cursor-pointer"
          >
            <span>Learn More</span>
            <ChevronDown size={14} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
