// Replace these with your own Firebase project config values:
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRfEQCnqm-f1PQBmozyOJDS488UmzxbY0",
  authDomain: "knxemptyleasing.firebaseapp.com",
  projectId: "knxemptyleasing",
  storageBucket: "knxemptyleasing.firebasestorage.app",
  messagingSenderId: "1046287017434",
  appId: "1:1046287017434:web:b863f946382ff946b4cce3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);