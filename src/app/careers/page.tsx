
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { CareerApplicationForm } from '@/components/forms/CareerApplicationForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Lightbulb, Users, TrendingUp, Sparkles } from 'lucide-react';

const whyJoinGrepX = [
  {
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
    title: "Work on Cutting-Edge AI",
    description: "Contribute to revolutionary projects that redefine what's possible with artificial intelligence."
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Collaborative Culture",
    description: "Join a diverse team of brilliant minds where your ideas are valued and collaboration thrives."
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Impactful Work",
    description: "See your contributions make a real-world difference across various industries."
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Growth Opportunities",
    description: "Continuously learn and grow with access to new challenges and professional development."
  }
];

export default function CareersPage() {
  return (
    <div>
      <PageHeader
        title="Join the GrepX Revolution"
        description="Shape the future of AI with us. We're looking for passionate innovators, problem-solvers, and collaborators to join our mission."
      />

      <SectionWrapper id="why-grepx" className="bg-secondary/30 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Why GrepX is a Great Place to Work</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {whyJoinGrepX.map((item, index) => (
            <Card key={item.title} className="shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="flex flex-row items-start gap-4">
                {item.icon}
                <CardTitle className="text-xl">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>
      
      <SectionWrapper id="culture">
        <Card className="shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="md:flex md:flex-row-reverse">
            <div className="md:w-1/2">
              <Image 
                src="https://placehold.co/800x600.png" 
                alt="GrepX innovative company culture and collaborative workspace" 
                width={800} 
                height={600}
                data-ai-hint="workspace collaborative" 
                objectFit="cover"
                className="h-64 w-full md:h-full"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Culture of Innovation</h2>
              <p className="text-muted-foreground mb-4">
                At GrepX, we foster an environment where curiosity, creativity, and continuous learning are paramount. We believe that the best ideas come from diverse perspectives and open collaboration. Our team members are encouraged to take initiative, explore new frontiers, and challenge the status quo. 
              </p>
              <p className="text-muted-foreground">
                We value work-life balance, mutual respect, and a shared passion for leveraging technology to make a positive impact. If you're driven by innovation and want to be part of a dynamic team, GrepX is the place for you.
              </p>
            </div>
          </div>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="talent-pool">
        <Card className="shadow-xl max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Join Our Talent Pool</CardTitle>
            <p className="text-muted-foreground pt-2">
              We're always on the lookout for exceptional talent. If you're passionate about AI and believe you can contribute to our vision, submit your details, and we'll reach out when a suitable opportunity arises.
            </p>
          </CardHeader>
          <CardContent>
            <CareerApplicationForm />
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
