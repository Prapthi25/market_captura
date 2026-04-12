
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA7Rxo5jusT0kJtmmCrfMFZFJsCIB4Zt4k",
  authDomain: "market-capture-81baa.firebaseapp.com",
  projectId: "market-capture-81baa",
  storageBucket: "market-capture-81baa.firebasestorage.app",
  messagingSenderId: "590000118841",
  appId: "1:590000118841:web:61feac4833badbb4f741e8",
  measurementId: "G-FK1RJJGJYQ"
};

// Initialize Firebase (using singleton pattern for Next.js)
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Analytics is browser-only
let analytics = null;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) analytics = getAnalytics(app);
  });
}

export { app, db, auth, analytics };
