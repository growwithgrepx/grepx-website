
import PlatformPillarCard from '@/components/platform-pillar-card';
import AnimatedContent from '@/components/shared/animated-content';
import { BarChart, Cpu, DatabaseZap, Lightbulb } from 'lucide-react'; // Example icons

const pillars: Array<{
  icon: LucideIcon;
  title: string;
  description: string;
  visualizationType: 'data-flow' | 'network' | 'pulse' | 'bar-chart-viz'; // Ensure this matches PlatformPillarCardProps
}> = [
  {
    icon: DatabaseZap,
    title: 'Intelligent Data Ingestion',
    description: 'Seamlessly integrate and process vast datasets from diverse sources with AI-powered automation and precision.',
    visualizationType: 'data-flow',
  },
  {
    icon: Cpu,
    title: 'Advanced Model Development',
    description: 'Leverage cutting-edge algorithms and a flexible framework to build, train, and deploy sophisticated AI models at scale.',
    visualizationType: 'network',
  },
  {
    icon: Lightbulb,
    title: 'Actionable Insight Generation',
    description: 'Transform raw data into clear, actionable insights that drive strategic decision-making and business growth.',
    visualizationType: 'pulse',
  },
  {
    icon: BarChart,
    title: 'Scalable AI Solutions',
    description: 'Deploy robust, domain-agnostic AI applications that adapt to your evolving needs and deliver continuous value.',
    visualizationType: 'bar-chart-viz', // Changed from 'network' to 'bar-chart-viz'
  }
];

export default function PlatformPillarsSection() {
  return (
    // This section is now part of the /platform page, so the top-level title is on that page.
    // The section itself will just render the cards.
    <section id="platform-pillars" className="py-8"> 
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
          {pillars.map((pillar, index) => (
            <AnimatedContent
              key={pillar.title}
              animationType={index % 2 === 0 ? 'fadeInLeft' : 'fadeInUp'}
              delay={`${index * 150}ms`}
            >
              <PlatformPillarCard
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
                visualizationType={pillar.visualizationType}
              />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
