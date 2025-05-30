
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CosmicBackground from '@/components/shared/cosmic-background'; // Import the new component
import { cn } from '@/lib/utils';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'GrepX - Pioneering AI Solutions',
  description: 'Pioneering the Future of AI with Effortless Elegance and Futuristic Clarity.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body 
        className={cn(
          geistSans.variable, 
          geistMono.variable, 
          // Remove bg-background from body, it will be handled by sections or the cosmic background
          'antialiased min-h-screen flex flex-col relative' // Added relative for z-index stacking if needed
        )}
      >
        <CosmicBackground className="-z-10" /> {/* Place background here, behind other elements */}
        
        <Header /> {/* Header has its own background and z-index: 50 */}
        
        <main className="flex-grow container mx-auto px-4 py-8 relative z-[5]"> 
          {/* 
            main needs relative and a z-index higher than cosmic background (0 or -10) 
            but lower than header/footer.
            Its background should be transparent for the cosmic background to show through.
            Individual sections/cards within children will provide their own backgrounds.
          */}
          {children}
        </main>
        
        <Footer /> {/* Footer should have its own background and appropriate z-index */}
        
        <Toaster />
      </body>
    </html>
  );
}

    