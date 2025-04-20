// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyClC9pC-qp0bv2yqKizlRVOYsbjn8prhYE",
  authDomain: "ecoquest-app.firebaseapp.com",
  projectId: "ecoquest-app",
  storageBucket: "ecoquest-app.firebasestorage.app",
  messagingSenderId: "994488550246",
  appId: "1:994488550246:web:a72ff1b222c34c23343ea7",
  measurementId: "G-V7MX80TXJ7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };