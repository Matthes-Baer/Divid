// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5k5VoJmqaYDfomgopw3RR4RPDRFwrXhM",
  authDomain: "divid-5f8e5.firebaseapp.com",
  databaseURL:
    "https://divid-5f8e5-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "divid-5f8e5",
  storageBucket: "divid-5f8e5.appspot.com",
  messagingSenderId: "119969415068",
  appId: "1:119969415068:web:1956f5655b819eeac61259",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
firebase.auth().useDeviceLanguage();
