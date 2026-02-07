'use server';
import { config } from 'dotenv';
config();

// Note: API key is now handled on a per-request basis.
// These imports are for discovering flows if you use the Genkit dev UI.
import '@/ai/flows/generate-facebook-post.ts';
import '@/ai/flows/generate-instagram-bio.ts';
import '@/ai/flows/generate-product-description.ts';
import '@/ai/flows/generate-short-tagline.ts';
import '@/ai/flows/generate-twitter-post.ts';
import '@/ai/flows/generate-whatsapp-description.ts';
