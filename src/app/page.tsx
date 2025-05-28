
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { AiUseCaseSparker } from '@/components/ai/AiUseCaseSparker';
import { QuickReplyAssistant } from '@/components/ai/QuickReplyAssistant';
import { MarketingSnippetGenerator } from '@/components/ai/MarketingSnippetGenerator';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Lightbulb, BrainCircuit, MessageCircleReply, Megaphone } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  return (
    <div className="space-y-12">
      <SectionWrapper className="text-center pt-8 md:pt-12 lg:pt-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
          GrepX: AI-First, <span className="text-primary">Domain-Agnostic</span> Innovation
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
          We empower businesses across industries with cutting-edge, adaptable AI solutions, driving strategic advantage and transformative outcomes.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-transform hover:scale-105">
            <Link href="/contact">Request Demo <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="shadow-lg transition-transform hover:scale-105">
            <Link href="/platform">Explore Our Platform</Link>
          </Button>
        </div>
      </SectionWrapper>

      <SectionWrapper id="offerings-overview">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Offerings</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <BrainCircuit className="h-12 w-12 text-primary mb-4" />
              <CardTitle className="text-2xl">Domain-Agnostic AI Platform</CardTitle>
              <CardDescription>Flexible and powerful AI core adaptable to any industry specific needs.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Our platform is engineered for versatility, enabling rapid development and deployment of custom AI solutions.</p>
              <Button variant="link" asChild className="mt-4 p-0 text-primary">
                <Link href="/platform">Learn More <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <Lightbulb className="h-12 w-12 text-accent mb-4" />
              <CardTitle className="text-2xl">Strategic AI Consulting</CardTitle>
              <CardDescription>Expert guidance to integrate AI seamlessly into your business strategy for maximum impact.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>We partner with you to identify high-value AI opportunities and craft tailored implementation roadmaps.</p>
               <Button variant="link" asChild className="mt-4 p-0 text-primary">
                <Link href="/about">Our Approach <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <CardHeader>
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mb-4 lucide lucide-puzzle"><path d="M19.439 7.501c-2.405-2.404-6.313-2.404-8.718 0l-1.21 1.211-.032.032a3.05 3.05 0 0 0 0 4.314l1.193 1.192a3.05 3.05 0 0 0 4.314 0l4.453-4.452Z"/><path d="M12.544 11.456c1.202-1.202 3.156-1.202 4.358 0l1.21 1.21a3.05 3.05 0 0 1 0 4.314l-1.193 1.193a3.05 3.05 0 0 1-4.314 0l-.032-.033-.032-.032Z"/><path d="m4.561 16.499 1.21 1.211c2.405 2.404 6.313 2.404 8.718 0l1.21-1.211M16.439 4.501l-1.211-1.211c-2.405-2.404-6.313-2.404-8.718 0L4.5 4.299"/></svg>
              <CardTitle className="text-2xl">Custom AI Solutions</CardTitle>
              <CardDescription>Tailor-made AI applications designed to solve your unique business challenges effectively.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>From advanced analytics to intelligent automation, we build solutions that deliver measurable results.</p>
              <Button variant="link" asChild className="mt-4 p-0 text-primary">
                <Link href="/use-cases">View Use Cases <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="ai-features" className="bg-secondary/50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Experience Our AI</h2>
        <p className="text-center text-muted-foreground mb-10">Interact with our embedded AI tools to see our technology in action.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Lightbulb className="h-8 w-8 text-primary" />
                <CardTitle>AI Use Case Idea Sparker</CardTitle>
              </div>
              <CardDescription>Get AI-powered suggestions for your industry challenges.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <AiUseCaseSparker />
            </CardContent>
          </Card>
          <Card className="shadow-lg h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center gap-3">
                 <MessageCircleReply className="h-8 w-8 text-primary" />
                <CardTitle>Insta-Reply Helper</CardTitle>
              </div>
              <CardDescription>Instantly draft replies to customer messages.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <QuickReplyAssistant />
            </CardContent>
          </Card>
          <Card className="shadow-lg h-full flex flex-col md:col-span-2 xl:col-span-1"> {/* Ensures it spans full on md if only 2, or 1/3rd on xl */}
            <CardHeader>
               <div className="flex items-center gap-3">
                <Megaphone className="h-8 w-8 text-primary" />
                <CardTitle>Marketing Spark Plug</CardTitle>
              </div>
              <CardDescription>Generate catchy marketing snippets in seconds.</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <MarketingSnippetGenerator />
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper id="visual-showcase" className="text-center">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Visualizing Innovation</h2>
        <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-2xl">
          <Image 
            src="https://placehold.co/1200x600.png" 
            alt="Abstract futuristic technology background" 
            layout="fill" 
            objectFit="cover"
            data-ai-hint="futuristic technology"
            className="transform hover:scale-105 transition-transform duration-500"
          />
           <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <p className="text-white text-2xl md:text-4xl font-semibold p-4 bg-black/50 rounded">
              Cutting-Edge Technology at Your Fingertips
            </p>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
