
import HeroSection from '@/components/sections/hero-section';
import WhatWeOfferSection from '@/components/sections/what-we-offer-section';
import FeaturedAiToolsSection from '@/components/sections/featured-ai-tools-section';
import HomeCtaSection from '@/components/sections/home-cta-section';
import { Separator } from '@/components/ui/separator';

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-16 md:space-y-24">
      <HeroSection />
      <Separator />
      <WhatWeOfferSection />
      <Separator />
      <FeaturedAiToolsSection />
      <Separator />
      <HomeCtaSection />
    </div>
  );
}
