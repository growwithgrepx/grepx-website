
"use client";

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ScanText, FileText, Eye } from "lucide-react";
import AnimatedContent from "@/components/shared/animated-content";
import React from 'react';

const ContentSafetyVisual = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full opacity-80 group-hover:opacity-100 transition-opacity duration-300" aria-label="Animated SVG for Content Safety Check: A document being scanned with highlighted lines." role="img">
    <defs>
      <clipPath id="docClip">
        <rect x="15" y="10" width="70" height="60" rx="3" />
      </clipPath>
    </defs>
    {/* Document Outline */}
    <rect x="15" y="10" width="70" height="60" rx="3" fill="hsl(var(--card) / 0.7)" stroke="hsl(var(--border))" strokeWidth="1.5" />
    {/* Text Lines */}
    {[20, 28, 36, 44, 52, 60].map(y => (
      <rect key={y} x="25" y={y} width="50" height="3" fill="hsl(var(--muted-foreground) / 0.3)" rx="1" />
    ))}
    {/* Scanner Line */}
    <g clipPath="url(#docClip)">
      <rect
        x="15" y="10" width="70" height="4" /* Thicker for visibility */
        fill="hsl(var(--primary) / 0.5)"
        style={{ animation: 'scanner-line-move 3s ease-in-out infinite 0.5s' }} /* Added slight delay */
      />
    </g>
    {/* Highlights - appear as scanner passes */}
    <rect x="25" y="28" width="30" height="3" fill="hsl(var(--accent) / 0.8)" rx="1" style={{ animation: 'text-highlight-appear 3s ease-in-out infinite 1s', transformOrigin: 'left center' }}/>
    <rect x="25" y="44" width="40" height="3" fill="hsl(var(--primary) / 0.6)" rx="1" style={{ animation: 'text-highlight-appear 3s ease-in-out infinite 1.5s', transformOrigin: 'left center' }}/>
  </svg>
);

const DocumentInsightsVisual = () => (
  <svg viewBox="0 0 100 80" className="w-full h-full opacity-80 transition-opacity duration-300" aria-label="Animated SVG for Document Insights: A locked document icon transforms into a data chart." role="img">
    {/* Document Base */}
    <rect x="20" y="15" width="60" height="50" rx="3" fill="hsl(var(--card) / 0.7)" stroke="hsl(var(--border))" strokeWidth="1.5" />
    <path d="M30 25 h40 M30 32 h40 M30 39 h30 M30 46 h20" stroke="hsl(var(--muted-foreground) / 0.3)" strokeWidth="1.5" />
    
    {/* Animated Lock (disappears) and Bars (appear) */}
    <g className="document-lock-group"> {/* Added a class for potential direct animation targeting */}
      <rect id="lock-body" x="42" y="2" width="16" height="12" rx="2" fill="hsl(var(--primary))" style={{ animation: 'lock-body-disappear 0.8s ease-out forwards 0.5s' }} />
      <path id="lock-shackle" d="M45 7 V4 C45 1, 47 0, 50 0 S55 1, 55 4 V7" stroke="hsl(var(--primary))" strokeWidth="2.5" fill="none" style={{ animation: 'lock-shackle-open 1s ease-out forwards 0.3s' }} />
    </g>

    {/* Data Bars (appear after lock animation) */}
    <g className="document-bars-group" style={{ animation: 'fade-in-opacity 0.5s ease-out forwards 1.3s' }}>
      <rect x="30" y="45" width="8" height="15" fill="hsl(var(--accent))" style={{ animation: 'insight-bar-grow 0.5s ease-out forwards 1.5s', transformOrigin: 'bottom' }} />
      <rect x="42" y="38" width="8" height="22" fill="hsl(var(--primary))" style={{ animation: 'insight-bar-grow 0.5s ease-out forwards 1.7s', transformOrigin: 'bottom' }} />
      <rect x="54" y="50" width="8" height="10" fill="hsl(var(--accent)/0.7)" style={{ animation: 'insight-bar-grow 0.5s ease-out forwards 1.9s', transformOrigin: 'bottom' }} />
      <rect x="66" y="42" width="8" height="18" fill="hsl(var(--primary)/0.7)" style={{ animation: 'insight-bar-grow 0.5s ease-out forwards 2.1s', transformOrigin: 'bottom' }} />
    </g>
  </svg>
);


const featuredTools = [
  {
    icon: ScanText,
    title: "Instant Content Safety Check",
    description: "Ensure your communications are responsible and bias-free. Analyze text for safety concerns in seconds.",
    link: "/experience-ai/content-safety",
    cta: "Analyze Content",
    animatedVisual: ContentSafetyVisual,
    ariaLabelSlot: "Animated visual for Content Safety Check"
  },
  {
    icon: FileText,
    title: "Unlock Document Insights",
    description: "Transform your documents into actionable intelligence. Extract key data, summaries, and insights automatically.",
    link: "/experience-ai/document-analyzer",
    cta: "Analyze Documents",
    animatedVisual: DocumentInsightsVisual,
    ariaLabelSlot: "Animated visual for Document Insights"
  },
];

export default function FeaturedAiToolsSection() {
  return (
    <section id="featured-tools" className="py-12 md:py-16 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        <AnimatedContent animationType="fadeInUp" className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4 text-gradient-primary-accent">
            Experience Our AI
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-foreground/80">
            Experience firsthand how GrepX's AI tools can solve real-world problems and create value.
          </p>
        </AnimatedContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredTools.map((tool, index) => (
            <AnimatedContent
              key={tool.title}
              animationType={index % 2 === 0 ? "fadeInLeft" : "fadeInUp"}
              delay={`${200 + index * 100}ms`}
            >
              <Card className="overflow-hidden h-full flex flex-col group hover:shadow-2xl transition-shadow duration-300">
                <div className="relative w-full h-48 md:h-56 bg-card flex items-center justify-center p-4 overflow-hidden" aria-label={tool.ariaLabelSlot}>
                  <tool.animatedVisual />
                </div>
                <CardHeader className="pb-3 text-left">
                  <div className="flex items-center mb-2">
                     <tool.icon className="h-7 w-7 text-primary mr-3 shrink-0" />
                     <CardTitle className="text-xl lg:text-2xl font-semibold">{tool.title}</CardTitle>
                  </div>
                  <CardDescription className="text-sm text-foreground/70 h-12">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-4">
                  <Button asChild className="w-full group/button">
                    <Link href={tool.link}>
                      {tool.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </AnimatedContent>
          ))}
        </div>
         <AnimatedContent animationType="fadeInUp" delay="500ms" className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/experience-ai/content-safety">
              Explore All AI Tools <Eye className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </AnimatedContent>
      </div>
    </section>
  );
}

