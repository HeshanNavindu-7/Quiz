// src/firebase.js
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDtRh1u_javbvFb1CoPq4199UYza3YyLzM",
    authDomain: "quiz-d58b7.firebaseapp.com",
    projectId: "quiz-d58b7",
    storageBucket: "quiz-d58b7.appspot.com",
    messagingSenderId: "195369048116",
    appId: "1:195369048116:web:0cbcbe5911488b45fcd261",
    measurementId: "G-WKZLDH3KDR"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };
