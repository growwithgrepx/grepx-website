
// src/app/actions.ts
'use server';

import { analyzeContentSafety, type ContentSafetyInput, type ContentSafetyOutput } from '@/ai/flows/content-safety-flow';
import { analyzeDocument, type DocumentAnalysisInput, type DocumentAnalysisOutput } from '@/ai/flows/document-analysis-flow';

export interface ContentSafetyResult {
  data?: ContentSafetyOutput;
  error?: string;
}

export async function analyzeContentSafetyAction(input: ContentSafetyInput): Promise<ContentSafetyResult> {
  try {
    const result = await analyzeContentSafety(input);
    return { data: result };
  } catch (error) {
    console.error("Error in analyzeContentSafetyAction:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "An unknown error occurred while analyzing content safety." };
  }
}

export interface DocumentAnalysisResult {
  data?: DocumentAnalysisOutput;
  error?: string;
}

export async function analyzeDocumentAction(input: DocumentAnalysisInput): Promise<DocumentAnalysisResult> {
  try {
    const result = await analyzeDocument(input);
    return { data: result };
  } catch (error) {
    console.error("Error in analyzeDocumentAction:", error);
    if (error instanceof Error) {
      // Provide more specific error messages if possible
      if (error.message.includes("minimum 50 characters") || error.message.includes("No document content provided")) {
         return { error: error.message };
      }
      return { error: `Document analysis failed: ${error.message}` };
    }
    return { error: "An unknown error occurred while analyzing the document." };
  }
}
