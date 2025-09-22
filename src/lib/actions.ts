'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { Advisory } from './types';


export async function createAdvisoryAction(
  advisory: Omit<Advisory, 'id' | 'createdAt'>
): Promise<Advisory> {
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
