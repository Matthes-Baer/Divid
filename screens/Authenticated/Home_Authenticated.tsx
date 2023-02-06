import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";

import type { database_userData } from "../../utils/interfaces-and-types";
import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { readSpecificUserData } from "../../utils/database";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Home">;

const Home_Authenticated = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<database_userData | null>(null);

  const signOutHandler = () => {
    signOut(auth);
    navigation.navigate("Start");
    // setLoggedin(false);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readSpecificUserData(auth.currentUser.uid, setUserData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Logged in</Text>
      <View>
        {!userData ? (
          <Text>Fetching user data...</Text>
        ) : (
          <View>
            <Text>{userData.email}</Text>
            <Text>{userData.username}</Text>
          </View>
        )}
      </View>

      <Text>{auth.currentUser.uid}</Text>
      <Text></Text>
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
