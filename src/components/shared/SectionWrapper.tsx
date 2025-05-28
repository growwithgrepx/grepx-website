
import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface SectionWrapperProps extends HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function SectionWrapper({ children, className, id, ...props }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn("py-10 md:py-12 lg:py-16", className)} // Reduced padding
      {...props}
    >
      {children}
    </section>
  );
}
