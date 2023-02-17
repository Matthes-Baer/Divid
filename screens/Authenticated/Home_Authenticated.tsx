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
import CustomButton from "../../components/ui/CustomButton";

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
      {!userData ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <View style={styles.topBarViewContainer}>
          <Text style={styles.normalTextStyle}>Hello, {userData.username}</Text>
          <CustomButton onPress={signOutHandler} width={"25%"}>
            <Text style={styles.customButtonText}>Logout</Text>
          </CustomButton>
        </View>
      )}

      <View style={styles.midPartViewContainer}>
        <Text>
          Play a game and pick a trophy image in the Trophies section which can
          be enabled on this home screen.
        </Text>

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
                    (activeTrophyImage
                      ? activeTrophyImage
                      : userData.trophyImage)
                )?.url || TROPHY_IMAGE_URL[0].url
              }
            />
          </View>
        )}

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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },

  topBarViewContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  midPartViewContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },

  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },

  normalTextStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },

  customButtonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default Home_Authenticated;
