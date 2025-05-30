
import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface PlatformPillarCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
  visualizationType?: 'data-flow' | 'network' | 'pulse' | 'bar-chart-viz';
}

const PlatformPillarCard: React.FC<PlatformPillarCardProps> = ({
  icon: Icon,
  title,
  description,
  className,
  visualizationType = 'pulse',
}) => {
  return (
    <Card className={cn("overflow-hidden group transition-all duration-300 hover:shadow-xl hover:border-primary/50", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <Icon className="h-10 w-10 text-primary mb-3 group-hover:scale-110 transition-transform" />
          <div className="relative w-16 h-16 flex items-center justify-center" aria-hidden="true">
            {visualizationType === 'data-flow' && (
              <svg viewBox="0 0 50 50" className="w-full h-full opacity-70 group-hover:opacity-100 transition-opacity">
                <path d="M5 25 Q15 10 25 25 T45 25" stroke="hsl(var(--accent))" strokeWidth="2" fill="none" style={{ animation: 'pillar-data-flow-path 2.5s ease-in-out infinite alternate 0.5s' }} />
                <circle cx="5" cy="25" r="3" fill="hsl(var(--primary))" style={{ animation: 'pillar-node-pulse 2s ease-in-out infinite 0.3s' }}/>
              </svg>
            )}
            {visualizationType === 'network' && (
               <div className="w-full h-full flex items-center justify-center">
                <div className="w-3 h-3 bg-primary rounded-full relative" style={{ animation: 'pillar-node-pulse 2.2s ease-in-out infinite 0.5s' }}>
                  <div className="w-2 h-2 bg-accent rounded-full absolute -top-4 left-1/2 transform -translate-x-1/2" style={{ animation: 'pillar-node-pulse 2s ease-in-out infinite 0.7s' }}></div>
                  <div className="w-2 h-2 bg-accent rounded-full absolute top-1/2 -left-3 transform -translate-y-1/2" style={{ animation: 'pillar-node-pulse 2s ease-in-out infinite 0.9s' }}></div>
                </div>
               </div>
            )}
            {visualizationType === 'pulse' && (
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center group-hover:bg-accent/30 transition-colors" style={{ animation: 'pillar-concentric-pulse 2s ease-in-out infinite 0.5s' }}>
                <div className="w-6 h-6 rounded-full bg-accent/40" style={{ animation: 'pillar-concentric-pulse 2s ease-in-out infinite 0.7s reverse' }}></div>
              </div>
            )}
            {visualizationType === 'bar-chart-viz' && (
              <div className="w-12 h-12 flex items-end justify-around opacity-70 group-hover:opacity-100 transition-opacity" aria-label="Bar chart visualization">
                <div className="w-2 h-3 bg-primary rounded-t-sm" style={{ animation: 'pillar-bar-grow-reveal 0.6s ease-out forwards 0.5s', transformOrigin: 'bottom' }}></div>
                <div className="w-2 h-4 bg-accent rounded-t-sm" style={{ animation: 'pillar-bar-grow-reveal 0.6s ease-out forwards 0.7s', transformOrigin: 'bottom' }}></div>
                <div className="w-2 h-2 bg-primary/70 rounded-t-sm" style={{ animation: 'pillar-bar-grow-reveal 0.6s ease-out forwards 0.9s', transformOrigin: 'bottom' }}></div>
              </div>
            )}
          </div>
        </div>
        <CardTitle className="text-xl font-semibold group-hover:text-primary transition-colors">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-foreground/70 group-hover:text-foreground/90 transition-colors">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default PlatformPillarCard;

