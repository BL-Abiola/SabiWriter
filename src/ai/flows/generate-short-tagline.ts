'use server';

/**
 * @fileOverview Generates a short, catchy tagline for a business.
 *
 * - generateShortTagline - A function that generates a short tagline.
 * - GenerateShortTaglineInput - The input type for the generateShortTagline function.
 * - GenerateShortTaglineOutput - The return type for the generateShortTagline function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateShortTaglineInputSchema = z.object({
  businessDescription: z
    .string()
    .describe('A brief description of the business or product.'),
  tone: z
    .string()
    .describe('The desired tone for the tagline.'),
  includeEmojis: z
    .boolean()
    .default(true)
    .describe('Whether to include relevant emojis.'),
});
export type GenerateShortTaglineInput = z.infer<typeof GenerateShortTaglineInputSchema>;

const GenerateShortTaglineOutputSchema = z.object({
  tagline: z
    .string()
    .describe(
      'A catchy and memorable tagline of 3-7 words that encapsulates the business\'s essence.'
    ),
});
export type GenerateShortTaglineOutput = z.infer<typeof GenerateShortTaglineOutputSchema>;

export async function generateShortTagline(
  input: GenerateShortTaglineInput
): Promise<GenerateShortTaglineOutput> {
  return generateShortTaglineFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateShortTaglinePrompt',
  input: {schema: GenerateShortTaglineInputSchema},
  output: {schema: GenerateShortTaglineOutputSchema},
  prompt: `You are a world-class marketing expert specializing in creating short, unforgettable taglines.

Your task is to generate **3 unique tagline options** based on the business description provided. Each tagline should be catchy, memorable, and between 3-7 words.

**Business Description:**
{{{businessDescription}}}

**Style Guidelines:**
*   **Tone:** Your tone should be: **{{{tone}}}**.
*   **Emojis:** {{#if includeEmojis}}If it fits, you can add a single, powerful emoji at the end.{{else}}Do not include any emojis.{{/if}}

The tagline should perfectly encapsulate the business's essence.

Format your response as a single block of text. Present the 3 taglines as a numbered list, separated by a blank line.
  `,
});

const generateShortTaglineFlow = ai.defineFlow(
  {
    name: 'generateShortTaglineFlow',
    inputSchema: GenerateShortTaglineInputSchema,
    outputSchema: GenerateShortTaglineOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
