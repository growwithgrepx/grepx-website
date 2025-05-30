"use client";

import React, { useRef } from 'react';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

type AnimationType = 'fadeInUp' | 'fadeInLeft' | 'fadeIn';

interface AnimatedContentProps {
  children: React.ReactNode;
  animationType?: AnimationType;
  className?: string;
  delay?: string; // e.g., 'delay-200ms' or style={{ animationDelay: '200ms' }}
  threshold?: number;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  animationType = 'fadeInUp',
  className,
  delay,
  threshold = 0.1,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, { threshold, freezeOnceVisible: true });
  const isVisible = !!entry?.isIntersecting;

  const animationClass = {
    fadeInUp: 'animate-fadeInUp',
    fadeInLeft: 'animate-fadeInLeft',
    fadeIn: 'animate-fadeIn',
  }[animationType];

  return (
    <div
      ref={ref}
      className={cn(
        'opacity-0', // Start hidden
        isVisible && animationClass,
        delay && isVisible ? `animate-delay-${delay}` : '', // This requires custom Tailwind config for animate-delay or use style
        className
      )}
      style={delay && isVisible ? { animationDelay: delay } : {}}
    >
      {children}
    </div>
  );
};

export default AnimatedContent;
