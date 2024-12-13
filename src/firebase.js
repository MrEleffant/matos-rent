// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';


// Vos clés de configuration Firebase copiées depuis la console Firebase
const firebaseConfig = require('./config/firebaseConfig.json');

// Initialiser Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

