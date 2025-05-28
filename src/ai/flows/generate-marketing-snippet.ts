
'use server';
/**
 * @fileOverview Generates marketing snippets for products/services.
 *
 * - generateMarketingSnippet - A function that generates marketing snippets.
 * - GenerateMarketingSnippetInput - The input type for the generateMarketingSnippet function.
 * - GenerateMarketingSnippetOutput - The return type for the generateMarketingSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { snippetTypes } from '@/lib/marketing-types';

const GenerateMarketingSnippetInputSchema = z.object({
  productName: z.string().min(2, "Product name must be at least 2 characters.").max(100).describe('The name of the product or service.'),
  productDescription: z.string().min(10, "Description must be at least 10 characters.").max(300).describe('A brief description of the product or service (1-2 sentences).'),
  snippetType: z.enum(snippetTypes).describe('The type of marketing snippet to generate.'),
});
export type GenerateMarketingSnippetInput = z.infer<typeof GenerateMarketingSnippetInputSchema>;

const GenerateMarketingSnippetOutputSchema = z.object({
  marketingSnippets: z.array(z.string()).describe('An array of 2-3 distinct marketing snippets.'),
});
export type GenerateMarketingSnippetOutput = z.infer<typeof GenerateMarketingSnippetOutputSchema>;

export type GenerateMarketingSnippetResult = GenerateMarketingSnippetOutput | { marketingSnippets: [], error: string };

export async function generateMarketingSnippet(input: GenerateMarketingSnippetInput): Promise<GenerateMarketingSnippetResult> {
  try {
    const output = await generateMarketingSnippetFlow(input);
     if (!output?.marketingSnippets) {
       return { marketingSnippets: [], error: "The AI model did not return valid marketing snippets." };
    }
    return output;
  } catch (e: any) {
    console.error(`Error in generateMarketingSnippet Genkit flow: ${e.message}`);
    return {
      marketingSnippets: [],
      error: e.message || "An unexpected error occurred while generating marketing snippets."
    };
  }
}

const prompt = ai.definePrompt({
  name: 'generateMarketingSnippetPrompt',
  input: {schema: GenerateMarketingSnippetInputSchema},
  output: {schema: GenerateMarketingSnippetOutputSchema},
  prompt: `You are a creative marketing assistant AI for small businesses.
Product/Service Name: {{{productName}}}
Description: {{{productDescription}}}

Generate 2-3 compelling "{{snippetType}}" snippets based on the product/service above.
Keep them concise, impactful, and suitable for a small to medium-sized business audience. Each snippet should be distinct.
For "Social Media Post (Short)", keep it under 280 characters.
For "Email Subject Line", make it engaging and likely to be opened.
For "Headline", make it attention-grabbing.
`,
});

const generateMarketingSnippetFlow = ai.defineFlow(
  {
    name: 'generateMarketingSnippetFlow',
    inputSchema: GenerateMarketingSnippetInputSchema,
    outputSchema: GenerateMarketingSnippetOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
