// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmaX2VtRxBMbBQE7mR8EVutxwSdhd45Go",
  authDomain: "episodeplayer-57712.firebaseapp.com",
  projectId: "episodeplayer-57712",
  storageBucket: "episodeplayer-57712.appspot.com",
  messagingSenderId: "762718254362",
  appId: "1:762718254362:web:511bfbbe13eacd313d28a3",
  measurementId: "G-DJMCC7FC6N",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
