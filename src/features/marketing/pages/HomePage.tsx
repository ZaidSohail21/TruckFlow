import { useEffect } from 'react';
import { HeroSection } from '../components/HeroSection';
import { WhatWeDoSection } from '../components/WhatWeDoSection';
import { PlatformSection } from '../components/PlatformSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { SolutionsSection } from '../components/SolutionsSection';
import { AboutSection } from '../components/AboutSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { ContactSection } from '../components/ContactSection';

export function HomePage() {
  useEffect(() => {
    document.title = 'TruckFlow — Intelligent Dispatch. Smarter Fleet Operations.';

    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 100);
      }
    }
  }, []);

  return (
    <div className="flex flex-col w-full bg-white text-[#142B45] selection:bg-[#3976A8] selection:text-white">
      {/* 1. Home / Hero */}
      <HeroSection />

      {/* 2. What We Do */}
      <WhatWeDoSection />

      {/* 3. TruckFlow Platform */}
      <PlatformSection />

      {/* 4. How It Works */}
      <HowItWorksSection />

      {/* 5. Solutions by Role */}
      <SolutionsSection />

      {/* 6. About TruckFlow */}
      <AboutSection />

      {/* 7. Reviews & Operational Research */}
      <ReviewsSection />

      {/* 8. Contact Section */}
      <ContactSection />
    </div>
  );
}
