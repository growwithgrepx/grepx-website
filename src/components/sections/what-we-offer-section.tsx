
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/shared/animated-content";
import { cn } from '@/lib/utils';
import React from 'react';

// --- Animated SVG Icon Components ---

const AnimatedDomainPlatformIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-primary animate-reveal-layers-icon" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Domain-Agnostic AI Platform Icon">
    {/* Reveal animation: layers-pop-in-reveal 0.6s ease-out 0.3s forwards (total 0.9s) */}
    <g>
      <rect x="8" y="14" width="32" height="6" rx="2" fill="hsl(var(--primary))" style={{ animation: 'domain-layer-breathe 3s ease-in-out infinite 1.0s' }} />
      <rect x="8" y="22" width="32" height="6" rx="2" fill="hsl(var(--primary))" style={{ animation: 'domain-layer-breathe 3s ease-in-out infinite 1.2s' }} />
      <rect x="8" y="30" width="32" height="6" rx="2" fill="hsl(var(--primary))" style={{ animation: 'domain-layer-breathe 3s ease-in-out infinite 1.4s' }} />
    </g>
  </svg>
);

const AnimatedStrategicConsultingIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-primary animate-reveal-lightbulb-icon" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Strategic AI Consulting Icon">
    {/* Reveal animation: lightbulb-glow-in-reveal 0.7s ease-out 0.4s forwards (total 1.1s) */}
    <g>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <line
          key={angle}
          x1="24" y1="24"
          x2={24 + 12 * Math.cos(angle * Math.PI / 180)}
          y2={24 + 12 * Math.sin(angle * Math.PI / 180)}
          stroke="hsl(var(--accent))" strokeWidth="1.5" strokeLinecap="round"
          style={{ animation: `strategic-light-ray-animate 2.5s ease-out infinite ${1.2 + i * 0.15}s`, transformOrigin: '24px 24px' }}
        />
      ))}
      <path d="M24 35C19.5817 35 16 31.4183 16 27C16 22.5817 19.5817 19 24 19C28.4183 19 32 22.5817 32 27C32 31.4183 28.4183 35 24 35Z" stroke="hsl(var(--primary))" strokeWidth="2"/>
      <rect x="20" y="34" width="8" height="3" rx="1" fill="hsl(var(--primary))"/>
      <circle cx="24" cy="27" r="4" fill="hsl(var(--primary))" style={{ animation: 'strategic-lightbulb-pulse 2s ease-in-out infinite 1.2s' }}/>
    </g>
  </svg>
);

const AnimatedCustomSolutionsIcon = () => (
  <svg viewBox="0 0 48 48" className="h-10 w-10 text-primary animate-reveal-brain-icon" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Custom AI Solutions Icon">
    {/* Reveal animation: brain-fade-in-reveal 0.5s ease-out 0.5s forwards (total 1.0s) */}
    <g>
      <circle cx="16" cy="16" r="3" fill="hsl(var(--primary))" style={{ animation: 'custom-solution-node-appear 0.5s ease-out forwards 1.3s, custom-solution-node-pulse 2s ease-in-out infinite 2.0s' }}/>
      <circle cx="32" cy="16" r="3" fill="hsl(var(--primary))" style={{ animation: 'custom-solution-node-appear 0.5s ease-out forwards 1.45s, custom-solution-node-pulse 2s ease-in-out infinite 2.2s' }}/>
      <circle cx="16" cy="32" r="3" fill="hsl(var(--primary))" style={{ animation: 'custom-solution-node-appear 0.5s ease-out forwards 1.6s, custom-solution-node-pulse 2s ease-in-out infinite 2.4s' }}/>
      <circle cx="32" cy="32" r="3" fill="hsl(var(--primary))" style={{ animation: 'custom-solution-node-appear 0.5s ease-out forwards 1.75s, custom-solution-node-pulse 2s ease-in-out infinite 2.6s' }}/>
      <circle cx="24" cy="24" r="2.5" fill="hsl(var(--accent))" style={{ animation: 'custom-solution-node-appear 0.5s ease-out forwards 1.9s, custom-solution-node-pulse 2s ease-in-out infinite 2.8s' }}/>
      <line x1="16" y1="16" x2="24" y2="24" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="50" style={{ animation: 'custom-solution-line-draw 1s ease-out forwards 2.0s' }}/>
      <line x1="32" y1="16" x2="24" y2="24" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="50" style={{ animation: 'custom-solution-line-draw 1s ease-out forwards 2.2s' }}/>
      <line x1="16" y1="32" x2="24" y2="24" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="50" style={{ animation: 'custom-solution-line-draw 1s ease-out forwards 2.4s' }}/>
      <line x1="32" y1="32" x2="24" y2="24" stroke="hsl(var(--accent))" strokeWidth="1.5" strokeDasharray="50" style={{ animation: 'custom-solution-line-draw 1s ease-out forwards 2.6s' }}/>
    </g>
  </svg>
);


const offerings = [
  {
    animatedIcon: AnimatedDomainPlatformIcon,
    title: "Domain-Agnostic AI Platform",
    description: "Flexible and powerful AI core adaptable to any industry specific needs. Our platform is engineered for versatility, enabling rapid development and deployment of custom AI solutions.",
    linkText: "Learn More",
    linkHref: "/platform",
    iconHoverClass: "hover-animate-layers-pulse"
  },
  {
    animatedIcon: AnimatedStrategicConsultingIcon,
    title: "Strategic AI Consulting",
    description: "Expert guidance to integrate AI seamlessly into your business strategy for maximum impact. We partner with you to identify high-value AI opportunities and craft tailored implementation roadmaps.",
    linkText: "Our Approach",
    linkHref: "/about",
    iconHoverClass: "hover-filter-lightbulb-glow"
  },
  {
    animatedIcon: AnimatedCustomSolutionsIcon,
    title: "Custom AI Solutions",
    description: "Tailor-made AI applications designed to solve your unique business challenges effectively. From advanced analytics to intelligent automation, we build solutions that deliver measurable results.",
    linkText: "View Use Cases",
    linkHref: "/experience-ai/document-analyzer",
    iconHoverClass: "hover-transform-brain-scale"
  }
];

export default function WhatWeOfferSection() {
  return (
    <section id="what-we-offer" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-4">
        <AnimatedContent animationType="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-gradient-primary-accent">
            Transform Your Business with GrepX
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-foreground/90 font-semibold">
            Our Core Offerings
          </p>
        </AnimatedContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {offerings.map((offer, index) => (
            <AnimatedContent
              key={offer.title}
              animationType="fadeInUp"
              delay={`${200 + index * 150}ms`}
            >
              <Card className="h-full transform transition-all duration-300 ease-in-out hover:shadow-xl hover:border-primary/50 group flex flex-col text-left">
                <CardHeader className="items-center text-center">
                  <div className={cn("p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300", offer.iconHoverClass)}>
                    {/* The animatedIcon component now has its own reveal animation class */}
                    <offer.animatedIcon />
                  </div>
                  <CardTitle className="text-xl lg:text-2xl font-semibold group-hover:text-primary transition-colors">{offer.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-foreground/70 text-sm md:text-base mb-6">{offer.description}</p>
                  <Link
                    href={offer.linkHref}
                    className="text-sm font-medium text-primary hover:text-accent hover:underline transition-colors self-start group/link"
                  >
                    {offer.linkText} <ArrowRight className="inline-block ml-1 h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}

