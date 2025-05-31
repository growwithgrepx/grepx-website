
import Link from 'next/link';
import { BarChartBig } from 'lucide-react'; 
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2 text-2xl font-bold group", className)}>
      <BarChartBig className="h-8 w-8 text-primary group-hover:text-accent transition-colors duration-300" />
      <span className="text-shimmer"> {/* Added text-shimmer class here */}
        <span className="bg-gradient-to-r from-[hsl(var(--primary))] to-[hsl(var(--accent))] bg-clip-text text-transparent group-hover:opacity-80 transition-opacity duration-300">
          GrepX
        </span>
      </span>
    </Link>
  );
}
