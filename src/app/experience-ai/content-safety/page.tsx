
import ContentSafetyAnalyzerSection from '@/components/sections/content-safety-analyzer';
import { Separator } from '@/components/ui/separator';
import AnimatedContent from '@/components/shared/animated-content';

export default function ContentSafetyPage() {
  return (
    <div className="py-8 bg-background rounded-lg shadow-md"> {/* Added background to the page container */}
      <AnimatedContent animationType="fadeInUp">
        <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gradient-primary-accent">
              AI-Powered Content Safety Analyzer
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
              Test our AI's ability to identify potential safety concerns in text, including various forms of bias. This demonstrates our commitment to Responsible AI.
            </p>
        </section>
      </AnimatedContent>
      {/* ContentSafetyAnalyzerSection has its own background (bg-slate-50) */}
      <ContentSafetyAnalyzerSection /> 
      <div className="container mx-auto px-4">
        <Separator className="my-12 md:my-16" />
      </div>
      <AnimatedContent animationType="fadeInUp" delay="300ms">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Understanding Content Safety</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Learn more about our approach to responsible AI, the technology behind our safety analyzer,
            and how GrepX promotes ethical AI practices.
          </p>
        </section>
      </AnimatedContent>
    </div>
  );
}

    