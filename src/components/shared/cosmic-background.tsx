
"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface Particle {
  id: number;
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  opacity: number;
  baseOpacity: number;
  pulseDirection: number;
  pulseSpeed: number;
  pulseAmplitude: number;
  z: number; // For parallax depth effect
}

interface CosmicBackgroundProps {
  className?: string;
  particleCount?: number; // Determined by screen size if undefined
  connectionDistance?: number;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({
  className,
  particleCount = undefined, 
  connectionDistance = 120,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [themeColors, setThemeColors] = useState({
    background: 'hsl(210 27% 95%)',
    primary: 'hsl(207 68% 73%)',
    accent: 'hsl(120 73% 75%)',
    foreground: 'hsl(210 15% 20%)',
  });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState<{ x: number | null, y: number | null }>({ x: null, y: null });

  const getThemeColors = useCallback(() => {
    if (typeof window !== 'undefined') {
      const computedStyle = getComputedStyle(document.documentElement);
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      const newColors = {
        background: computedStyle.getPropertyValue(isDarkMode ? '--background-dark' : '--background').trim() || (isDarkMode ? 'hsl(210 15% 10%)' : 'hsl(210 27% 95%)'),
        primary: computedStyle.getPropertyValue(isDarkMode ? '--primary-dark' : '--primary').trim() || (isDarkMode ? 'hsl(207 68% 65%)' : 'hsl(207 68% 73%)'),
        accent: computedStyle.getPropertyValue(isDarkMode ? '--accent-dark' : '--accent').trim() || (isDarkMode ? 'hsl(120 65% 60%)' : 'hsl(120 73% 75%)'),
        foreground: computedStyle.getPropertyValue(isDarkMode ? '--foreground-dark' : '--foreground').trim() || (isDarkMode ? 'hsl(210 27% 90%)' : 'hsl(210 15% 20%)'),
      };

      setThemeColors(prevColors => {
        if (
          prevColors.background === newColors.background &&
          prevColors.primary === newColors.primary &&
          prevColors.accent === newColors.accent &&
          prevColors.foreground === newColors.foreground
        ) {
          return prevColors;
        }
        return newColors;
      });
    }
  }, []);
  
  const parseHsl = (hslStr: string): { h: number, s: number, l: number } | null => {
    const match = hslStr.match(/hsl\((\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\)/);
    if (match) {
      return { h: parseInt(match[1]), s: parseInt(match[2]), l: parseInt(match[3]) };
    }
    const spaceMatch = hslStr.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
     if (spaceMatch) {
      return { h: parseInt(spaceMatch[1]), s: parseInt(spaceMatch[2]), l: parseInt(spaceMatch[3]) };
    }
    return null;
  };

  const getParticleColor = (baseColorStr: string, opacity: number): string => {
    const hsl = parseHsl(baseColorStr);
    if (hsl) {
      return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${opacity})`;
    }
    if (baseColorStr.startsWith('#') && baseColorStr.length === 7) {
        return `${baseColorStr}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
    }
    return baseColorStr; 
  };

  const initParticles = useCallback((width: number, height: number) => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas || width === 0 || height === 0) return;

    const numParticles = particleCount || Math.floor((width * height) / 15000);
    const newParticles: Particle[] = [];
    // Use themeColors directly as they are captured by useCallback's closure
    const colors = [themeColors.primary, themeColors.accent, `hsl(0, 0%, 100%)`]; 

    for (let i = 0; i < numParticles; i++) {
      const z = Math.random(); 
      const radius = (1 + z * 2) * (Math.random() * 0.5 + 0.5); 
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        radius: radius,
        vx: (Math.random() - 0.5) * 0.2 * (0.5 + z), 
        vy: (Math.random() - 0.5) * 0.2 * (0.5 + z),
        color: colors[Math.floor(Math.random() * colors.length)],
        baseOpacity: 0.2 + z * 0.6, 
        opacity: 0.2 + z * 0.6,
        pulseDirection: 1,
        pulseSpeed: Math.random() * 0.002 + 0.001,
        pulseAmplitude: Math.random() * 0.1 + 0.05,
        z: z,
      });
    }
    setParticles(newParticles);
  }, [canvasRef, particleCount, themeColors.primary, themeColors.accent]); // Depends on specific color strings

  // Effect for theme management
  useEffect(() => {
    getThemeColors(); // Initial fetch
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && (mutation.attributeName === 'class' || mutation.attributeName === 'style')) {
          getThemeColors(); 
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      observer.disconnect();
    };
  }, [getThemeColors]);

  // Effect for canvas setup, particle init, and listeners
  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    const handleResize = () => {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      if (canvasRef.current) { // Check ref again inside handler
          canvasRef.current.width = newWidth;
          canvasRef.current.height = newHeight;
      }
      setDimensions({ width: newWidth, height: newHeight });
      initParticles(newWidth, newHeight);
    };

    const handleMouseMove = (event: MouseEvent) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    
    // Initial setup: ensure canvas is sized before initializing particles
    // Run handleResize on mount to set initial dimensions and particles
    handleResize(); 

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [initParticles]); // This effect re-runs if initParticles function reference changes.
                       // initParticles changes if canvasRef, particleCount, or specific theme color strings change.

  // Effect for rendering loop
  useEffect(() => {
    const currentCanvas = canvasRef.current;
    const ctx = currentCanvas?.getContext('2d');
    let animationFrameId: number;

    if (!ctx || !currentCanvas || dimensions.width === 0 || dimensions.height === 0) {
      return;
    }

    const render = () => {
      ctx.clearRect(0, 0, currentCanvas.width, currentCanvas.height);
      
      const parallaxOffsetX = mousePosition.x ? (mousePosition.x / currentCanvas.width - 0.5) * 30 : 0;
      const parallaxOffsetY = mousePosition.y ? (mousePosition.y / currentCanvas.height - 0.5) * 30 : 0;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.radius) p.x = currentCanvas.width + p.radius;
        if (p.x > currentCanvas.width + p.radius) p.x = -p.radius;
        if (p.y < -p.radius) p.y = currentCanvas.height + p.radius;
        if (p.y > currentCanvas.height + p.radius) p.y = -p.radius;

        p.opacity += p.pulseDirection * p.pulseSpeed;
        if (p.opacity > p.baseOpacity + p.pulseAmplitude || p.opacity < p.baseOpacity - p.pulseAmplitude) {
          p.pulseDirection *= -1;
          p.opacity = Math.max(0.1, Math.min(1, p.opacity));
        }
        
        const currentX = p.x + parallaxOffsetX * p.z * 0.5;
        const currentY = p.y + parallaxOffsetY * p.z * 0.5;

        ctx.beginPath();
        ctx.arc(currentX, currentY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = getParticleColor(p.color, p.opacity);
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i];
          const p2 = particles[j];
          const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);

          if (dist < connectionDistance) {
            const opacity = (1 - dist / connectionDistance) * Math.min(p1.opacity, p2.opacity) * 0.5; 
            if (opacity > 0.05) { 
              ctx.beginPath();
              ctx.moveTo(p1.x + parallaxOffsetX * p1.z * 0.5, p1.y + parallaxOffsetY * p1.z * 0.5);
              ctx.lineTo(p2.x + parallaxOffsetX * p2.z * 0.5, p2.y + parallaxOffsetY * p2.z * 0.5);
              const lineColor = getParticleColor(themeColors.foreground, opacity * 0.7); 
              ctx.strokeStyle = lineColor;
              ctx.lineWidth = 0.5 + Math.min(p1.z, p2.z) * 0.5; 
              ctx.stroke();
            }
          }
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationFrameId);
      } else {
        // Check if canvas and context are still valid before restarting
        if (canvasRef.current && canvasRef.current.getContext('2d')) {
            animationFrameId = requestAnimationFrame(render);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    // Start rendering only if canvas is ready
    if (currentCanvas.width > 0 && currentCanvas.height > 0) {
        animationFrameId = requestAnimationFrame(render);
    }
    

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [particles, themeColors.foreground, connectionDistance, mousePosition, dimensions, getParticleColor]); // Added dimensions and getParticleColor

  return (
    <canvas
      ref={canvasRef}
      className={cn("fixed top-0 left-0 w-full h-full -z-10 pointer-events-none", className)}
    />
  );
};

export default CosmicBackground;

