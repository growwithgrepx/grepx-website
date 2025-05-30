
'use server';
/**
 * @fileOverview An AI agent for intelligent document analysis.
 *
 * - analyzeDocument - A function that analyzes document content (text or image) and returns structured insights.
 * - DocumentAnalysisInput - The input type for the analyzeDocument function.
 * - DocumentAnalysisOutput - The return type for the analyzeDocument function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DocumentAnalysisInputSchema = z.object({
  textContent: z.string().optional().describe('The text content of the document. Provide this OR imageDataUri.'),
  imageDataUri: z.string().optional().describe("A data URI of an image of a document page. Expected format: 'data:<mimetype>;base64,<encoded_data>'. Provide this OR textContent."),
  analysisFocus: z.enum(['GENERAL_INSIGHTS', 'CONTRACT_SUMMARY', 'FINANCIAL_OVERVIEW'])
    .optional()
    .default('GENERAL_INSIGHTS')
    .describe('The specific focus of the document analysis (e.g., general summary, contract terms, financial data). This guides the AI on what to look for.'),
}).refine(data => data.textContent || data.imageDataUri, {
  message: "Either textContent or imageDataUri must be provided for analysis.",
  path: ["textContent"], // You can point to one of the fields or a general path
});
export type DocumentAnalysisInput = z.infer<typeof DocumentAnalysisInputSchema>;

const KeyDataPointSchema = z.object({
  label: z.string().describe('The identified category or type of the data point (e.g., "Effective Date", "Total Revenue", "Key Obligation", "Main Topic").'),
  value: z.string().describe('The extracted value or text for this data point.'),
  context: z.string().optional().describe('A brief snippet from the document where this data point was found, if identifiable and relevant.'),
});

const DocumentAnalysisOutputSchema = z.object({
  analysisFocus: z.enum(['GENERAL_INSIGHTS', 'CONTRACT_SUMMARY', 'FINANCIAL_OVERVIEW'])
    .describe('The analysis focus that was used for this result.'),
  documentTitleSuggestion: z.string().optional().describe('A concise, relevant title suggested for the document based on its content.'),
  overallSummary: z.string().describe('A comprehensive yet concise summary of the entire document content, tailored to the analysis focus.'),
  keyDataPoints: z.array(KeyDataPointSchema).describe('A list of 3-7 critical extracted key data points, facts, figures, or entities. The nature of these points will vary significantly based on the analysisFocus.'),
  actionableInsights: z.array(z.string()).min(1).max(5).describe('A list of 1 to 5 actionable insights, takeaways, or potential next steps derived from the document. These should be directly useful to the user.'),
  warningsOrFlags: z.array(z.string()).optional().describe('Any potential warnings, risks, discrepancies, or items needing special attention identified in the document. Particularly relevant for contract or financial analysis.'),
  categories: z.array(z.string()).optional().describe('A list of 2-3 suggested categories or tags for classifying the document.'),
});
export type DocumentAnalysisOutput = z.infer<typeof DocumentAnalysisOutputSchema>;

export async function analyzeDocument(
  input: DocumentAnalysisInput
): Promise<DocumentAnalysisOutput> {
  // Basic validation, though Zod handles most of it at schema level
  if (!input.textContent && !input.imageDataUri) {
    throw new Error("No document content provided. Please input text or upload an image.");
  }
  if (input.textContent && input.textContent.trim().length < 50 && !input.imageDataUri) {
    throw new Error(
      'Text content is too short for meaningful analysis (minimum 50 characters) unless an image is also provided.'
    );
  }
  return documentAnalysisFlow(input);
}

const prompt = ai.definePrompt({
  name: 'documentAnalysisPrompt',
  input: {schema: DocumentAnalysisInputSchema},
  output: {schema: DocumentAnalysisOutputSchema},
  prompt: `You are an expert AI assistant specializing in intelligent document analysis. Your task is to meticulously analyze the provided document content (which could be text or an image of a document page) and extract structured information according to the user's specified 'analysisFocus'.

The user has specified the analysis focus as: '{{{analysisFocus}}}'.

Document Content is provided below:
{{#if textContent}}
--- TEXT DOCUMENT CONTENT BEGIN ---
{{{textContent}}}
--- TEXT DOCUMENT CONTENT END ---
{{/if}}
{{#if imageDataUri}}
--- IMAGE DOCUMENT CONTENT BEGIN ---
{{media url=imageDataUri}}
--- IMAGE DOCUMENT CONTENT END ---
{{/if}}

Based on the '{{{analysisFocus}}}' and the document content, provide the following information strictly in the specified JSON output format:

1.  'analysisFocus': Echo back the '{{{analysisFocus}}}' value.
2.  'documentTitleSuggestion': If the content allows, suggest a concise and relevant title for the document (e.g., "Q3 Financial Report Analysis", "Software License Agreement Summary"). If not applicable or unclear, omit this field or provide a generic suggestion.
3.  'overallSummary': Write a comprehensive yet concise summary (3-5 sentences) of the document.
    *   For 'GENERAL_INSIGHTS': A general overview of the main topics and purpose.
    *   For 'CONTRACT_SUMMARY': Focus on the purpose of the contract, key parties, and main subject matter.
    *   For 'FINANCIAL_OVERVIEW': Summarize the financial health, key trends, or main financial message.
4.  'keyDataPoints': Extract 3-7 critical data points. These should be specific facts, figures, names, dates, or important terms.
    *   For 'GENERAL_INSIGHTS': Extract salient facts, topics, or entities. Label them appropriately (e.g., "Main Subject", "Mentioned Company", "Key Date").
    *   For 'CONTRACT_SUMMARY': Extract items like "Parties Involved", "Effective Date", "Termination Clause (Summary)", "Governing Law", "Key Obligations/Deliverables (Summarized)".
    *   For 'FINANCIAL_OVERVIEW': Extract items like "Total Revenue", "Net Profit/Loss", "Key Performance Indicator (KPI) 1", "KPI 2", "Reporting Period".
    *   For each data point, provide a 'label', 'value', and if possible, a brief 'context' (a few words from the source text indicating where it was found, if identifiable).
5.  'actionableInsights': List 1-5 actionable insights or takeaways. What should the user *do* or *understand* as a result of this analysis?
    *   For 'GENERAL_INSIGHTS': What are the main conclusions or things to note?
    *   For 'CONTRACT_SUMMARY': What are the critical actions, deadlines, or points of attention for the parties?
    *   For 'FINANCIAL_OVERVIEW': What are the strategic implications of the financial data?
6.  'warningsOrFlags': (Optional) Identify any potential warnings, risks, unusual clauses, discrepancies, or items that require special attention.
    *   For 'CONTRACT_SUMMARY': Ambiguous terms, non-standard clauses, critical deadlines approaching.
    *   For 'FINANCIAL_OVERVIEW': Significant drops in revenue, high debt ratios, concerning trends.
    *   For 'GENERAL_INSIGHTS': Potentially controversial statements, urgent calls to action within the text.
    If none, this can be an empty array or omitted.
7.  'categories': (Optional) Suggest 2-3 relevant categories or tags for classifying this document (e.g., "Legal", "Finance", "Report", "Agreement", "Marketing Material"). If none obvious, omit.

Ensure your response strictly adheres to the JSON schema for DocumentAnalysisOutput. Pay close attention to the types and constraints for each field.
If the document content is too short or unclear for a meaningful analysis for a specific field, state that clearly within the relevant field (e.g., "Content too brief for detailed financial KPIs") rather than omitting the field entirely if it's required by the schema, or provide an empty array for optional array fields.
Focus on clarity, accuracy, and relevance to the specified 'analysisFocus'.
`,
config: {
    // Higher temperature might be needed for more creative summarization/insight generation
    // but lower for strict data extraction. This is a balance.
    temperature: 0.4, 
     safetySettings: [ // Relax safety settings slightly if default is too restrictive for document content
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  }
});

const documentAnalysisFlow = ai.defineFlow(
  {
    name: 'documentAnalysisFlow',
    inputSchema: DocumentAnalysisInputSchema,
    outputSchema: DocumentAnalysisOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error('AI model did not return a valid response for document analysis.');
    }
    // Ensure the analysisFocus is part of the output, as per the prompt instructions
    // and the flow's input parameter.
    return { ...output, analysisFocus: input.analysisFocus || 'GENERAL_INSIGHTS' };
  }
);

