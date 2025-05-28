
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle, Database, Cog, ShieldCheck, GitMerge } from 'lucide-react';
import Image from 'next/image';

const platformPillars = [
  {
    icon: <Database className="h-10 w-10 text-primary" />,
    title: 'Data Ingestion & Processing',
    description: 'Seamlessly integrate and prepare diverse data sources for AI model training and inference, ensuring data quality and efficiency.',
    details: 'Our platform supports batch and real-time data pipelines, advanced data transformation, and feature engineering capabilities to fuel your AI initiatives.',
    image: 'https://placehold.co/600x400.png',
    hint: 'data network',
  },
  {
    icon: <Cog className="h-10 w-10 text-primary" />,
    title: 'Model Development & Training',
    description: 'A comprehensive suite of tools for building, training, and fine-tuning state-of-the-art AI models across various domains.',
    details: 'Leverage automated machine learning (AutoML), distributed training, and support for popular frameworks to accelerate model development cycles.',
    image: 'https://placehold.co/600x400.png',
    hint: 'ai model',
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary lucide lucide-rocket"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.87 12.87 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    title: 'Deployment & Inference Engine',
    description: 'Robust and scalable deployment options for putting your AI models into production, with optimized inference performance.',
    details: 'Deploy models as APIs, on edge devices, or in batch processing modes. Our inference engine ensures low latency and high throughput.',
    image: 'https://placehold.co/600x400.png',
    hint: 'cloud server',
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: 'Explainability & Ethics Layer',
    description: 'Promoting transparency and trust in AI with built-in tools for model explainability, bias detection, and ethical considerations.',
    details: 'Understand model predictions, ensure fairness, and comply with regulatory requirements using our integrated explainability and ethics toolkit.',
    image: 'https://placehold.co/600x400.png',
    hint: 'ethics security',
  },
];

const differentiators = [
  'Unmatched Speed of Adaptation: Quickly tailor solutions to new domains and evolving business needs.',
  'Extreme Scalability: Architected to handle growing data volumes and computational demands effortlessly.',
  'Innovative Architectural Approaches: Unique design principles for superior performance and efficiency.',
  'Seamless Integration: Easy-to-use APIs and connectors for integrating with your existing systems and workflows.',
  'Commitment to Open Standards: Ensuring interoperability and avoiding vendor lock-in.'
];

export default function PlatformPage() {
  return (
    <div>
      <PageHeader
        title="Our Domain-Agnostic AI Platform"
        description="Discover the core technology that powers GrepX's innovative AI solutions. Our platform is designed for adaptability, scalability, and cutting-edge performance across any industry."
      />

      <SectionWrapper id="platform-overview">
        <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">The GrepX Strategic Offering</CardTitle>
          </CardHeader>
          <CardContent className="text-lg text-muted-foreground space-y-4">
            <p>
              At GrepX, we've engineered a revolutionary AI platform that transcends domain boundaries. This is the foundation of our strategic offerings, enabling us to deliver bespoke AI solutions that address the unique challenges and opportunities of your business, regardless of your industry.
            </p>
            <div className="p-6 bg-secondary/30 rounded-lg border border-dashed border-primary/50">
              <h3 className="text-xl font-semibold text-primary mb-2">Placeholder for Full Strategic Offerings Text:</h3>
              <p className="italic">
                [The full text for "Company's Strategic Offerings" provided in the PRD will be inserted and adapted here. This will include a detailed breakdown of our platform's capabilities, value proposition, and how it empowers businesses. The content will be presented in digestible modules, using clear language, engaging visuals, diagrams, and potentially short animations to explain complex concepts effectively.]
              </p>
            </div>
            <p>
              Our platform is more than just technology; it's a catalyst for innovation, designed to be flexible, powerful, and intuitive. We empower you to harness the full potential of AI with confidence and clarity.
            </p>
          </CardContent>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="core-pillars">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Core Technology Pillars</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {platformPillars.map((pillar, index) => (
            <Card key={pillar.title} className="flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-start gap-4">
                {pillar.icon}
                <div>
                  <CardTitle className="text-xl">{pillar.title}</CardTitle>
                  <CardDescription>{pillar.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                  <Image 
                    src={pillar.image} 
                    alt={pillar.title} 
                    layout="fill" 
                    objectFit="cover" 
                    data-ai-hint={pillar.hint}
                  />
                </div>
                <p className="text-sm text-muted-foreground">{pillar.details}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="differentiators" className="bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Key Differentiators</h2>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
          {differentiators.map((item, index) => (
            <div key={index} className="flex items-start space-x-3 animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 50}ms` }}>
              <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="integration">
        <Card className="shadow-lg animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="items-center text-center">
            <GitMerge className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl md:text-3xl">Seamless Integration Capabilities</CardTitle>
            <CardDescription>Designed to fit into your existing ecosystem.</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-muted-foreground space-y-4 max-w-2xl mx-auto">
             <p>Our platform is built with interoperability in mind. We provide robust APIs, SDKs, and pre-built connectors to ensure smooth integration with your current data sources, applications, and cloud or on-premise infrastructure. This allows for a faster time-to-value and minimizes disruption to your operations.</p>
             <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-xl mt-6">
                <Image 
                    src="https://placehold.co/800x400.png" 
                    alt="Abstract representation of system integration and APIs" 
                    layout="fill" 
                    objectFit="cover"
                    data-ai-hint="integration api"
                />
             </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
