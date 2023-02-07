import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

//? Navigation
import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Home">;

//? Database & Auth
import { readSpecificUserDataDB } from "../../utils/database";
import type { database_userData } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";

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
      readSpecificUserDataDB(auth.currentUser.uid, setUserData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Logged in</Text>
      <View>
        {!userData ? (
          <ActivityIndicator color="#0000ff" size="large" />
        ) : (
          <View>
            <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 25 }}>
              {userData.email}
            </Text>
            <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 25 }}>
              {userData.username}
            </Text>
            <Text>Email verified?: {auth.currentUser.emailVerified}</Text>
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
