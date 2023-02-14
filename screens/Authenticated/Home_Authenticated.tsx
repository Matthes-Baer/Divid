import { signOut } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";

//? Navigation
import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Home">;

//? Database & Auth
import {
  readAllUserData_DB,
  readSortedScoresArray_DB,
  readSpecificUserData_DB,
  addScore_DB,
  updateSingleData_DB,
  updateSingleTrophyData_DB,
  readTrophiesData_DB,
} from "../../utils/database";
import type { userData_DB, trophy_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import TROPHY_IMAGE_URL from "../../data/TrohpyData";

const Home_Authenticated = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<userData_DB>();
  const [activeTrophyImage, setActiveTrophyImage] = useState<string>();
  const [trophiesArray, setTrophiesArray] = useState<Array<trophy_DB>>();

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
      readTrophiesData_DB(auth.currentUser.uid, setTrophiesArray, true);
    }
  }, []);

  const activeImageHandler = (value, index) => {
    updateSingleData_DB(auth.currentUser.uid, value, "/trophyImage");
    setActiveTrophyImage(value);
  };

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
        title="addScore_DB"
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
        title="readSortedScoresArray_DB"
        onPress={() => readSortedScoresArray_DB(auth.currentUser.uid)}
      />
      <Button
        title="readingAllUserData_DB"
        onPress={() => readAllUserData_DB(auth.currentUser.uid)}
      />
      <Button
        title="updateSingleData_DB - attempts of a specific score (hardcoded)"
        onPress={() =>
          updateSingleData_DB(
            auth.currentUser.uid,
            2200,
            "/Scores" + "/-NNsJoRYEham1_JRihlv" + "/attempts"
          )
        }
      />
      <Button
        title="updateSingleTrophyData_DB (FirstPic)"
        onPress={() =>
          updateSingleTrophyData_DB(
            auth.currentUser.uid,
            "FirstPic",
            "available",
            true
          )
        }
      />
      {!trophiesArray ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <Picker
          selectedValue={
            !activeTrophyImage && !userData ? (
              <ActivityIndicator size={"large"} />
            ) : activeTrophyImage ? (
              activeTrophyImage
            ) : (
              userData.trophyImage
            )
          }
          onValueChange={activeImageHandler}
          mode="dropdown" // Android only
          style={styles.picker}
        >
          <Picker.Item label="None" value="None" />

          {trophiesArray.map((e: trophy_DB) => (
            <Picker.Item key={e.name} label={e.name} value={e.name} />
          ))}
        </Picker>
      )}

      {!activeTrophyImage && !userData ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View>
          <Image
            style={{
              height: 250,
              width: 250,
              backgroundColor: "transparent",
            }}
            source={
              TROPHY_IMAGE_URL.find(
                (e: { image: string; url: NodeRequire }) =>
                  e.image ===
                  (activeTrophyImage ? activeTrophyImage : userData.trophyImage)
              )?.url || TROPHY_IMAGE_URL[0].url
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },
});

export default Home_Authenticated;
