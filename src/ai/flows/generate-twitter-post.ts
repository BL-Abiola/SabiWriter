'use server';

/**
 * @fileOverview A flow for generating Twitter/X posts.
 *
 * - generateTwitterPost - A function that generates a Twitter post.
 * - GenerateTwitterPostInput - The input type for the generateTwitterPost function.
 * - GenerateTwitterPostOutput - The return type for the generateTwitterPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateTwitterPostInputSchema = z.object({
  topic: z.string().describe('The topic or announcement for the post.'),
  tone: z.string().describe('The desired tone for the post.'),
  includeEmojis: z.boolean().describe('Whether to include emojis.'),
});
export type GenerateTwitterPostInput = z.infer<typeof GenerateTwitterPostInputSchema>;

const GenerateTwitterPostOutputSchema = z.object({
  post: z.string().describe('The generated Twitter post.'),
});
export type GenerateTwitterPostOutput = z.infer<typeof GenerateTwitterPostOutputSchema>;

export async function generateTwitterPost(input: GenerateTwitterPostInput): Promise<GenerateTwitterPostOutput> {
  return generateTwitterPostFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTwitterPostPrompt',
  input: {schema: GenerateTwitterPostInputSchema},
  output: {schema: GenerateTwitterPostOutputSchema},
  prompt: `You are a viral social media manager specializing in X (formerly Twitter).

Your task is to generate **3 unique post options** based on the topic provided. Each post must be under 280 characters and include relevant hashtags.

**Topic:**
{{{topic}}}

**Style Guidelines:**
*   **Tone:** Your tone should be: **{{{tone}}}**.
*   **Emojis:** {{#if includeEmojis}}Use relevant emojis to increase engagement.{{else}}Do not use any emojis.{{/if}}

The posts should be engaging, concise, and designed to capture attention.

Format your response as a single block of text. Present the 3 posts as a numbered list, separated by a blank line.
  `,
});

const generateTwitterPostFlow = ai.defineFlow(
  {
    name: 'generateTwitterPostFlow',
    inputSchema: GenerateTwitterPostInputSchema,
    outputSchema: GenerateTwitterPostOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
