
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import CosmicBackground from '@/components/shared/cosmic-background'; 
import { cn } from '@/lib/utils';
import { ThemeProvider } from "next-themes";

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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body 
        className={cn(
          geistSans.variable, 
          geistMono.variable, 
          'antialiased min-h-screen flex flex-col relative'
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <CosmicBackground className="-z-10" />
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8 relative z-[5]"> 
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
