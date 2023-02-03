import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";

import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Home">;

const Home_Authenticated = ({ navigation }: Props) => {
  const signOutHandler = () => {
    signOut(auth);
    navigation.navigate("Start");
    // setLoggedin(false);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    }
  });

  return (
    <View style={styles.container}>
      <Text>Logged in</Text>
      <Text>{auth.currentUser.uid}</Text>
      <Button title="logout" onPress={signOutHandler} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Home_Authenticated;
