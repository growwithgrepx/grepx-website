
import ContactForm from '@/components/contact-form';
import AnimatedContent from '@/components/shared/animated-content';
import { Separator } from '@/components/ui/separator';
import { MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20 bg-background rounded-lg shadow-md">
      <div className="container mx-auto px-4">
        <AnimatedContent animationType="fadeInUp">
          <section className="text-center mb-12 md:mb-16">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 text-gradient-primary-accent">
              Get In Touch
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl md:text-2xl">
              We’re here to answer your questions and help you discover how GrepX can transform your business. Reach out to us using the form below.
            </p>
          </section>
        </AnimatedContent>

        <Separator className="my-8 md:my-12" />

        <AnimatedContent animationType="fadeInUp" delay="200ms">
          <section className="max-w-2xl mx-auto">
            <div className="bg-card p-6 sm:p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold mb-6 flex items-center text-left">
                <MessageCircle className="mr-3 h-7 w-7 text-primary" /> Send Us a Message
              </h2>
              {/* ContactForm no longer needs onClose */}
              <ContactForm /> 
            </div>
          </section>
        </AnimatedContent>
      </div>
    </div>
  );
}
