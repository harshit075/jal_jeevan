import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/googleai/firebase';

export const ai = genkit({
  plugins: [googleAI()],
  model: 'googleai/gemini-2.5-flash',
});
