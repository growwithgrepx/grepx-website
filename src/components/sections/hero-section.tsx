
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import AnimatedContent from '@/components/shared/animated-content';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width; // Normalize x
        const y = (event.clientY - rect.top) / rect.height; // Normalize y
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundStyle = {
    '--mouse-x': `${mousePosition.x * 100}%`,
    '--mouse-y': `${mousePosition.y * 100}%`,
    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.15), hsl(var(--background)) 60%)`
  } as React.CSSProperties;
  

  return (
    <section 
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-20 md:py-32"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/5 rounded-full animate-pulse opacity-50" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/5 rounded-lg animate-pulse opacity-50" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 text-center relative z-10">
        <AnimatedContent animationType="fadeInUp">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-gradient-primary-accent">GrepX: Pioneering the</span>
            <span className="block text-gradient-primary-accent">Future of AI.</span>
          </h1>
        </AnimatedContent>
        <AnimatedContent animationType="fadeInUp" delay="300ms">
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
            Effortless elegance, calm precision, and futuristic clarity. Discover how GrepX is reshaping industries with intelligent solutions.
          </p>
        </AnimatedContent>
        <AnimatedContent animationType="fadeInUp" delay="600ms">
          <div className="mt-10 flex justify-center gap-4">
            <Button size="lg" className="group" asChild>
              <Link href="/platform#platform">
                Explore Platform <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="group" asChild>
              <Link href="/experience-ai/content-safety#content-safety"> 
                Get Started <Zap className="ml-2 h-5 w-5 group-hover:fill-accent/50 transition-colors" />
              </Link>
            </Button>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
