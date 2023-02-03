import { auth } from "../firebaseConfig";

import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateEmail,
  updatePassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";

export const register: (a: string, b: string) => void = (
  email: string,
  password: string
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
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

export const signin: (a: string, b: string) => void = (
  email: string,
  password: string
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential: UserCredential) => {
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

export const getCurrentAuthState = () => {
  onAuthStateChanged(auth, (user: User) => {
    if (user) {
      console.log("user is signed in");
      // const uid = auth.currentUser.uid;
    } else {
      console.log("user is signed out");
    }
  });
};

export const updateUserProfile: (a: string, b: string) => void = (
  property: string,
  input: string
) => {
  updateProfile(auth.currentUser, {
    [property]: input,
  })
    .then(() => {
      console.log(`${property} was updated with ${input}!`);
    })
    .catch((error) => {
      console.log("error at updating user profile", error);
    });
};

//? auth.currentUser for currentUser
export const updateUserEmail: (a: string) => void = (email: string) => {
  updateEmail(auth.currentUser, email)
    .then(() => {
      console.log(`${auth.currentUser} their email with ${email}`);
    })
    .catch((error) => {
      console.log("error at updating email", error);
    });
};

export const sendEmailVerificationMail = () => {
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
