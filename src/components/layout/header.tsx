
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
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronDown, Menu, X } from 'lucide-react';
import React from 'react';
import { ThemeToggle } from '@/components/shared/theme-toggle';
import { Separator } from '@/components/ui/separator';

export default function Header() {
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
        {/* Desktop Navigation */}
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
          <Link
            href="/contact"
            className="text-foreground/80 transition-colors hover:text-primary text-sm font-medium focus:outline-none"
          >
            Contact Us
          </Link>
          <ThemeToggle />
        </nav>
        
        {/* Mobile Navigation Trigger */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] p-0">
              <SheetHeader className="p-4 border-b">
                 <div className="flex justify-between items-center">
                    <SheetTitle className="text-left">Menu</SheetTitle>
                    <SheetClose asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close menu</span>
                        </Button>
                    </SheetClose>
                 </div>
              </SheetHeader>
              <nav className="flex flex-col space-y-2 p-4">
                {mainNavItems.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-lg font-semibold text-foreground/90 hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <Separator className="my-2" />
                <h3 className="px-3 py-2 text-sm font-semibold text-muted-foreground">AI Unleashed</h3>
                {experienceAiNavItems.map((item) => (
                  <SheetClose key={item.name} asChild>
                    <Link
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-lg font-semibold text-foreground/90 hover:bg-accent hover:text-accent-foreground"
                    >
                      {item.name}
                    </Link>
                  </SheetClose>
                ))}
                <Separator className="my-2" />
                <SheetClose asChild>
                  <Link
                    href="/contact"
                    className="block px-3 py-2 rounded-md text-lg font-semibold text-foreground/90 hover:bg-accent hover:text-accent-foreground"
                  >
                    Contact Us
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
