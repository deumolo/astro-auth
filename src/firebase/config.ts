// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPjOmw5lyI4O9gcvvBMuXfr5YNe45deQk",
  authDomain: "astro-auth-4b93b.firebaseapp.com",
  projectId: "astro-auth-4b93b",
  storageBucket: "astro-auth-4b93b.firebasestorage.app",
  messagingSenderId: "843675191573",
  appId: "1:843675191573:web:1a7f219a6babe617c8411c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
auth.languageCode = 'es';
export const firebase = { app, auth };