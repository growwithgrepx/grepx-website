
import PlatformPillarsSection from '@/components/sections/platform-pillars-section';
import { Separator } from '@/components/ui/separator';
import AnimatedContent from '@/components/shared/animated-content';

export default function PlatformPage() {
  return (
    <div className="py-8">
      <AnimatedContent animationType="fadeInUp">
        <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gradient-primary-accent">
              Our Intelligent Platform
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
              Discover the core components that power GrepX's innovative AI solutions, designed for scalability, flexibility, and seamless integration.
            </p>
        </section>
      </AnimatedContent>
      <PlatformPillarsSection />
      <div className="container mx-auto px-4">
        <Separator className="my-12 md:my-16" />
      </div>
      <AnimatedContent animationType="fadeInUp" delay="300ms">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Dive Deeper into Our Technology</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Explore technical documentation, case studies, and integration guides to fully leverage the GrepX platform.
          </p>
        </section>
      </AnimatedContent>
    </div>
  );
}
