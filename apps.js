// apps.js — Firebase initialization (main file)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-analytics.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyD1dyOYhTwNZvsdtmiGt5xwD3RvkvBddsc",
  authDomain: "fir-authentication-d5887.firebaseapp.com",
  projectId: "fir-authentication-d5887",
  storageBucket: "fir-authentication-d5887.firebasestorage.app",
  messagingSenderId: "115915554698",
  appId: "1:115915554698:web:cc450b566f71fdd4c75273",
  measurementId: "G-KQL09FJ0K9",
};

// Sirf EK baar initialize karein
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
