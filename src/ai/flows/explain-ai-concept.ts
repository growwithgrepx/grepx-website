'use server';
/**
 * @fileOverview Explains an AI concept to the user.
 *
 * - explainAiConcept - A function that explains an AI concept.
 * - ExplainAiConceptInput - The input type for the explainAiConcept function.
 * - ExplainAiConceptOutput - The return type for the explainAiConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainAiConceptInputSchema = z.object({
  concept: z.string().describe('The AI concept to explain.'),
});
export type ExplainAiConceptInput = z.infer<typeof ExplainAiConceptInputSchema>;

const ExplainAiConceptOutputSchema = z.object({
  explanation: z.string().describe('A concise explanation of the AI concept.'),
});
export type ExplainAiConceptOutput = z.infer<typeof ExplainAiConceptOutputSchema>;

export type ExplainAiConceptResult = ExplainAiConceptOutput | { explanation: null; error: string };

export async function explainAiConcept(input: ExplainAiConceptInput): Promise<ExplainAiConceptResult> {
  try {
    const output = await explainAiConceptFlow(input);
    if (!output?.explanation) {
      return { explanation: null, error: "The AI model did not return a valid explanation." };
    }
    return output;
  } catch (e: any) {
    console.error(`Error in explainAiConcept Genkit flow: ${e.message}`);
    return {
      explanation: null,
      error: e.message || "An unexpected error occurred while explaining the AI concept."
    };
  }
}

const prompt = ai.definePrompt({
  name: 'explainAiConceptPrompt',
  input: {schema: ExplainAiConceptInputSchema},
  output: {schema: ExplainAiConceptOutputSchema},
  prompt: `You are an AI expert. Explain the following AI concept in a concise and easy-to-understand way:\n\n{{concept}}`,
});

const explainAiConceptFlow = ai.defineFlow(
  {
    name: 'explainAiConceptFlow',
    inputSchema: ExplainAiConceptInputSchema,
    outputSchema: ExplainAiConceptOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);