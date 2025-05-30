
// src/components/sections/content-safety-analyzer.tsx
"use client";

import React, { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Loader2, ShieldAlert, ShieldCheck, ShieldQuestion, ShieldX, Sparkles, XCircle } from 'lucide-react';
import { analyzeContentSafetyAction, type ContentSafetyResult } from '@/app/actions';
import AnimatedContent from '@/components/shared/animated-content';
import { useToast } from '@/hooks/use-toast';
import type { ContentSafetyOutput } from '@/ai/flows/content-safety-flow';

const getStatusBadgeVariant = (status?: ContentSafetyOutput['overallSafetyStatus']) => {
  switch (status) {
    case 'SAFE':
      return 'default'; 
    case 'POTENTIALLY_UNSAFE':
      return 'secondary'; 
    case 'UNSAFE':
      return 'destructive';
    default:
      return 'outline';
  }
};

const getStatusIcon = (status?: ContentSafetyOutput['overallSafetyStatus']) => {
  switch (status) {
    case 'SAFE':
      return <ShieldCheck className="mr-2 h-5 w-5 text-green-500" />;
    case 'POTENTIALLY_UNSAFE':
      return <ShieldAlert className="mr-2 h-5 w-5 text-yellow-500" />;
    case 'UNSAFE':
      return <ShieldX className="mr-2 h-5 w-5 text-red-500" />;
    default:
      return <ShieldQuestion className="mr-2 h-5 w-5 text-muted-foreground" />;
  }
};

const getSeverityBadgeVariant = (severity: 'LOW' | 'MEDIUM' | 'HIGH') => {
  switch (severity) {
    case 'LOW':
      return 'default';
    case 'MEDIUM':
      return 'secondary';
    case 'HIGH':
      return 'destructive';
    default:
      return 'outline';
  }
};

const sampleTexts = [
  { label: "Positive Feedback", text: "Our team achieved all its goals this quarter. This new product is amazing, and the customer support was fantastic!" },
  { label: "Mild Complaint", text: "I am quite disappointed with the recent changes to the service. The previous version was much better and easier to use." },
  { label: "Neutral Statement", text: "The event is scheduled to start at 3 PM tomorrow in the main hall. Please ensure you arrive on time." },
  { label: "Slightly Edgy", text: "This whole situation is a complete mess. Someone needs to take responsibility for this disaster." },
  { label: "Gender Bias Example", text: "For the receptionist role, we should prioritize hiring a woman, as they are naturally more welcoming and organized." },
  { label: "Age Bias Example", text: "We need dynamic, energetic people for this project; older candidates might not keep up with the pace." },
  { label: "Race Bias Example", text: "Let's be cautious about applicants from that specific city; they tend to have a different work ethic." },
];

export default function ContentSafetyAnalyzerSection() {
  const [textContent, setTextContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<ContentSafetyResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleClearText = () => {
    setTextContent('');
    setAnalysisResult(null);
  };

  const handleSampleClick = (sampleText: string) => {
    setTextContent(sampleText);
    setAnalysisResult(null); 
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!textContent.trim()) {
      toast({
        title: "Input Required",
        description: "Please provide some text to analyze or select an example.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      setAnalysisResult(null); 
      const result = await analyzeContentSafetyAction({ text: textContent });
      setAnalysisResult(result);
      if (result.error) {
        toast({
          title: "Analysis Error",
          description: result.error,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <section id="content-safety" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
        {/* The main title and description for this page are now in /src/app/experience-ai/content-safety/page.tsx */}
        
        <Card className="max-w-3xl mx-auto shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="text-left">
              <div className="flex justify-between items-center">
                <CardTitle>Analyze Text Content</CardTitle>
                {textContent && !isPending && (
                  <Button variant="ghost" size="sm" onClick={handleClearText} className="text-xs h-auto p-1 text-muted-foreground hover:text-destructive">
                    <XCircle className="mr-1 h-3 w-3" /> Clear Text
                  </Button>
                )}
              </div>
              <CardDescription>
                Enter any text below, or try an example, to see how our AI analyzes it for common safety issues like hate speech, harassment, bias, and more.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-left">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Try an example:</Label>
                <div className="flex flex-wrap gap-2">
                  {sampleTexts.map((sample, index) => (
                    <Button
                      key={index}
                      type="button" 
                      variant="outline"
                      size="sm"
                      onClick={() => handleSampleClick(sample.text)}
                      disabled={isPending}
                      className="text-xs h-auto py-1.5 px-2.5"
                    >
                      {sample.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="textContent" className="sr-only">Text Content</Label>
                <Textarea
                  id="textContent"
                  placeholder="Paste or type your text here..."
                  value={textContent}
                  onChange={(e) => {
                    setTextContent(e.target.value);
                    if(analysisResult) setAnalysisResult(null); 
                  }}
                  rows={8}
                  className="focus:ring-primary focus:border-primary text-sm"
                  disabled={isPending}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full group" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                )}
                Analyze Content
              </Button>
            </CardFooter>
          </form>
        </Card>

        {isPending && (
          <AnimatedContent animationType="fadeInUp" className="mt-8 text-center">
             <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
             <p className="text-muted-foreground mt-2">Analyzing content...</p>
          </AnimatedContent>
        )}

        {analysisResult && !isPending && (
          <AnimatedContent animationType="fadeInUp" className="mt-8">
            <Card className="max-w-3xl mx-auto shadow-md text-left">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {getStatusIcon(analysisResult.data?.overallSafetyStatus)}
                  AI Safety Analysis Result
                </CardTitle>
                {analysisResult.data && (
                   <Badge variant={getStatusBadgeVariant(analysisResult.data.overallSafetyStatus)} className="w-fit">
                     {analysisResult.data.overallSafetyStatus || 'N/A'}
                   </Badge>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisResult.error ? (
                  <p className="text-destructive flex items-center"><ShieldAlert className="mr-2 h-5 w-5" /> {analysisResult.error}</p>
                ) : analysisResult.data ? (
                  <>
                    <div>
                      <h4 className="font-semibold text-md mb-2">Summary:</h4>
                      <p className="text-foreground/90 bg-muted p-3 rounded-md text-sm">{analysisResult.data.summary}</p>
                    </div>
                    {analysisResult.data.issues && analysisResult.data.issues.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-md mb-3">Detected Issues:</h4>
                        <div className="space-y-4">
                          {analysisResult.data.issues.map((issue, index) => (
                            <div key={index} className="p-3 border rounded-md bg-muted/50">
                              <div className="flex justify-between items-start mb-1">
                                <h5 className="font-medium text-foreground">{issue.category}</h5>
                                <Badge variant={getSeverityBadgeVariant(issue.severity)} size="sm">{issue.severity}</Badge>
                              </div>
                              <p className="text-sm text-foreground/80">{issue.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    {analysisResult.data.issues && analysisResult.data.issues.length === 0 && (
                       <p className="text-sm text-green-600 flex items-center"><ShieldCheck className="mr-2 h-5 w-5" /> No specific issues detected. Content appears safe based on the analysis.</p>
                    )}
                  </>
                ) : (
                   <p className="text-muted-foreground">No analysis data available. Please try again.</p>
                )}
              </CardContent>
            </Card>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
