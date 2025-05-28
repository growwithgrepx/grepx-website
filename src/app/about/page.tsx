
import { PageHeader } from '@/components/shared/PageHeader';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Users, Target, Eye, Zap, ShieldCheck } from 'lucide-react';

const coreValues = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    name: "Innovation",
    description: "We constantly push the boundaries of AI, seeking novel solutions to complex problems."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary lucide lucide-microscope"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>,
    name: "Excellence",
    description: "We are committed to the highest standards of quality and performance in everything we do."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary lucide lucide-handshake"><path d="M11 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/><path d="M7 17V7"/><path d="M13 17a2 2 0 0 0 2 2h5a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-5"/><path d="M17 17V7"/><path d="M5 12H2L7 7l5 5H7Z"/><path d="M19 12h3l-5-5-5 5h5Z"/></svg>,
    name: "Collaboration",
    description: "We believe in the power of partnership, working closely with clients to achieve shared success."
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    name: "Integrity",
    description: "We operate with transparency, honesty, and a strong ethical compass in all our endeavors."
  }
];


export default function AboutPage() {
  return (
    <div>
      <PageHeader
        title="About GrepX"
        description="Driving the future of artificial intelligence with a commitment to innovation, excellence, and domain-agnostic solutions."
      />

      <SectionWrapper id="story">
        <Card className="shadow-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="md:flex">
            <div className="md:w-1/2">
              <Image 
                src="https://placehold.co/800x600.png" 
                alt="GrepX team working in a modern office" 
                width={800} 
                height={600} 
                data-ai-hint="team office"
                objectFit="cover"
                className="h-64 w-full md:h-full"
              />
            </div>
            <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Story</h2>
              <p className="text-muted-foreground mb-4">
                GrepX was founded by a team of passionate AI visionaries and seasoned technologists who saw the transformative potential of AI beyond narrow applications. We recognized the need for a truly domain-agnostic platform capable of adapting to diverse business challenges and delivering tangible value across industries.
              </p>
              <p className="text-muted-foreground">
                Our journey began with a simple yet ambitious goal: to democratize access to cutting-edge AI and empower organizations of all sizes to innovate and thrive in an increasingly data-driven world. Today, GrepX stands at the forefront of AI research and development, committed to building intelligent solutions that are not only powerful but also responsible and ethical.
              </p>
            </div>
          </div>
        </Card>
      </SectionWrapper>

      <SectionWrapper id="mission-vision" className="bg-secondary/30 rounded-lg">
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <Target className="h-10 w-10 text-primary" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To empower businesses with adaptable, intelligent AI solutions that drive innovation, efficiency, and sustainable growth, making advanced AI accessible and impactful for all.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-all duration-300 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
            <CardHeader className="flex flex-row items-center gap-4">
              <Eye className="h-10 w-10 text-accent" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                To be the leading global partner for domain-agnostic AI, shaping a future where intelligent technology seamlessly integrates with human endeavor to solve the world’s most complex challenges.
              </p>
            </CardContent>
          </Card>
        </div>
      </SectionWrapper>

      <SectionWrapper id="values">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Our Core Values</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreValues.map((value, index) => (
            <Card key={value.name} className="text-center shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-[1.02] animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="items-center">
                {value.icon}
                <CardTitle className="mt-4 text-xl">{value.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper id="team-overview">
        <Card className="shadow-lg text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <CardHeader className="items-center">
            <Users className="h-12 w-12 text-primary mb-4" />
            <CardTitle className="text-2xl md:text-3xl">Meet Our Expert Team</CardTitle>
          </CardHeader>
          <CardContent className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-6">
              GrepX is powered by a diverse and dedicated team of AI researchers, machine learning engineers, software developers, and product strategists. While individual profiles are forthcoming, our collective expertise spans decades in pioneering AI technologies and delivering impactful enterprise solutions. We foster a culture of continuous learning, collaboration, and relentless pursuit of innovation.
            </p>
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
               <Image 
                src="https://placehold.co/1000x500.png" 
                alt="Diverse team of AI professionals and engineers" 
                layout="fill" 
                objectFit="cover"
                data-ai-hint="ai professionals"
              />
            </div>
          </CardContent>
        </Card>
      </SectionWrapper>
    </div>
  );
}
