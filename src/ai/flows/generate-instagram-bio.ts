'use server';

/**
 * @fileOverview A flow for generating Instagram bios based on business details.
 *
 * - generateInstagramBio - A function that generates an Instagram bio.
 * - GenerateInstagramBioInput - The input type for the generateInstagramBio function.
 * - GenerateInstagramBioOutput - The return type for the generateInstagramBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInstagramBioInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  businessDescription: z.string().describe('A description of the business.'),
  valueProposition: z.string().describe('The value proposition of the business.'),
  callToAction: z.string().describe('A call to action for the bio.'),
  nigerianTone: z.boolean().describe('Whether to use a Nigerian tone.'),
  includeEmojis: z.boolean().describe('Whether to include emojis.'),
});
export type GenerateInstagramBioInput = z.infer<typeof GenerateInstagramBioInputSchema>;

const GenerateInstagramBioOutputSchema = z.object({
  bio: z.string().describe('The generated Instagram bio.'),
});
export type GenerateInstagramBioOutput = z.infer<typeof GenerateInstagramBioOutputSchema>;

export async function generateInstagramBio(input: GenerateInstagramBioInput): Promise<GenerateInstagramBioOutput> {
  return generateInstagramBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInstagramBioPrompt',
  input: {schema: GenerateInstagramBioInputSchema},
  output: {schema: GenerateInstagramBioOutputSchema},
  prompt: `You are an expert in crafting engaging Instagram bios for businesses.

  Based on the following business details, generate an Instagram bio that is within the character limit of 150 characters and includes a hook, value proposition, and a clear call to action.

  Business Name: {{{businessName}}}
  Description: {{{businessDescription}}}
  Value Proposition: {{{valueProposition}}}
  Call to Action: {{{callToAction}}}
  Nigerian Tone: {{#if nigerianTone}}Yes{{else}}No{{/if}}
  Include Emojis: {{#if includeEmojis}}Yes{{else}}No{{/if}}

  The bio should be concise, attention-grabbing, and encourage users to follow the account or take the desired action.

  {{#if nigerianTone}}
  Incorporate Nigerian slang or cultural references where appropriate to resonate with the local audience. But don't overdo it.
  {{/if}}

  {{#if includeEmojis}}
  Use relevant emojis to make the bio more visually appealing and engaging.
  {{/if}}
  `,
});

const generateInstagramBioFlow = ai.defineFlow(
  {
    name: 'generateInstagramBioFlow',
    inputSchema: GenerateInstagramBioInputSchema,
    outputSchema: GenerateInstagramBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
