// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirebase} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
const db = getFirebase(app)

export {db}