'use server';

/**
 * @fileOverview A flow for generating Instagram bios based on business details.
 *
 * - generateInstagramBio - A function that generates an Instagram bio.
 * - GenerateInstagramBioInput - The input type for the generateInstagramBio function.
 * - GenerateInstagramBioOutput - The return type for the generateInstagramBio function.
 */

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateInstagramBioInputSchema = z.object({
  businessName: z.string().describe('The name of the business.'),
  businessDescription: z.string().describe('A description of the business.'),
  valueProposition: z.string().describe('The value proposition of the business.'),
  callToAction: z.string().describe('A call to action for the bio.'),
  tone: z.string().describe('The desired tone for the bio.'),
});
export type GenerateInstagramBioInput = z.infer<typeof GenerateInstagramBioInputSchema>;

const GenerateInstagramBioOutputSchema = z.object({
  bio: z.string().describe('The generated Instagram bio.'),
});
export type GenerateInstagramBioOutput = z.infer<typeof GenerateInstagramBioOutputSchema>;

export async function generateInstagramBio(
  input: GenerateInstagramBioInput,
  apiKey: string
): Promise<{ bio?: string; error?: { message: string } }> {
  if (!apiKey) {
    return { error: { message: 'API key is not configured. Please add it in the settings.' } };
  }

  const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = `You are a world-class social media copywriter specializing in viral Instagram bios.

Your task is to generate **3 unique Instagram bio options** based on the details provided. Each bio must be under 150 characters.

**Structure for each bio:**
1.  **Hook:** Start with an attention-grabbing line.
2.  **Value Proposition:** Clearly state what the business offers and what makes it special.
3.  **Call to Action (CTA):** End with a clear instruction for the user.

**Business Details:**
*   **Name:** ${input.businessName}
*   **Description:** ${input.businessDescription}
*   **Value Proposition:** ${input.valueProposition}
*   **Call to Action:** ${input.callToAction}

**Style Guidelines:**
*   **Tone:** Your tone should be: **${input.tone}**. If the tone is 'Nigerian', feel free to use popular, positive slang like 'No wahala', 'Sabi', or 'Naija-made'. Keep it authentic and not over-the-top.
*   **Emojis:** Weave in relevant emojis to add personality and break up the text.

Format your response as a single block of text. Present the 3 bios as a numbered list, separated by a blank line.
  `;

  try {
    const { output } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: GenerateInstagramBioOutputSchema,
      },
    });
    return { bio: output!.bio };
  } catch (e: any) {
    return { error: { message: e.message || 'Failed to generate content.' } };
  }
}
