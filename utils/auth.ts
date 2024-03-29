import { auth } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { createUser_DB } from "./database";

export const authRegister: (a: string, b: string, c: string) => void = (
  email: string,
  password: string,
  username: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      const user: User = userCredential.user;
      if (!user) {
        throw new Error("User isn't authenticated.");
      }
      updateProfile(auth.currentUser, {
        displayName: username,
      });
      authSignin(email, password);
      createUser_DB(user.uid, username, email);
      sendEmailVerificationMail();
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const authSignin: (a: string, b: string) => void = (
  email: string,
  password: string
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
      //* Signed in
      const user: User = userCredential.user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    });
};

export const updateUserProfile: (a: string, b: string) => void = (
  key: string,
  input: string
) => {
  updateProfile(auth.currentUser, {
    [key]: input,
  })
    .then(() => {
      console.log(`${key} was updated with ${input}!`);
    })
    .catch((error) => {
      console.log("error at updating user profile", error);
    });
};

export const updateUserEmail: (a: string) => void = (email: string) => {
  updateEmail(auth.currentUser, email)
    .then(() => {
      console.log(`${auth.currentUser} their email with ${email}`);
    })
    .catch((error) => {
      console.log("error at updating email", error);
    });
};

export const sendEmailVerificationMail = (): void => {
  sendEmailVerification(auth.currentUser).then(() => {
    console.log("Email verification was sent");
  });
};

export const updateUserPassword: (a: string) => void = (input: string) => {
  updatePassword(auth.currentUser, input)
    .then(() => {
      console.log(`${auth.currentUser} successfully updated their password.`);
    })
    .catch((error) => {
      console.log("error occured when updating password.");
    });
};

export const sendUserPasswordResetEmail: (a: string) => void = (
  email: string
) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Password reset email was sent.");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error occured when sending password reset email.");
    });
};

export const deleteUserProfile = () => {
  deleteUser(auth.currentUser)
    .then(() => {
      console.log("User was deleted.");
    })
    .catch((error) => {
      console.log("error occured when deleting the user.");
    });
};
