
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Reply, ClipboardCopy, Info } from "lucide-react";
import { generateQuickReply, type GenerateQuickReplyInput, type GenerateQuickReplyResult } from "@/ai/flows/generate-quick-reply";
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  customerQuery: z.string().min(10, "Customer query must be at least 10 characters.").max(500, "Customer query must be less than 500 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export function QuickReplyAssistant() {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customerQuery: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setSuggestions([]);
    
    const result: GenerateQuickReplyResult = await generateQuickReply(data);
    
    setIsLoading(false);

    if (result.error) {
      console.error("Failed to generate quick replies:", result.error);
      toast({
        title: "Error",
        description: result.error, // Display the error message from the flow
        variant: "destructive",
      });
      setSuggestions([]);
    } else {
      // result is GenerateQuickReplyOutput here
      setSuggestions(result.replySuggestions);
      if (result.replySuggestions.length === 0) {
        toast({
          title: "No suggestions generated",
          description: "Try rephrasing the customer query.",
        });
      }
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard!" });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="customerQuery">Customer's Message</Label>
          <Textarea
            id="customerQuery"
            placeholder="Paste your customer's email or message here..."
            className="mt-1 min-h-[100px]"
            {...form.register("customerQuery")}
          />
          {form.formState.errors.customerQuery && (
            <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.customerQuery.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Reply className="mr-2 h-4 w-4" />
          )}
          Get Reply Suggestions
        </Button>
      </form>
      
      <TooltipProvider>
        <div className="flex items-center text-xs text-muted-foreground">
          <Info className="h-3 w-3 mr-1"/> 
          AI-generated suggestions to help you respond faster.
        </div>
      </TooltipProvider>


      {suggestions.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Suggested Replies:</h3>
          {suggestions.map((suggestion, index) => (
            <Card key={index} className="bg-background/70">
              <CardContent className="pt-6">
                <p className="text-sm whitespace-pre-wrap">{suggestion}</p>
                <Button variant="outline" size="sm" onClick={() => handleCopy(suggestion)} className="mt-3">
                  <ClipboardCopy className="mr-2 h-3 w-3" /> Copy Reply
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
