
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { DollarSign, HeartPulse, Factory, ShoppingCart, ArrowRight } from 'lucide-react';

const useCases = [
  {
    industry: 'Finance',
    title: 'AI-Powered Fraud Detection',
    problem: 'Increasingly sophisticated fraudulent activities leading to significant financial losses and eroding customer trust.',
    solution: 'Leverage advanced machine learning models to analyze transaction patterns in real-time, identifying and flagging suspicious activities with high accuracy.',
    benefits: ['Reduced financial losses', 'Enhanced security for customers', 'Improved regulatory compliance', 'Faster detection of novel fraud schemes'],
    icon: <DollarSign className="h-10 w-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    hint: "financial security",
  },
  {
    industry: 'Healthcare',
    title: 'Predictive Analytics for Patient Outcomes',
    problem: 'Difficulties in early identification of high-risk patients and optimizing treatment pathways for better outcomes.',
    solution: 'Utilize AI to analyze vast amounts of patient data (EHRs, genomics, lifestyle factors) to predict potential health risks and personalize care plans.',
    benefits: ['Proactive patient care', 'Improved treatment efficacy', 'Optimized resource allocation in hospitals', 'Reduced readmission rates'],
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    hint: "digital health",
  },
  {
    industry: 'Manufacturing',
    title: 'Intelligent Predictive Maintenance',
    problem: 'Unplanned equipment downtime leading to production losses, increased maintenance costs, and supply chain disruptions.',
    solution: 'Implement AI models that analyze IoT sensor data from machinery to predict potential failures before they occur, enabling proactive maintenance scheduling.',
    benefits: ['Minimized unplanned downtime', 'Extended equipment lifespan', 'Optimized maintenance schedules and costs', 'Improved production efficiency'],
    icon: <Factory className="h-10 w-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    hint: "smart factory",
  },
   {
    industry: 'Retail',
    title: 'Hyper-Personalized Customer Experiences',
    problem: 'Meeting diverse customer expectations and increasing engagement in a competitive market.',
    solution: 'Employ AI to analyze customer behavior, preferences, and purchase history to deliver personalized product recommendations, offers, and content.',
    benefits: ['Increased customer loyalty and retention', 'Higher conversion rates', 'Improved marketing ROI', 'Enhanced customer satisfaction'],
    icon: <ShoppingCart className="h-10 w-10 text-primary" />,
    image: "https://placehold.co/600x400.png",
    hint: "online shopping",
  },
];

export default function UseCasesPage() {
  return (
    <div>
      <PageHeader
        title="Versatile AI Solutions Across Industries"
        description="Explore how GrepX's domain-agnostic AI platform can be applied to solve complex challenges and unlock new opportunities in your specific sector. These are conceptual examples to illustrate the breadth of our capabilities."
      />

      <SectionWrapper>
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {useCases.map((uc, index) => (
            <Card key={uc.title} className="flex flex-col shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {uc.icon}
                  <CardTitle className="text-2xl">{uc.title}</CardTitle>
                </div>
                <CardDescription className="text-sm font-semibold text-accent">{uc.industry}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow space-y-4">
                <div className="relative w-full h-48 rounded-md overflow-hidden mb-4">
                  <Image src={uc.image} alt={uc.title} layout="fill" objectFit="cover" data-ai-hint={uc.hint} />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">The Challenge:</h4>
                  <p className="text-muted-foreground text-sm">{uc.problem}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Our AI-Powered Solution:</h4>
                  <p className="text-muted-foreground text-sm">{uc.solution}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">Potential Benefits:</h4>
                  <ul className="list-disc list-inside text-muted-foreground text-sm space-y-1">
                    {uc.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}
                  </ul>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="text-primary p-0">
                  <Link href="/contact">Discuss Your Use Case <ArrowRight className="ml-2 h-4 w-4" /></Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
