import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "./firebaseConfig";
import { useEffect, useState } from "react";

export default function App() {
  const [loggedin, setLoggedin] = useState<boolean>();

  const register = () => {
    createUserWithEmailAndPassword(auth, "Test2@test.com", "1234567")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoggedin(true);
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  const signin = () => {
    signInWithEmailAndPassword(auth, "Test@test.com", "123456")
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        setLoggedin(true);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        console.log("user is signed in");
        setLoggedin(true);
        // ...
      } else {
        // User is signed out
        // ...
        console.log("user is signed out");
        setLoggedin(false);
      }
    });
  }, []);

  if (loggedin) {
    return (
      <View style={styles.container}>
        <Text>Logged in</Text>
        <Button onPress={() => signOut(auth)} title="Log out" />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
        <Button onPress={register} title="Register" />
        <Button onPress={signin} title="Log in" />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
