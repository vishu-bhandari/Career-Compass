// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-41b1f.firebaseapp.com",
  projectId: "mern-blog-41b1f",
  storageBucket: "mern-blog-41b1f.appspot.com",
  messagingSenderId: "608607122002",
  appId: "1:608607122002:web:8c3c2fb516667e11d6a58b",
  measurementId: "G-2D3F91KKYD"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


