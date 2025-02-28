// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvnt05T0HS2YZ9nr2VrZk_l0wGkoaVxC0",
  authDomain: "busy-buy-ff933.firebaseapp.com",
  projectId: "busy-buy-ff933",
  storageBucket: "busy-buy-ff933.firebasestorage.app",
  messagingSenderId: "491712041746",
  appId: "1:491712041746:web:6eca3dc6dae5b912fad9cb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
const db = getFirestore(app);
export {db};
export default app;
