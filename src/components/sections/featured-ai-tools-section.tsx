
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ScanText, FileText, Eye } from "lucide-react";
import AnimatedContent from "@/components/shared/animated-content";

const featuredTools = [
  {
    icon: ScanText,
    title: "Instant Content Safety Check",
    description: "Ensure your communications are responsible and bias-free. Analyze text for safety concerns in seconds.",
    link: "/experience-ai/content-safety",
    cta: "Analyze Content",
    imageSrc: "https://placehold.co/600x400.png",
    imageAlt: "Abstract representation of text analysis for safety",
    aiHint: "content safety abstract"
  },
  {
    icon: FileText,
    title: "Unlock Document Insights",
    description: "Transform your documents into actionable intelligence. Extract key data, summaries, and insights automatically.",
    link: "/experience-ai/document-analyzer",
    cta: "Analyze Documents",
    imageSrc: "https://placehold.co/600x400.png",
    imageAlt: "Abstract representation of document processing",
    aiHint: "document analysis abstract"
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
                <div className="relative w-full h-48 md:h-56">
                  <Image
                    src={tool.imageSrc}
                    alt={tool.imageAlt}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint={tool.aiHint}
                  />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
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
