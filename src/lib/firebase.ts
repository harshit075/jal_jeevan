
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase for SSR and SSG, and prevent re-initialization on the client
const getClientApp = () => {
    if (getApps().length) {
        return getApp();
    }
    // Check for API key to prevent build errors
    if (firebaseConfig.apiKey) {
      return initializeApp(firebaseConfig);
    }
    // This is a dummy app for build time, it will not be used
    return initializeApp({});
}


const app = getClientApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { app, db, auth };
