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
  tonePreference: z.string().describe('The preferred tone for the description (e.g., professional, friendly, Nigerian).'),
  emojiPreference: z.boolean().describe('Whether or not to include emojis in the description.'),
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

  Based on the following information, create a professional and welcoming WhatsApp description for the business. Emphasize trust and quick response times.

  Business Name: {{{businessName}}}
  Industry: {{{industry}}}
  Tone Preference: {{{tonePreference}}}
  Include Emojis: {{#if emojiPreference}}Yes{{else}}No{{/if}}

  Description:`, 
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
