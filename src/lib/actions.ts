'use server';

import {
  generateOutbreakAdvisory,
  type GenerateOutbreakAdvisoryInput,
  type GenerateOutbreakAdvisoryOutput,
} from '@/ai/flows/generate-outbreak-advisories';
import { chat } from '@/ai/flows/chat';
import { experimental_streamText } from 'ai';

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

export async function continueConversation(
  history: any[],
  prompt: string,
) {
  const {stream} = await chat({
    history,
    prompt,
    stream: true,
  });
  return experimental_streamText({
    stream,
  });
}
