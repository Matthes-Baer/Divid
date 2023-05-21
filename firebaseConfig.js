// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from "firebase/auth";

// web app's Firebase configuration
//! process.env. doesn't work like that, just a placeholder
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTHDOMAIN,
  databaseURL: process.env.FIREBASE_DATABASEURL,
  projectId: "divid-5f8e5",
  storageBucket: "divid-5f8e5.appspot.com",
  messagingSenderId: "119969415068",
  appId: "1:119969415068:web:1956f5655b819eeac61259",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
// export const database = getDatabase(app);
