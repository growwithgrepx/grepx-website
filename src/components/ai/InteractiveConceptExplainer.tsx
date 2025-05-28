"use client";

import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { explainAiConcept, type ExplainAiConceptInput, type ExplainAiConceptResult } from "@/ai/flows/explain-ai-concept";
import { Loader2, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface InteractiveConceptExplainerProps {
  term: string;
  children: ReactNode; // This will be the button or link text
}

export function InteractiveConceptExplainer({ term, children }: InteractiveConceptExplainerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [explanation, setExplanation] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleExplainConcept = async () => {
    if (!term) return;
    setIsLoading(true);
    setExplanation(null);
    
    const input: ExplainAiConceptInput = { concept: term };
    const result: ExplainAiConceptResult = await explainAiConcept(input);

    setIsLoading(false);
    if (result.error) {
      console.error("Failed to explain AI concept:", result.error);
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      setExplanation("Sorry, I couldn't fetch an explanation for this concept right now.");
    } else if (result.explanation) {
      setExplanation(result.explanation);
    } else {
      // Should not happen if error handling is correct, but as a fallback
      setExplanation("Sorry, an unexpected issue occurred.");
       toast({
        title: "Notice",
        description: "No explanation was available for this term.",
        variant: "default",
      });
    }
  };

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open && !explanation && !isLoading) {
      handleExplainConcept();
    }
    if (!open) {
      setExplanation(null); 
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <Sparkles className="h-5 w-5 mr-2 text-primary" />
            Explaining: {term}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {isLoading && (
            <div className="flex items-center justify-center min-h-[100px]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2 text-muted-foreground">Generating explanation...</p>
            </div>
          )}
          {explanation && !isLoading && (
            <DialogDescription className="text-base text-foreground whitespace-pre-wrap">
              {explanation}
            </DialogDescription>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
