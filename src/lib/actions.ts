
'use server';

import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { app } from '@/lib/firebase';
import { Advisory } from './types';


export async function createAdvisoryAction(
  advisory: Omit<Advisory, 'id' | 'createdAt'>
): Promise<Advisory> {
  if (!app) {
    throw new Error("Firebase is not initialized.");
  }
  const db = getFirestore(app);

  try {
    const docRef = await addDoc(collection(db, "advisories"), {
      ...advisory,
      createdAt: serverTimestamp()
    });

    return {
      id: docRef.id,
      ...advisory,
    };
  } catch (error) {
    console.error('Error creating advisory:', error);
    throw new Error('Failed to create advisory. Please try again.');
  }
}
