
'use server';

import {
  generateOutbreakAdvisory,
  type GenerateOutbreakAdvisoryInput,
  type GenerateOutbreakAdvisoryOutput,
} from '@/ai/flows/generate-outbreak-advisories';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

export async function createAdvisoryAction(
  input: GenerateOutbreakAdvisoryInput
): Promise<GenerateOutbreakAdvisoryOutput> {
  try {
    const advisory = await generateOutbreakAdvisory(input);
    
    // Save the generated advisory to Firestore
    await addDoc(collection(db, "advisories"), {
      ...advisory,
      createdAt: serverTimestamp()
    });

    return advisory;
  } catch (error) {
    console.error('Error generating advisory:', error);
    throw new Error('Failed to generate advisory. Please try again.');
  }
}
