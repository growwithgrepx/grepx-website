
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Megaphone, ClipboardCopy, Info } from "lucide-react";
import { generateMarketingSnippet, type GenerateMarketingSnippetInput, type GenerateMarketingSnippetResult } from "@/ai/flows/generate-marketing-snippet";
import { snippetTypes } from '@/lib/marketing-types';
import { useToast } from "@/hooks/use-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const formSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters.").max(100),
  productDescription: z.string().min(10, "Description must be at least 10 characters.").max(300),
  snippetType: z.enum(snippetTypes, { 
    errorMap: () => ({ message: "Please select a snippet type." }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function MarketingSnippetGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [snippets, setSnippets] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      productDescription: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true);
    setSnippets([]);
    
    const result: GenerateMarketingSnippetResult = await generateMarketingSnippet(data);
    
    setIsLoading(false);
    if (result.error) {
      console.error("Failed to generate marketing snippets:", result.error);
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
      setSnippets([]);
    } else {
      setSnippets(result.marketingSnippets);
      if (result.marketingSnippets.length === 0) {
        toast({
          title: "No snippets generated",
          description: "Try refining your product description or type.",
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
          <Label htmlFor="productName">Product/Service Name</Label>
          <Input
            id="productName"
            placeholder="e.g., Artisan Coffee Roasters"
            className="mt-1"
            {...form.register("productName")}
          />
          {form.formState.errors.productName && (
            <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.productName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="productDescription">Brief Description (1-2 sentences)</Label>
          <Textarea
            id="productDescription"
            placeholder="e.g., We source and roast specialty coffee beans, delivering fresh to your door."
            className="mt-1 min-h-[80px]"
            {...form.register("productDescription")}
          />
          {form.formState.errors.productDescription && (
            <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.productDescription.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="snippetType">Snippet Type</Label>
          <Select onValueChange={(value) => form.setValue("snippetType", value as FormValues["snippetType"])}>
            <SelectTrigger id="snippetType" className="w-full mt-1">
              <SelectValue placeholder="Choose snippet type..." />
            </SelectTrigger>
            <SelectContent>
              {snippetTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {form.formState.errors.snippetType && (
            <p className="text-sm font-medium text-destructive mt-1">{form.formState.errors.snippetType.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Megaphone className="mr-2 h-4 w-4" />
          )}
          Spark Marketing Ideas
        </Button>
      </form>

      <TooltipProvider>
        <div className="flex items-center text-xs text-muted-foreground">
          <Info className="h-3 w-3 mr-1"/> 
          AI-powered content ideas to boost your marketing.
        </div>
      </TooltipProvider>

      {snippets.length > 0 && (
        <div className="space-y-4 pt-4">
          <h3 className="text-lg font-semibold text-foreground">Generated Snippets:</h3>
          {snippets.map((snippet, index) => (
            <Card key={index} className="bg-background/70">
              <CardContent className="pt-6">
                <p className="text-sm whitespace-pre-wrap">{snippet}</p>
                <Button variant="outline" size="sm" onClick={() => handleCopy(snippet)} className="mt-3">
                  <ClipboardCopy className="mr-2 h-3 w-3" /> Copy Snippet
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
