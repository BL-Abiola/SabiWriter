'use server';

/**
 * @fileOverview A WhatsApp business description generator AI agent.
 *
 * - generateWhatsAppDescription - A function that handles the WhatsApp business description generation process.
 * - GenerateWhatsAppDescriptionInput - The input type for the generateWhatsAppDescription function.
 * - GenerateWhatsAppDescriptionOutput - The return type for the generateWhatsAppDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateWhatsAppDescriptionInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  industry: z.string().describe('The industry of the business.'),
  tone: z.string().describe('The desired tone for the description.'),
  includeEmojis: z.boolean().describe('Whether or not to include emojis in the description.'),
});
export type GenerateWhatsAppDescriptionInput = z.infer<typeof GenerateWhatsAppDescriptionInputSchema>;

const GenerateWhatsAppDescriptionOutputSchema = z.object({
  description: z.string().describe('The generated WhatsApp business description.'),
});
export type GenerateWhatsAppDescriptionOutput = z.infer<typeof GenerateWhatsAppDescriptionOutputSchema>;

export async function generateWhatsAppDescription(input: GenerateWhatsAppDescriptionInput): Promise<GenerateWhatsAppDescriptionOutput> {
  return generateWhatsAppDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateWhatsAppDescriptionPrompt',
  input: {schema: GenerateWhatsAppDescriptionInputSchema},
  output: {schema: GenerateWhatsAppDescriptionOutputSchema},
  prompt: `You are an expert in crafting WhatsApp business descriptions that build trust and encourage engagement.

Your task is to generate **3 unique WhatsApp description options** for the business based on the details below. Each description should be professional, welcoming, and emphasize trust and quick response times.

**Business Details:**
*   **Name:** {{{businessName}}}
*   **Industry:** {{{industry}}}

**Style Guidelines:**
*   **Tone:** Your tone should be: **{{{tone}}}**.
*   **Emojis:** {{#if includeEmojis}}Use emojis to appear friendly and approachable.{{else}}Do not use any emojis.{{/if}}

The description should make customers feel confident about contacting the business.

Format your response as a single block of text. Present the 3 descriptions as a numbered list, separated by a blank line.
`,
});

const generateWhatsAppDescriptionFlow = ai.defineFlow(
  {
    name: 'generateWhatsAppDescriptionFlow',
    inputSchema: GenerateWhatsAppDescriptionInputSchema,
    outputSchema: GenerateWhatsAppDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
