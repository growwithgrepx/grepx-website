// src/ai/flows/content-safety-flow.ts
'use server';
/**
 * @fileOverview An AI agent that analyzes text for safety concerns, including various biases.
 *
 * - analyzeContentSafety - A function that analyzes text and returns a safety assessment.
 * - ContentSafetyInput - The input type for the analyzeContentSafety function.
 * - ContentSafetyOutput - The return type for the analyzeContentSafety function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ContentSafetyInputSchema = z.object({
  text: z.string().describe('The text content to be analyzed for safety.'),
});
export type ContentSafetyInput = z.infer<typeof ContentSafetyInputSchema>;

const SafetyIssueSchema = z.object({
  category: z.string().describe('The category of the safety issue (e.g., Hate Speech, Harassment, Gender Bias).'),
  description: z.string().describe('A brief description of the identified issue.'),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH']).describe('The severity of the issue.'),
});

const ContentSafetyOutputSchema = z.object({
  overallSafetyStatus: z.enum(['SAFE', 'POTENTIALLY_UNSAFE', 'UNSAFE'])
    .describe('The overall safety status of the content.'),
  issues: z.array(SafetyIssueSchema).describe('A list of identified safety issues. Empty if no issues are found.'),
  summary: z.string().describe('A concise summary of the safety analysis findings.'),
});
export type ContentSafetyOutput = z.infer<typeof ContentSafetyOutputSchema>;

export async function analyzeContentSafety(
  input: ContentSafetyInput
): Promise<ContentSafetyOutput> {
  return contentSafetyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contentSafetyPrompt',
  input: {schema: ContentSafetyInputSchema},
  output: {schema: ContentSafetyOutputSchema},
  prompt: `You are an AI assistant specialized in content safety analysis. Your task is to analyze the provided text for potential safety violations.

Categories to consider for safety violations include (but are not limited to):
- Hate Speech
- Harassment
- Dangerous Content (e.g., promotion of illegal acts, self-harm)
- Sexually Explicit Content
- Misinformation/Disinformation (evaluate potential for harm)
- Violence (e.g., graphic descriptions, incitement)
- Gender Bias (e.g., statements that stereotype, demean, or discriminate based on gender; promote unequal treatment or opportunities)
- Age Bias (e.g., statements that stereotype, demean, or discriminate based on age; promote unfair assumptions about capabilities due to age)
- Race Bias (e.g., statements that stereotype, demean, or discriminate based on race or ethnicity; promote harmful generalizations)

For the given text:
1.  Identify any specific safety issues. For each issue, provide:
    *   'category': The relevant safety category (e.g., "Gender Bias", "Hate Speech").
    *   'description': A brief, neutral description of why it's an issue, explaining how it fits the category.
    *   'severity': Classify the severity as LOW, MEDIUM, or HIGH. Consider the explicitness, potential impact, and context. Subtle biases might be LOW or MEDIUM.
2.  Determine the 'overallSafetyStatus':
    *   'SAFE': If no significant issues are found or issues are very minor (LOW severity and limited scope).
    *   'POTENTIALLY_UNSAFE': If there are MEDIUM severity issues, multiple LOW severity issues, or subtle but clear instances of bias that warrant caution.
    *   'UNSAFE': If there are HIGH severity issues or a clear and explicit violation of safety guidelines, including overt and harmful biases.
3.  Provide a 'summary': A brief (1-2 sentences) overall assessment of the content's safety, highlighting any detected biases if present.

Analyze the following text:
---
{{{text}}}
---
`,
});

const contentSafetyFlow = ai.defineFlow(
  {
    name: 'contentSafetyFlow',
    inputSchema: ContentSafetyInputSchema,
    outputSchema: ContentSafetyOutputSchema,
  },
  async input => {
    if (!input.text || input.text.trim().length === 0) {
      return {
        overallSafetyStatus: 'SAFE',
        issues: [],
        summary: 'No text provided for analysis.',
      };
    }
    if (input.text.trim().length < 10) { 
        return {
            overallSafetyStatus: 'SAFE',
            issues: [],
            summary: 'Text is too short for a meaningful safety analysis.',
        };
    }

    const {output} = await prompt(input);
    
    if (!output) {
        throw new Error('AI model did not return a valid response for content safety analysis.');
    }
    
    return output;
  }
);
