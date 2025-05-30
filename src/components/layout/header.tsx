
"use client";

import Link from 'next/link';
import Logo from '@/components/shared/logo';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from 'lucide-react';
import React from 'react'; // Removed useState as it's no longer needed for a dialog

export default function Header() {
  // Removed isContactModalOpen state and setIsContactModalOpen

  const mainNavItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Platform', href: '/platform' },
  ];

  const experienceAiNavItems = [
    { name: 'Content Safety Analyzer', href: '/experience-ai/content-safety' },
    { name: 'Intelligent Document Analyzer', href: '/experience-ai/document-analyzer' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {mainNavItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 transition-colors hover:text-primary"
            >
              {item.name}
            </Link>
          ))}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-foreground/80 transition-colors hover:text-primary focus:outline-none">
              AI Unleashed
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {experienceAiNavItems.map((item) => (
                <DropdownMenuItem key={item.name} asChild>
                  <Link href={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Changed DialogTrigger to a simple Link */}
          <Link
            href="/contact"
            className="text-foreground/80 transition-colors hover:text-primary text-sm font-medium focus:outline-none"
          >
            Contact Us
          </Link>
        </nav>
        
        <div className="md:hidden">
          {/* Changed DialogTrigger Button to a Link Button for mobile */}
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
