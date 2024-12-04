// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Vos clés de configuration Firebase copiées depuis la console Firebase
const firebaseConfig = require('./config/firebaseConfig.json');

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

// Initialiser Firestore
const db = getFirestore(app);

export { db };


