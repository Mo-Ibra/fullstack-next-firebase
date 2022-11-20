// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDXUPVS8R-O_CP-5gtuQX-IMviEepbp6UI",
    authDomain: "next-84c76.firebaseapp.com",
    projectId: "next-84c76",
    storageBucket: "next-84c76.appspot.com",
    messagingSenderId: "127653350307",
    appId: "1:127653350307:web:34d263cfc0ecc7bf966816",
    measurementId: "G-TR53CFNETK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);