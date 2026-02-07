'use server';

/**
 * @fileOverview A WhatsApp business description generator AI agent.
 *
 * - generateWhatsAppDescription - A function that handles the WhatsApp business description generation process.
 * - GenerateWhatsAppDescriptionInput - The input type for the generateWhatsAppDescription function.
 * - GenerateWhatsAppDescriptionOutput - The return type for the generateWhatsAppDescription function.
 */

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateWhatsAppDescriptionInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry of the business.'),
  tone: z.string().describe('The desired tone for the description.'),
});
export type GenerateWhatsAppDescriptionInput = z.infer<typeof GenerateWhatsAppDescriptionInputSchema>;

const GenerateWhatsAppDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated WhatsApp business description.'),
});
export type GenerateWhatsAppDescriptionOutput = z.infer<typeof GenerateWhatsAppDescriptionOutputSchema>;

export async function generateWhatsAppDescription(
  input: GenerateWhatsAppDescriptionInput,
  apiKey: string
): Promise<{ description?: string; error?: { message: string } }> {
  if (!apiKey) {
    return { error: { message: 'API key is not configured. Please add it in the settings.' } };
  }

  const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = `You are an expert in crafting WhatsApp business descriptions that build trust and encourage engagement.

Your task is to generate **3 unique WhatsApp description options** for the business based on the details below. Each description should be professional, welcoming, and emphasize trust and quick response times.

**Business Details:**
*   **Name:** ${input.businessName}
*   **Industry:** ${input.industry}

**Style Guidelines:**
*   **Tone:** Your tone should be: **${input.tone}**.
*   **Emojis:** Use emojis to appear friendly and approachable.

The description should make customers feel confident about contacting the business.

Format your response as a single block of text. Present the 3 descriptions as a numbered list, separated by a blank line.
`;

  try {
    const { output } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: GenerateWhatsAppDescriptionOutputSchema,
      },
    });
    return { description: output!.description };
  } catch (e: any) {
    return { error: { message: e.message || 'Failed to generate content.' } };
  }
}
