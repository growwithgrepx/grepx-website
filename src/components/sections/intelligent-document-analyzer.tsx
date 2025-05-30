
"use client";

import React, { useState, useTransition, ChangeEvent, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Sparkles, AlertTriangle, FileText, ImageIcon, BookOpen, Briefcase, BarChartBig, Info, XCircle } from 'lucide-react';
import { analyzeDocumentAction, type DocumentAnalysisResult } from '@/app/actions';
import type { DocumentAnalysisInput, DocumentAnalysisOutput } from '@/ai/flows/document-analysis-flow';
import AnimatedContent from '@/components/shared/animated-content';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function IntelligentDocumentAnalyzerSection() {
  const [textContent, setTextContent] = useState<string>('');
  const [imageDataUri, setImageDataUri] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [analysisFocus, setAnalysisFocus] = useState<DocumentAnalysisInput['analysisFocus']>('GENERAL_INSIGHTS');
  
  const [analysisResult, setAnalysisResult] = useState<DocumentAnalysisResult | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file (e.g., PNG, JPG). For text documents, paste content directly.",
          variant: "destructive",
        });
        setFileName('');
        setImageDataUri(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = ''; // Reset file input
        }
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUri(reader.result as string);
        setTextContent(''); // Clear text content if image is uploaded
      };
      reader.readAsDataURL(file);
    } else {
      handleClearFile();
    }
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setTextContent(event.target.value);
    if (event.target.value) {
      handleClearFile(false); 
    }
  };

  const handleClearText = () => {
    setTextContent('');
  };

  const handleClearFile = (resetInput = true) => {
    setImageDataUri(null);
    setFileName('');
    if (resetInput && fileInputRef.current) {
      fileInputRef.current.value = ''; 
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!textContent.trim() && !imageDataUri) {
      toast({
        title: "Input Required",
        description: "Please provide document text or upload an image.",
        variant: "destructive",
      });
      return;
    }

    startTransition(async () => {
      setAnalysisResult(null);
      const input: DocumentAnalysisInput = { analysisFocus };
      if (textContent.trim()) {
        input.textContent = textContent;
      } else if (imageDataUri) {
        input.imageDataUri = imageDataUri;
      }

      const result = await analyzeDocumentAction(input);
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

  const renderAnalysisFocusIcon = (focus: DocumentAnalysisInput['analysisFocus']) => {
    switch (focus) {
      case 'CONTRACT_SUMMARY': return <FileText className="mr-2 h-5 w-5 text-primary/80" />;
      case 'FINANCIAL_OVERVIEW': return <BarChartBig className="mr-2 h-5 w-5 text-primary/80" />;
      case 'GENERAL_INSIGHTS':
      default:
        return <BookOpen className="mr-2 h-5 w-5 text-primary/80" />;
    }
  }

  return (
    <section id="document-analyzer" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-4">
         {/* The main title and description for this page are now in /src/app/experience-ai/document-analyzer/page.tsx */}
         <p className="mt-2 max-w-3xl mx-auto text-sm text-muted-foreground text-center mb-8">
            <Info className="inline h-4 w-4 mr-1" />
            For complex documents like PDFs or Word files, pasting text content or using clear images of pages yields the best results. Direct PDF/Word/Excel file parsing is a future enhancement.
          </p>

        <Card className="max-w-3xl mx-auto shadow-lg">
          <form onSubmit={handleSubmit}>
            <CardHeader className="text-left">
              <CardTitle>Analyze Your Document</CardTitle>
              <CardDescription>
                Provide document content via text paste or image upload, select an analysis focus, and let our AI do the work.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-left">
              <div className="grid w-full gap-1.5">
                <div className="flex justify-between items-center mb-1">
                  <Label htmlFor="textContent">Paste Document Text</Label>
                  {textContent && !isPending && (
                    <Button variant="ghost" size="sm" onClick={handleClearText} className="text-xs h-auto p-1 text-muted-foreground hover:text-destructive">
                      <XCircle className="mr-1 h-3 w-3" /> Clear Text
                    </Button>
                  )}
                </div>
                <Textarea
                  id="textContent"
                  placeholder="Paste content from your document here..."
                  value={textContent}
                  onChange={handleTextChange}
                  rows={10}
                  className="focus:ring-primary focus:border-primary"
                  disabled={isPending || !!imageDataUri}
                />
              </div>
              
              <div className="text-center my-2 text-sm text-muted-foreground">OR</div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="imageUpload">Upload Document Image</Label>
                <div className="flex items-center gap-2">
                    <Input
                        id="imageUpload"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="flex-grow focus:ring-primary focus:border-primary"
                        disabled={isPending || !!textContent.trim()}
                        ref={fileInputRef}
                    />
                    {imageDataUri && !isPending && (
                        <Button variant="ghost" size="sm" onClick={() => handleClearFile(true)} className="text-xs h-auto p-1 text-muted-foreground hover:text-destructive">
                           <XCircle className="mr-1 h-3 w-3" /> Clear File
                        </Button>
                    )}
                </div>
                {fileName && <p className="text-sm text-muted-foreground mt-1">Selected file: {fileName}</p>}
              </div>

              <div className="grid w-full gap-1.5">
                <Label htmlFor="analysisFocus">Analysis Focus</Label>
                <Select
                  value={analysisFocus}
                  onValueChange={(value: DocumentAnalysisInput['analysisFocus']) => setAnalysisFocus(value)}
                  disabled={isPending}
                >
                  <SelectTrigger id="analysisFocus" className="w-full">
                    <SelectValue placeholder="Select analysis focus" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GENERAL_INSIGHTS">General Insights & Summary</SelectItem>
                    <SelectItem value="CONTRACT_SUMMARY">Contract Analysis</SelectItem>
                    <SelectItem value="FINANCIAL_OVERVIEW">Financial Overview</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full group" disabled={isPending}>
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4 group-hover:animate-pulse" />
                )}
                Analyze Document
              </Button>
            </CardFooter>
          </form>
        </Card>

        {isPending && (
          <AnimatedContent animationType="fadeInUp" className="mt-8 text-center">
             <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
             <p className="text-muted-foreground mt-2">Analyzing document, this may take a moment...</p>
          </AnimatedContent>
        )}

        {analysisResult && !isPending && (
          <AnimatedContent animationType="fadeInUp" className="mt-8">
            <Card className="max-w-3xl mx-auto shadow-md text-left">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {analysisResult.error ? (
                    <AlertTriangle className="mr-2 h-5 w-5 text-destructive" />
                  ) : (
                    renderAnalysisFocusIcon(analysisResult.data?.analysisFocus || analysisFocus)
                  )}
                  Document Analysis Results
                </CardTitle>
                {analysisResult.data?.documentTitleSuggestion && (
                  <CardDescription>Suggested Title: {analysisResult.data.documentTitleSuggestion}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="space-y-6">
                {analysisResult.error ? (
                  <p className="text-destructive">{analysisResult.error}</p>
                ) : analysisResult.data ? (
                  <Accordion type="multiple" defaultValue={['summary', 'keyDataPoints']} className="w-full">
                    {analysisResult.data.overallSummary && (
                      <AccordionItem value="summary">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                           <div className="flex items-center">
                            <BookOpen className="mr-2 h-5 w-5 text-primary/80" /> Overall Summary
                           </div>
                        </AccordionTrigger>
                        <AccordionContent className="prose prose-sm max-w-none text-foreground/90 pt-2">
                          {analysisResult.data.overallSummary}
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {analysisResult.data.keyDataPoints && analysisResult.data.keyDataPoints.length > 0 && (
                      <AccordionItem value="keyDataPoints">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                          <div className="flex items-center">
                            <Briefcase className="mr-2 h-5 w-5 text-primary/80" /> Key Data Points
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2 space-y-3">
                          {analysisResult.data.keyDataPoints.map((point, index) => (
                            <div key={index} className="p-3 border rounded-md bg-muted/50">
                              <p className="font-semibold text-foreground">{point.label}</p>
                              <p className="text-sm text-foreground/80">{point.value}</p>
                              {point.context && <p className="text-xs text-muted-foreground mt-1 italic">Context: "{point.context}"</p>}
                            </div>
                          ))}
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {analysisResult.data.actionableInsights && analysisResult.data.actionableInsights.length > 0 && (
                       <AccordionItem value="actionableInsights">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                          <div className="flex items-center">
                            <Sparkles className="mr-2 h-5 w-5 text-primary/80" /> Actionable Insights
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <ul className="list-disc list-outside space-y-2 pl-5 text-foreground/90">
                            {analysisResult.data.actionableInsights.map((insight, index) => (
                              <li key={index} className="prose prose-sm max-w-none">{insight}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}
                    
                    {analysisResult.data.warningsOrFlags && analysisResult.data.warningsOrFlags.length > 0 && (
                       <AccordionItem value="warningsOrFlags">
                        <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                          <div className="flex items-center">
                           <AlertTriangle className="mr-2 h-5 w-5 text-destructive/80" /> Warnings & Flags
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-2">
                          <ul className="list-disc list-outside space-y-2 pl-5 text-destructive/90">
                            {analysisResult.data.warningsOrFlags.map((warning, index) => (
                              <li key={index} className="prose prose-sm max-w-none">{warning}</li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    )}

                    {analysisResult.data.categories && analysisResult.data.categories.length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-md mb-2 flex items-center">
                          Suggested Categories:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {analysisResult.data.categories.map((category, index) => (
                            <Badge key={index} variant="secondary" className="text-sm">{category}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </Accordion>
                ) : (
                   <p className="text-muted-foreground">No results available.</p>
                )}
              </CardContent>
            </Card>
          </AnimatedContent>
        )}
      </div>
    </section>
  );
}
