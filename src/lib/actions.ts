'use server';

import {
  generateOutbreakAdvisory,
  type GenerateOutbreakAdvisoryInput,
  type GenerateOutbreakAdvisoryOutput,
} from '@/ai/flows/generate-outbreak-advisories';

export async function createAdvisoryAction(
  input: GenerateOutbreakAdvisoryInput
): Promise<GenerateOutbreakAdvisoryOutput> {
  try {
    const advisory = await generateOutbreakAdvisory(input);
    return advisory;
  } catch (error) {
    console.error('Error generating advisory:', error);
    throw new Error('Failed to generate advisory. Please try again.');
  }
}
