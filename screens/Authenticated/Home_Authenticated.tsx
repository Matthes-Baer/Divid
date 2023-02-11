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
import {
  readingAllUserData_DB,
  readSortedScoresArray_DB,
  readSpecificUserData_DB,
  addScore_DB,
  updateSingleData_DB,
  updateSingleTrophyData_DB,
} from "../../utils/database";
import type { userData_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";

const Home_Authenticated = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<userData_DB | null>(null);
  const [readDbData, setReadDbData] = useState<any>();

  const signOutHandler = () => {
    signOut(auth);
    navigation.navigate("Start");
    // setLoggedin(false);
  };

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readSpecificUserData_DB(auth.currentUser.uid, setUserData);
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
            <Text>
              Email verified?: {auth.currentUser.emailVerified ? "Yes" : "No"}
            </Text>
          </View>
        )}
      </View>

      <Text>{auth.currentUser.uid}</Text>
      <Text></Text>
      <Button title="logout" onPress={signOutHandler} />
      <Button
        title="DBUpdateTest"
        onPress={() =>
          addScore_DB(
            auth.currentUser.uid,
            20500,
            {
              day: new Date().getDate(),
              month: new Date().getMonth(),
              year: new Date().getFullYear(),
              total:
                new Date().getDate() +
                new Date().getMonth() +
                new Date().getFullYear(),
            },
            3,
            2
          )
        }
      />
      <Button
        title="sortDBTest"
        onPress={() => readSortedScoresArray_DB(auth.currentUser.uid)}
      />
      <Button
        title="Reading All User Data"
        onPress={() => readingAllUserData_DB(auth.currentUser.uid)}
      />
      <Button
        title="Update Single Data"
        onPress={() =>
          updateSingleData_DB(
            auth.currentUser.uid,
            2200,
            "/Scores" + "/-NNsJoRYEham1_JRihlv" + "/attempts"
          )
        }
      />
      <Button
        title="Single Trophy Data"
        onPress={() =>
          updateSingleTrophyData_DB(auth.currentUser.uid, "FirstPic")
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Home_Authenticated;
