'use server';

/**
 * @fileOverview Generates a short, catchy tagline for a business.
 *
 * - generateShortTagline - A function that generates a short tagline.
 * - GenerateShortTaglineInput - The input type for the generateShortTagline function.
 * - GenerateShortTaglineOutput - The return type for the generateShortTagline function.
 */

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateShortTaglineInputSchema = z.object({
  businessDescription: z.string().describe('A brief description of the business or product.'),
  tone: z.string().describe('The desired tone for the tagline.'),
});
export type GenerateShortTaglineInput = z.infer<typeof GenerateShortTaglineInputSchema>;

const GenerateShortTaglineOutputSchema = z.object({
  tagline: z.string().describe('A catchy and memorable tagline of 3-7 words that encapsulates the business\'s essence.'),
});
export type GenerateShortTaglineOutput = z.infer<typeof GenerateShortTaglineOutputSchema>;

export async function generateShortTagline(
  input: GenerateShortTaglineInput,
  apiKey: string
): Promise<{ tagline?: string; error?: { message: string } }> {
  if (!apiKey) {
    return { error: { message: 'API key is not configured. Please add it in the settings.' } };
  }

  const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = `You are a world-class marketing expert specializing in creating short, unforgettable taglines.

Your task is to generate **3 unique tagline options** based on the business description provided. Each tagline should be catchy, memorable, and between 3-7 words.

**Business Description:**
${input.businessDescription}

**Style Guidelines:**
*   **Tone:** Your tone should be: **${input.tone}**.
*   **Emojis:** If it fits, you can add a single, powerful emoji at the end.

The tagline should perfectly encapsulate the business's essence.

Format your response as a single block of text. Present the 3 taglines as a numbered list, separated by a blank line.
  `;

  try {
    const { output } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: GenerateShortTaglineOutputSchema,
      },
    });
    return { tagline: output!.tagline };
  } catch (e: any) {
    return { error: { message: e.message || 'Failed to generate content.' } };
  }
}
