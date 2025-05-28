
'use server';
/**
 * @fileOverview Generates quick reply suggestions for customer messages.
 *
 * - generateQuickReply - A function that generates reply suggestions.
 * - GenerateQuickReplyInput - The input type for the generateQuickReply function.
 * - GenerateQuickReplyOutput - The return type for the generateQuickReply function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuickReplyInputSchema = z.object({
  customerQuery: z.string().min(10, "Customer query must be at least 10 characters.").max(500, "Customer query must be less than 500 characters.").describe('The customer message to reply to.'),
});
export type GenerateQuickReplyInput = z.infer<typeof GenerateQuickReplyInputSchema>;

const GenerateQuickReplyOutputSchema = z.object({
  replySuggestions: z.array(z.string()).describe('An array of 2-3 distinct, professional reply suggestions.'),
});
export type GenerateQuickReplyOutput = z.infer<typeof GenerateQuickReplyOutputSchema>;

export type GenerateQuickReplyResult = GenerateQuickReplyOutput | { replySuggestions: [], error: string };

export async function generateQuickReply(input: GenerateQuickReplyInput): Promise<GenerateQuickReplyResult> {
  try {
    const output = await generateQuickReplyFlow(input);
     if (!output?.replySuggestions) {
       return { replySuggestions: [], error: "The AI model did not return valid reply suggestions." };
    }
    return output;
  } catch (e: any) {
    console.error(`Error in generateQuickReply Genkit flow: ${e.message}`);
    // For a 503 or other Google API errors, e.message will contain the relevant info.
    return {
      replySuggestions: [],
      error: e.message || "An unexpected error occurred while generating replies."
    };
  }
}

const prompt = ai.definePrompt({
  name: 'generateQuickReplyPrompt',
  input: {schema: GenerateQuickReplyInputSchema},
  output: {schema: GenerateQuickReplyOutputSchema},
  prompt: `You are a helpful AI assistant for a small business owner.
A customer sent the following message:
"{{{customerQuery}}}"

Generate 2-3 concise, professional, and empathetic reply suggestions. Each suggestion should be distinct and ready to use.
Focus on helpfulness and politeness. Keep the replies relatively short.
`,
});

const generateQuickReplyFlow = ai.defineFlow(
  {
    name: 'generateQuickReplyFlow',
    inputSchema: GenerateQuickReplyInputSchema,
    outputSchema: GenerateQuickReplyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
