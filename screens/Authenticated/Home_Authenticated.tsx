import { signOut } from "firebase/auth";
import { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  StatusBar,
} from "react-native";

//? Navigation
import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Home">;

//? Database & Auth
import {
  readSpecificUserData_DB,
  updateSingleData_DB,
  readTrophiesData_DB,
} from "../../utils/database";
import type { userData_DB, trophy_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";
import { Picker } from "@react-native-picker/picker";
import TROPHY_IMAGE_URL from "../../data/TrohpyData";
import CustomButton from "../../components/ui/CustomButton";
import FadeAnimation from "../../components/ui/FadeAnimation";
import PickerModal from "../../components/Home_Authenticated/PickerModal";

import Constants from "expo-constants";

const Home_Authenticated = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<userData_DB>();
  const [activeTrophyImage, setActiveTrophyImage] = useState<string>();
  const [trophiesArray, setTrophiesArray] = useState<Array<trophy_DB>>();
  const [changePictureBoolean, setChangePictureBoolean] =
    useState<boolean>(false);

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
      readTrophiesData_DB(auth.currentUser.uid, setTrophiesArray, true, true);
    }
  }, []);

  const activeImageHandler = (value, index) => {
    updateSingleData_DB(auth.currentUser.uid, value, "/trophyImage");
    setActiveTrophyImage(value);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: changePictureBoolean ? "rgba(0,0,0,0.1)" : "#f2f2f2",
        },
      ]}
    >
      {!userData ? (
        <ActivityIndicator size={"large"} color={"#2b2024"} />
      ) : (
        <View style={styles.topBarViewContainer}>
          <Text style={styles.userNameText}>Hello, {userData.username}</Text>
          <CustomButton onPress={signOutHandler} width={"25%"}>
            <Text style={styles.customButtonText}>Logout</Text>
          </CustomButton>
        </View>
      )}

      <View style={styles.midPartViewContainer}>
        <Text style={styles.normalTextStyle}>
          Play a game and pick a trophy image in the Trophies section which can
          be enabled on this home screen.
        </Text>

        {!activeTrophyImage && !userData ? (
          <ActivityIndicator size={"large"} color={"#2b2024"} />
        ) : (
          <View style={{ marginTop: 10 }}>
            <Image
              style={{
                height: Dimensions.get("window").width * 0.85,
                width: Dimensions.get("window").width * 0.95,
                backgroundColor: "transparent",
                borderRadius: 5,
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
        {trophiesArray && userData ? (
          <PickerModal
            visible={changePictureBoolean}
            activeTrophyImage={activeTrophyImage}
            activeImageHandler={activeImageHandler}
            setter={setChangePictureBoolean}
            trophiesArray={trophiesArray}
            userData={userData}
          />
        ) : null}

        <View style={styles.changePictureMainViewContainer}>
          <CustomButton
            width={"75%"}
            onPress={() => setChangePictureBoolean(true)}
          >
            <Text style={styles.customButtonText}>Change Picture</Text>
          </CustomButton>
        </View>
      </View>
      <Image
        source={require("../../assets/backgroundImages/abstract-background-1.webp")}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height,
          zIndex: -9000,
          opacity: 0.15,
          position: "absolute",
          top: Constants.statusBarHeight,
          left: 0,
        }}
      />
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
    marginTop: 15,
    padding: 7.5,
  },

  midPartViewContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 25,
  },

  changePictureMainViewContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 15,
  },

  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
  },

  normalTextStyle: {
    fontSize: 25,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    paddingLeft: 15,
    paddingRight: 15,
    textAlign: "justify",
  },

  userNameText: {
    fontSize: 30,
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
