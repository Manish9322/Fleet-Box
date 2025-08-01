import { initGenkit } from '@genkit-ai/next';
import { googleAI } from '@genkit-ai/googleai';

export const ai = initGenkit({
  plugins: [googleAI()],
});
