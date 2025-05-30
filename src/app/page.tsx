
import HeroSection from '@/components/sections/hero-section';
import WhatWeOfferSection from '@/components/sections/what-we-offer-section';
import FeaturedAiToolsSection from '@/components/sections/featured-ai-tools-section';
import HomeCtaSection from '@/components/sections/home-cta-section';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    // Each section might need its own bg-background if the main content area is transparent
    // HeroSection is already designed to be transparent to show its own effects or global background
    <div className="flex flex-col space-y-16 md:space-y-24">
      <HeroSection />
      {/* These sections will need bg-background if they are not cards themselves */}
      <div className="bg-background py-2"><Separator /></div>
      <WhatWeOfferSection className="bg-background rounded-lg shadow-sm py-12 md:py-16"/>
      <div className="bg-background py-2"><Separator /></div>
      <FeaturedAiToolsSection className="bg-slate-50 dark:bg-slate-900/50 rounded-lg shadow-sm py-12 md:py-16" /> {/* This section already has a specific bg */}
      <div className="bg-background py-2"><Separator /></div>
      <HomeCtaSection className="bg-background rounded-lg shadow-sm py-16 md:py-24"/>
    </div>
  );
}

    