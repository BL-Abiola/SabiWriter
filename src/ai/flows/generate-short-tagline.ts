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
  nigerianTone: z
    .boolean()
    .default(false)
    .describe('Whether to use Nigerian tone and slang.'),
  useEmoji: z
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
  prompt: `You are a marketing expert specializing in creating short, catchy taglines.

  Based on the following business description, generate a tagline of 3-7 words that captures the essence of the business.

  Business Description: {{{businessDescription}}}

  Tone: {{#if nigerianTone}}Use Nigerian tone and slang.{{else}}Use a professional and standard tone.{{/if}}
  Emojis: {{#if useEmoji}}Include relevant emojis.{{else}}Do not include emojis.{{/if}}
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
