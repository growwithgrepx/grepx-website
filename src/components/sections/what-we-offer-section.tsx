
"use client";

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, Lightbulb, Brain, ArrowRight } from "lucide-react";
import AnimatedContent from "@/components/shared/animated-content";

const offerings = [
  {
    icon: Layers,
    title: "Domain-Agnostic AI Platform",
    description: "Flexible and powerful AI core adaptable to any industry specific needs. Our platform is engineered for versatility, enabling rapid development and deployment of custom AI solutions.",
    linkText: "Learn More",
    linkHref: "/platform"
  },
  {
    icon: Lightbulb,
    title: "Strategic AI Consulting",
    description: "Expert guidance to integrate AI seamlessly into your business strategy for maximum impact. We partner with you to identify high-value AI opportunities and craft tailored implementation roadmaps.",
    linkText: "Our Approach",
    linkHref: "/about"
  },
  {
    icon: Brain,
    title: "Custom AI Solutions",
    description: "Tailor-made AI applications designed to solve your unique business challenges effectively. From advanced analytics to intelligent automation, we build solutions that deliver measurable results.",
    linkText: "View Use Cases",
    linkHref: "/experience-ai/document-analyzer"
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
                  <div className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                    <offer.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
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
