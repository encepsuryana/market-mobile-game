// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDC5B3tE7IHhysiG6DloYajkK-0iq7ZWwA",
  authDomain: "topup-mobile-games.firebaseapp.com",
  projectId: "topup-mobile-games",
  storageBucket: "topup-mobile-games.appspot.com",
  messagingSenderId: "1045797187116",
  appId: "1:1045797187116:web:71c839738f5229090e6b89",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authentication = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
