'use server';

/**
 * @fileOverview A flow for generating Twitter/X posts.
 *
 * - generateTwitterPost - A function that generates a Twitter post.
 * - GenerateTwitterPostInput - The input type for the generateTwitterPost function.
 * - GenerateTwitterPostOutput - The return type for the generateTwitterPost function.
 */

import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const GenerateTwitterPostInputSchema = z.object({
  topic: z.string().describe('The topic or announcement for the post.'),
  tone: z.string().describe('The desired tone for the post.'),
});
export type GenerateTwitterPostInput = z.infer<typeof GenerateTwitterPostInputSchema>;

const GenerateTwitterPostOutputSchema = z.object({
  post: z.string().describe('The generated Twitter post.'),
});
export type GenerateTwitterPostOutput = z.infer<typeof GenerateTwitterPostOutputSchema>;

export async function generateTwitterPost(
  input: GenerateTwitterPostInput,
  apiKey: string
): Promise<{ post?: string; error?: { message: string } }> {
  if (!apiKey) {
    return { error: { message: 'API key is not configured. Please add it in the settings.' } };
  }

  const ai = genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });

  const prompt = `You are a viral social media manager specializing in X (formerly Twitter).

Your task is to generate **3 unique post options** based on the topic provided. Each post must be under 280 characters and include relevant hashtags.

**Topic:**
${input.topic}

**Style Guidelines:**
*   **Tone:** Your tone should be: **${input.tone}**.
*   **Emojis:** Use relevant emojis to increase engagement.

The posts should be engaging, concise, and designed to capture attention.

Format your response as a single block of text. Present the 3 posts as a numbered list, separated by a blank line.
  `;

  try {
    const { output } = await ai.generate({
      prompt,
      model: 'googleai/gemini-2.5-flash',
      output: {
        schema: GenerateTwitterPostOutputSchema,
      },
    });
    return { post: output!.post };
  } catch (e: any) {
    return { error: { message: e.message || 'Failed to generate content.' } };
  }
}
