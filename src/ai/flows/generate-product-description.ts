'use server';

/**
 * @fileOverview A flow for generating product descriptions.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productFeatures: z.string().describe('Key features or details about the product.'),
  tone: z.string().describe('The desired tone for the description.'),
  includeEmojis: z.boolean().describe('Whether to include emojis.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(input: GenerateProductDescriptionInput): Promise<GenerateProductDescriptionOutput> {
  return generateProductDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateProductDescriptionPrompt',
  input: {schema: GenerateProductDescriptionInputSchema},
  output: {schema: GenerateProductDescriptionOutputSchema},
  prompt: `You are a world-class e-commerce copywriter known for writing product descriptions that sell.

Your task is to generate **3 unique product description options** based on the details provided.

**Product Details:**
*   **Name:** {{{productName}}}
*   **Features/Description:** {{{productFeatures}}}

**Style Guidelines:**
*   **Tone:** Your tone should be: **{{{tone}}}**.
*   **Emojis:** {{#if includeEmojis}}Weave in relevant emojis to make the description more engaging.{{else}}Do not use any emojis.{{/if}}

Focus on benefits over features. Paint a picture for the customer and make them feel like they need this product.

Format your response as a single block of text. Present the 3 descriptions as a numbered list, separated by a blank line.
  `,
});

const generateProductDescriptionFlow = ai.defineFlow(
  {
    name: 'generateProductDescriptionFlow',
    inputSchema: GenerateProductDescriptionInputSchema,
    outputSchema: GenerateProductDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
