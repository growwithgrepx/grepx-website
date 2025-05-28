"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lightbulb } from "lucide-react";
import { generateAiUseCaseIdeas, type GenerateAiUseCaseIdeasInput, type GenerateAiUseCaseIdeasResult } from "@/ai/flows/generate-ai-use-case-ideas";
import { useToast } from "@/hooks/use-toast";

const industries = ["Retail", "Logistics", "Energy", "Finance", "Healthcare", "Manufacturing", "Education", "Real Estate", "Entertainment"] as const;

const formSchema = z.object({
  industry: z.enum(industries, {
    errorMap: () => ({ message: "Please select an industry." }),
  }),
  businessChallenge: z.string().min(5, "Challenge must be at least 5 characters.").max(200, "Challenge must be less than 200 characters.").optional().or(z.literal('')),
});

type SparkerFormValues = z.infer<typeof formSchema>;

export function AiUseCaseSparker() {
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<SparkerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      businessChallenge: "",
    },
  });

  const onSubmit = async (data: SparkerFormValues) => {
    setIsLoading(true);
    setIdeas([]);
    
    const input: GenerateAiUseCaseIdeasInput = {
      industry: data.industry,
      businessChallenge: data.businessChallenge || "general improvement",
    };
    const result: GenerateAiUseCaseIdeasResult = await generateAiUseCaseIdeas(input);
    
    setIsLoading(false);
    if (result.error) {
      console.error("Failed to generate AI use case ideas:", result.error);
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      setIdeas([]);
    } else {
      setIdeas(result.ideas);
      if (result.ideas.length === 0) {
        toast({
          title: "No specific ideas generated",
          description: "Try refining your challenge or selecting a different industry.",
        });
      }
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="industry">Select Industry</Label>
          <Select onValueChange={(value) => form.setValue("industry", value as typeof industries[number])} >
            <SelectTrigger id="industry" className="w-full mt-1">
              <SelectValue placeholder="Choose an industry..." />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.industry && (
            <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.industry.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="businessChallenge">Business Challenge (Optional)</Label>
          <Input
            id="businessChallenge"
            placeholder="e.g., reduce customer churn"
            className="mt-1"
            {...form.register("businessChallenge")}
          />
           {form.formState.errors.businessChallenge && (
            <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.businessChallenge.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Lightbulb className="mr-2 h-4 w-4" />
          )}
          Spark Ideas
        </Button>
      </form>

      {ideas.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Generated AI Use Case Ideas:</h3>
          {ideas.map((idea, index) => (
            <Card key={index} className="bg-background/70">
              <CardContent className="pt-6">
                <p className="text-sm">{idea}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
