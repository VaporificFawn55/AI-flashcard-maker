// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZBPeB6My7zkqPzHNA4VK8MPI6hvHcvis",
  authDomain: "flashcards-c49dc.firebaseapp.com",
  projectId: "flashcards-c49dc",
  storageBucket: "flashcards-c49dc.appspot.com",
  messagingSenderId: "321295993408",
  appId: "1:321295993408:web:1814871f2b7fe59de16da5",
  measurementId: "G-WMPTVECTXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics only if it's supported and running in the browser
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { db, analytics };
