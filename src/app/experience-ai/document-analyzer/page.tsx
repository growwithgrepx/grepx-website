
import IntelligentDocumentAnalyzerSection from '@/components/sections/intelligent-document-analyzer';
import { Separator } from '@/components/ui/separator';
import AnimatedContent from '@/components/shared/animated-content';

export default function DocumentAnalyzerPage() {
  return (
    <div className="py-8 bg-background rounded-lg shadow-md"> {/* Added background to the page container */}
      <AnimatedContent animationType="fadeInUp">
        <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gradient-primary-accent">
              Intelligent Document Analyzer
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
              Upload an image of a document or paste its text content. Our AI will extract key data, summarize information, and provide actionable insights.
            </p>
        </section>
      </AnimatedContent>
      {/* IntelligentDocumentAnalyzerSection has its own background (bg-slate-50) */}
      <IntelligentDocumentAnalyzerSection />
      <div className="container mx-auto px-4">
        <Separator className="my-12 md:my-16" />
      </div>
      <AnimatedContent animationType="fadeInUp" delay="300ms">
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Unlock Your Document Potential</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience how GrepX's AI can parse, understand, and extract critical information from your documents, transforming raw data into actionable intelligence.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mt-2">
            Currently supports text input and image uploads. For PDF, Word, or Excel documents, please paste the text content or use an image of the document page.
          </p>
        </section>
      </AnimatedContent>
    </div>
  );
}

    