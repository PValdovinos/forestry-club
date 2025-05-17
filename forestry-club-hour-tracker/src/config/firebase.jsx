import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBf6477-m8iZu8bhU_WuRzfEDyakLA9dSI",
  authDomain: "forestry-club-9bfcb.firebaseapp.com",
  projectId: "forestry-club-9bfcb",
  storageBucket: "forestry-club-9bfcb.firebasestorage.app",
  messagingSenderId: "20397297737",
  appId: "1:20397297737:web:4878a90e384e1cf3e2af98",
  measurementId: "G-0CB9RGMH5Z"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
