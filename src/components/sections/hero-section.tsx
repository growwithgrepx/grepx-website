
"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import AnimatedContent from '@/components/shared/animated-content';
import { cn } from '@/lib/utils';

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
        setMousePosition({ x, y });
      } else {
        const x = event.clientX / window.innerWidth;
        const y = event.clientY / window.innerHeight;
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
    background: `radial-gradient(circle at var(--mouse-x) var(--mouse-y), hsl(var(--primary) / 0.1), transparent 60%)`,
    transition: 'background 0.2s ease-out',
  } as React.CSSProperties;

  const parallaxFactor1 = {
    transform: `translate(${ (mousePosition.x - 0.5) * -40 }px, ${ (mousePosition.y - 0.5) * -25 }px)`,
    transition: 'transform 0.2s ease-out',
  };
  const parallaxFactor2 = {
    transform: `translate(${ (mousePosition.x - 0.5) * 30 }px, ${ (mousePosition.y - 0.5) * 35 }px)`,
    transition: 'transform 0.2s ease-out',
  };
   const parallaxFactor3 = {
    transform: `translate(${ (mousePosition.x - 0.5) * -15 }px, ${ (mousePosition.y - 0.5) * 20 }px)`,
    transition: 'transform 0.2s ease-out',
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden py-20 md:py-32 bg-transparent"
      style={backgroundStyle}
    >
      <div className="absolute inset-0 pointer-events-none -z-[1]">
        <div
          className="absolute w-48 h-48 bg-primary/5 rounded-full filter blur-xl opacity-50"
          style={{
            top: '15%',
            left: '10%',
            ...parallaxFactor1,
          }}
        />
        <div
          className="absolute w-64 h-64 bg-accent/5 rounded-xl filter blur-2xl opacity-40"
          style={{
            bottom: '10%',
            right: '15%',
            ...parallaxFactor2,
          }}
        />
        <div
          className="absolute w-40 h-40 bg-primary/3 rounded-full filter blur-lg opacity-60"
          style={{
            top: '50%',
            left: '40%',
            ...parallaxFactor3,
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <AnimatedContent animationType="fadeInUp">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block"> {/* Container for first line shimmer */}
              <span className="text-shimmer">
                <span className="text-gradient-primary-accent">GrepX: Pioneering the</span>
              </span>
            </span>
            <span className="block"> {/* Container for second line shimmer */}
              <span className="text-shimmer">
                <span className="text-gradient-primary-accent">Future of AI.</span>
              </span>
            </span>
          </h1>
        </AnimatedContent>
        <AnimatedContent animationType="fadeInUp" delay="300ms">
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/90 sm:text-xl md:text-2xl">
            <span className="text-shimmer"> {/* Wrapper for shimmer on subtext */}
              Effortless elegance, calm precision, and futuristic clarity. Discover how GrepX is reshaping industries with intelligent solutions.
            </span>
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

    