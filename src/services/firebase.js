// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAURQO8P2PhwJ95QCSBPABz6OCezjAj2aU",
  authDomain: "jado-glp.firebaseapp.com",
  projectId: "jado-glp",
  storageBucket: "jado-glp.firebasestorage.app",
  messagingSenderId: "443496137606",
  appId: "1:443496137606:web:4cd73e820969c2d3b22207",
  measurementId: "G-ELDJS78NZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);