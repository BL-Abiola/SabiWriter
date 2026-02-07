'use server';

/**
 * @fileOverview A flow for generating product descriptions.
 *
 * - generateProductDescription - A function that generates a product description.
 * - GenerateProductDescriptionInput - The input type for the generateProductDescription function.
 * - GenerateProductDescriptionOutput - The return type for the generateProductDescription function.
 */

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateProductDescriptionInputSchema = z.object({
  productName: z.string().describe('The name of the product.'),
  productFeatures: z.string().describe('Key features or details about the product.'),
  tone: z.string().describe('The desired tone for the description.'),
});
export type GenerateProductDescriptionInput = z.infer<typeof GenerateProductDescriptionInputSchema>;

const GenerateProductDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated product description.'),
});
export type GenerateProductDescriptionOutput = z.infer<typeof GenerateProductDescriptionOutputSchema>;

export async function generateProductDescription(
  input: GenerateProductDescriptionInput,
  apiKey: string
): Promise<{ description?: string; error?: { message: string } }> {
  if (!apiKey) {
    return { error: { message: 'API key is not configured. Please add it in the settings.' } };
  }

  const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = `You are a world-class e-commerce copywriter known for writing product descriptions that sell.

Your task is to generate **3 unique product description options** based on the details provided.

**Product Details:**
*   **Name:** ${input.productName}
*   **Features/Description:** ${input.productFeatures}

**Style Guidelines:**
*   **Tone:** Your tone should be: **${input.tone}**.
*   **Emojis:** Weave in relevant emojis to make the description more engaging.

Focus on benefits over features. Paint a picture for the customer and make them feel like they need this product.

Format your response as a single block of text. Present the 3 descriptions as a numbered list, separated by a blank line.
  `;

  try {
    const { output } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: GenerateProductDescriptionOutputSchema,
      },
    });
    return { description: output!.description };
  } catch (e: any) {
    return { error: { message: e.message || 'Failed to generate content.' } };
  }
}
