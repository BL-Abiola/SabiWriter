import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

/**
 * The global Genkit instance.
 *
 * It is initialized without an API key. The user-specific API key will be
 * provided dynamically on a per-request basis within each server action.
 * This object is primarily used to discover flows in the Genkit developer UI.
 */
export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
