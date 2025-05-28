import { PageHeader } from '@/components/shared/PageHeader';
import { SectionWrapper } from '@/components/shared/SectionWrapper';
import { ContactUsForm } from '@/components/forms/ContactUsForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        title="Get in Touch with GrepX"
        description="We're here to answer your questions, discuss your AI challenges, or explore partnership opportunities. Reach out to us today."
      />
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl">Contact Form</CardTitle>
              <CardDescription>Send us a message, request a demo, or inquire about our services.</CardDescription>
            </CardHeader>
            <CardContent>
              <ContactUsForm />
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-6 w-6 text-primary" />
                  <a href="mailto:info@grepx.com" className="text-muted-foreground hover:text-primary">info@grepx.com (Placeholder)</a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-6 w-6 text-primary" />
                  <span className="text-muted-foreground">+1 (555) 123-4567 (Placeholder)</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-6 w-6 text-primary" />
                  <span className="text-muted-foreground">123 Innovation Drive, Tech City, CA 90210 (Placeholder)</span>
                </div>
              </CardContent>
            </Card>
            
            <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-xl">
               <Image 
                src="https://placehold.co/800x500.png" 
                alt="Modern GrepX office building exterior" 
                layout="fill" 
                data-ai-hint="office building"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
