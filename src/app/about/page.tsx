
import { Separator } from '@/components/ui/separator';
import AnimatedContent from '@/components/shared/animated-content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Target, Eye, Zap, ShieldCheck, Users, Brain, Rocket, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const coreValues = [
    { icon: Lightbulb, title: "Innovation", description: "Pioneering new frontiers in AI with creativity and curiosity." },
    { icon: ShieldCheck, title: "Integrity", description: "Upholding the highest ethical standards in all our endeavors." },
    { icon: Users, title: "Collaboration", description: "Working together with our clients and partners to achieve shared success." },
    { icon: Rocket, title: "Excellence", description: "Striving for outstanding quality and impactful results in every project." },
  ];

  return (
    <div className="py-12 md:py-20 bg-background rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        {/* Section 1: About GrepX Intro */}
        <AnimatedContent animationType="fadeInUp">
          <section className="text-center mb-16 md:mb-24">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gradient-primary-accent">
              About <span className="text-gradient-primary-accent">GrepX</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl text-center">
              We are a passionate team of innovators, engineers, and thinkers dedicated to harnessing the power of Artificial Intelligence to solve complex challenges and create a smarter future.
            </p>
          </section>
        </AnimatedContent>

        <Separator className="my-12 md:my-16" />

        {/* Section 2: Our Story */}
        <AnimatedContent animationType="fadeInLeft" delay="200ms">
          <section className="mb-16 md:mb-24 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-left">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6 flex items-center">
                <Briefcase className="mr-3 h-8 w-8 text-primary shrink-0" /> Our Story
              </h2>
              <p className="text-lg text-foreground/80 mb-4">
                Founded on the belief that AI can be a transformative force for good, GrepX began its journey with a small team of visionaries. We saw the potential to build intelligent systems that are not only powerful but also accessible, ethical, and aligned with human values.
              </p>
              <p className="text-lg text-foreground/80">
                From humble beginnings, we've grown into a dynamic company, driven by a relentless pursuit of innovation and a commitment to delivering exceptional value to our clients. Our story is one of continuous learning, adaptation, and a deep-seated passion for pushing the boundaries of what's possible with AI.
              </p>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden shadow-xl order-1 md:order-2 flex items-center justify-center p-4 bg-card/30 dark:bg-card/20" aria-label="Abstract AI Collaboration Animation: Interconnected nodes and lines, symbolizing collaboration and the formation of an AI neural network structure.">
              <svg
                viewBox="0 0 200 160"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full object-contain"
              >
                <g style={{ transformOrigin: 'center center', animation: 'svg-subtle-rotate 75s linear infinite' }}>
                  {/* Nodes */}
                  <circle cx="100" cy="35" r="10" fill="hsl(var(--primary))" style={{ animation: 'svg-node-pulse 3.0s ease-in-out infinite' }} />
                  <circle cx="50" cy="125" r="12" fill="hsl(var(--primary))" style={{ animation: 'svg-node-pulse 3.0s ease-in-out infinite 0.4s' }} />
                  <circle cx="150" cy="125" r="11" fill="hsl(var(--primary))" style={{ animation: 'svg-node-pulse 3.0s ease-in-out infinite 0.8s' }} />
                  <circle cx="100" cy="80" r="7" fill="hsla(var(--primary), 0.8)" style={{ animation: 'svg-node-pulse 2.8s ease-in-out infinite 0.2s' }} />


                  {/* Connecting Lines with staggered drawing animation */}
                  <path
                    d="M100 35 Q75 80 50 125"
                    stroke="hsl(var(--accent))" strokeOpacity="0.7" strokeWidth="1.5" fill="none"
                    strokeDasharray="150" strokeDashoffset="150"
                    style={{ animation: 'svg-line-draw 2.5s ease-out forwards 0.5s' }}
                  />
                  <path
                    d="M50 125 Q100 100 150 125"
                    stroke="hsl(var(--accent))" strokeOpacity="0.7" strokeWidth="1.5" fill="none"
                    strokeDasharray="150" strokeDashoffset="150"
                    style={{ animation: 'svg-line-draw 2.5s ease-out forwards 1s' }}
                  />
                  <path
                    d="M150 125 Q125 80 100 35"
                    stroke="hsl(var(--accent))" strokeOpacity="0.7" strokeWidth="1.5" fill="none"
                    strokeDasharray="150" strokeDashoffset="150"
                    style={{ animation: 'svg-line-draw 2.5s ease-out forwards 1.5s' }}
                  />
                   <path
                    d="M100 35 L100 80" // Vertical from top to middle node
                    stroke="hsl(var(--accent))" strokeOpacity="0.6" strokeWidth="1" fill="none"
                    strokeDasharray="100" strokeDashoffset="100"
                    style={{ animation: 'svg-line-draw 2.0s ease-out forwards 2s' }}
                  />
                   <path
                    d="M50 125 L100 80" // From bottom-left to middle node
                    stroke="hsl(var(--accent))" strokeOpacity="0.6" strokeWidth="1" fill="none"
                    strokeDasharray="100" strokeDashoffset="100"
                    style={{ animation: 'svg-line-draw 2.0s ease-out forwards 2.2s' }}
                  />
                   <path
                    d="M150 125 L100 80" // From bottom-right to middle node
                    stroke="hsl(var(--accent))" strokeOpacity="0.6" strokeWidth="1" fill="none"
                    strokeDasharray="100" strokeDashoffset="100"
                    style={{ animation: 'svg-line-draw 2.0s ease-out forwards 2.4s' }}
                  />

                  {/* Smaller decorative/connecting nodes */}
                  <circle cx="70" cy="75" r="3" fill="hsla(var(--accent), 0.5)" style={{ animation: 'svg-node-pulse 2.5s ease-in-out infinite 0.3s' }} />
                  <circle cx="130" cy="75" r="3" fill="hsla(var(--accent), 0.5)" style={{ animation: 'svg-node-pulse 2.5s ease-in-out infinite 0.8s' }} />
                  <circle cx="100" cy="115" r="2.5" fill="hsla(var(--accent), 0.4)" style={{ animation: 'svg-node-pulse 2.5s ease-in-out infinite 1.2s' }} />
                </g>
              </svg>
            </div>
          </section>
        </AnimatedContent>

        <Separator className="my-12 md:my-16" />

        {/* Section 3: Our Mission & Vision (Side by Side) */}
        <section className="mb-16 md:mb-24">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                <AnimatedContent animationType="fadeInUp" delay="400ms">
                    <Card className="h-full hover:shadow-2xl transition-all duration-300 ease-in-out border-primary/30 hover:border-primary text-left">
                    <CardHeader>
                        <CardTitle className="flex items-center text-2xl md:text-3xl font-semibold">
                        <Target className="mr-3 h-8 w-8 text-primary shrink-0" /> Our Mission
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-foreground/70">
                        To empower businesses and organizations with cutting-edge AI solutions that drive efficiency, foster innovation, and create tangible value. We strive to make sophisticated AI accessible and impactful for all.
                        </p>
                    </CardContent>
                    </Card>
                </AnimatedContent>
                <AnimatedContent animationType="fadeInUp" delay="500ms">
                    <Card className="h-full hover:shadow-2xl transition-all duration-300 ease-in-out border-accent/30 hover:border-accent text-left">
                    <CardHeader>
                        <CardTitle className="flex items-center text-2xl md:text-3xl font-semibold">
                        <Eye className="mr-3 h-8 w-8 text-accent shrink-0" /> Our Vision
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-foreground/70">
                        To be a global leader in Artificial Intelligence, pioneering a future where intelligent technology seamlessly integrates with human endeavors to enhance lives, transform industries, and build a more sustainable world.
                        </p>
                    </CardContent>
                    </Card>
                </AnimatedContent>
            </div>
        </section>

        <Separator className="my-12 md:my-16" />

        {/* Section 4: Our Core Values */}
        <AnimatedContent animationType="fadeInUp" delay="600ms">
          <section className="mb-12 md:mb-20 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-12 flex items-center justify-center">
              <Zap className="mr-4 h-10 w-10 text-primary" /> Our Core Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {coreValues.map((value, index) => (
                <AnimatedContent key={value.title} animationType="fadeInUp" delay={`${700 + index * 100}ms`}>
                  <Card className="text-left h-full transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl group border-transparent hover:border-primary/50">
                    <CardHeader className="items-center pt-6">
                      <div 
                        className="p-4 bg-primary/10 rounded-full mb-4 group-hover:bg-primary/20 transition-colors duration-300 opacity-0"
                        style={{ animation: `icon-container-reveal 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.2 + index * 0.1}s forwards` }}
                      >
                         <value.icon 
                           className="h-10 w-10 md:h-12 md:w-12 text-primary transition-transform duration-300 opacity-0"
                           style={{ animation: `lucide-icon-reveal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${0.35 + index * 0.1}s forwards` }}
                         />
                      </div>
                      <CardTitle className="text-xl lg:text-2xl font-semibold group-hover:text-primary transition-colors text-center">{value.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6">
                      <p className="text-foreground/70 text-sm md:text-base text-left">{value.description}</p>
                    </CardContent>
                  </Card>
                </AnimatedContent>
              ))}
            </div>
          </section>
        </AnimatedContent>
      </div>
    </div>
  );
}

