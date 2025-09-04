"use client";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAC3sRNth1CSWotu_Sr4xRixVMQ7d7fm7s",
  authDomain: "jal-rakshak-c8hrb.firebaseapp.com",
  projectId: "jal-rakshak-c8hrb",
  storageBucket: "jal-rakshak-c8hrb.firebasestorage.app",
  messagingSenderId: "339867312563",
  appId: "1:339867312563:web:d18eae49ba78fba50d2bc6",
  measurementId: ""
};


// Initialize Firebase
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

export { app };
