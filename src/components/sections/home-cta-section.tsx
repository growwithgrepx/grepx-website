
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Rocket, MessageSquare } from 'lucide-react';
import AnimatedContent from '@/components/shared/animated-content';

export default function HomeCtaSection() {
  return (
    <section id="home-cta" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 text-center">
        <AnimatedContent animationType="fadeInUp">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-6 text-gradient-primary-accent">
            Ready to Innovate with GrepX?
          </h2>
          <p className="max-w-xl mx-auto text-lg text-foreground/80 mb-10">
            Let's explore how our AI solutions can revolutionize your business.
            Connect with our experts or dive deeper into our platform capabilities.
          </p>
        </AnimatedContent>
        <AnimatedContent animationType="fadeInUp" delay="300ms">
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button size="lg" className="group" asChild>
              <Link href="/platform">
                Explore Our Platform <Rocket className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Link>
            </Button>
            {/* The Contact Us button in the header already opens a modal. 
                If a different CTA is needed here, it can be added.
                For now, linking to about or a more general contact info page might be good.
                Or, we can re-use the dialog trigger logic if desired, but that makes this component less standalone.
            */}
            <Button size="lg" variant="outline" className="group" asChild>
              <Link href="/contact"> {/* Updated to /contact from /about */}
                Contact Our Experts <MessageSquare className="ml-2 h-5 w-5 group-hover:fill-accent/20 transition-colors" />
              </Link>
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
