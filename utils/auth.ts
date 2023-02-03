import { auth } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const register = () => {
  createUserWithEmailAndPassword(auth, "Test2@test.com", "1234567")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
};

export const signin = () => {
  signInWithEmailAndPassword(auth, "Test@test.com", "123456")
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
};
