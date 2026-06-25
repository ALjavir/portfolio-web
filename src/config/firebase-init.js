import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDfKoXOkmS291LC9wrHveGso6F6eo0r-CI",
    authDomain: "portfolio-9bac5.firebaseapp.com",
    projectId: "portfolio-9bac5",
    storageBucket: "portfolio-9bac5.firebasestorage.app",
    messagingSenderId: "281761236864",
    appId: "1:281761236864:web:059c76523fa27b30cc6365",
    measurementId: "G-L6XP54RCWB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);