import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import { auth } from "./firebaseConfig";
import { database } from "./firebaseConfig";
import { authRegister, authSignin } from "./utils/auth";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { writeUserData, ReadTest, updateData } from "./utils/database";
import { useEffect, useState } from "react";

export default function App() {
  const [loggedin, setLoggedin] = useState<boolean>();
  const [userData, setUserData] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setUserData(user);
      } else {
        console.log("no user found");
      }
    });
  }, [loggedin]);

  const signInHandler = () => {
    authSignin("TestNew234@gmail.com", "AAAAAA234");
    setLoggedin(true);
  };

  const signOutHandler = () => {
    signOut(auth);
    setLoggedin(false);
  };

  const registerHandler = () => {
    authRegister("TestNew234@gmail.com", "AAAAAA234", setLoggedin);
  };

  if (loggedin) {
    return (
      <View style={styles.container}>
        <Text>{userData && userData.uid}</Text>
        <Button onPress={signOutHandler} title="Log out" />
        <Button
          onPress={() => writeUserData(userData.uid, "Tester", "test@gmx.com")}
          title="Test DB"
        />
        <Button onPress={() => ReadTest(userData.uid)} title="Read DB" />
        <Button onPress={() => updateData(userData.uid)} title="update DB" />
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text>Test</Text>
        <Button onPress={registerHandler} title="Register" />
        <Button onPress={signInHandler} title="Log in" />
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
