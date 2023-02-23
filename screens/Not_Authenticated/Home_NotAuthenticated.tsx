import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { AntDesign, Feather } from "@expo/vector-icons";

import type { Not_Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<
  Not_Authenticated_Screens_Type,
  "Not_Authenticated_Home"
>;

//? Needed for custom font:
import { useCallback } from "react";
import { useFonts, Rajdhani_400Regular } from "@expo-google-fonts/rajdhani";
import * as SplashScreen from "expo-splash-screen";
import CustomButton from "../../components/ui/CustomButton";
import Constants from "expo-constants";
import FadeAnimation from "../../components/ui/FadeAnimation";
SplashScreen.preventAutoHideAsync();

const Start_NotAuthenticated = ({ navigation, route }: Props) => {
  const [fadeValue, setFadeValue] = useState<number>(1);
  //? This is needed for loading the custom font and waiting for it before rendering the component.
  let [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const registerHandler = () => {
    navigation.navigate("Register");
  };

  const signInHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container} onLayout={onLayoutRootView}>
      <FadeAnimation
        style={{
          backgroundColor: "transparent",
          borderTopColor: "#fd0054",
          borderTopWidth: 103.92, //? 2 * 60px * 0.866
          borderLeftWidth: 60,
          borderLeftColor: "transparent",
          borderRightWidth: 60,
          borderRightColor: "transparent",
          borderBottomWidth: 60,
          borderBottomColor: "transparent",
          position: "absolute",
          top: Constants.statusBarHeight,
          right: "50%",
          overflow: "hidden",
        }}
        value={fadeValue}
        duration={2000}
      ></FadeAnimation>
      <FadeAnimation
        style={{
          backgroundColor: "transparent",
          borderBottomColor: "#a80038",
          borderBottomWidth: 103.92, //? 2 * 60px * 0.866
          borderLeftWidth: 60,
          borderLeftColor: "transparent",
          borderRightWidth: 60,
          borderRightColor: "transparent",
          borderTopWidth: 60,
          borderTopColor: "transparent",
          position: "absolute",
          bottom: 0,
          right: 15,
          overflow: "hidden",
        }}
        value={fadeValue}
        duration={4000}
      ></FadeAnimation>
      <FadeAnimation
        style={{
          backgroundColor: "transparent",
          borderLeftColor: "#fd0054",
          borderLeftWidth: 103.92, //? 2 * 60px * 0.866
          borderBottomWidth: 60,
          borderBottomColor: "transparent",
          borderRightWidth: 60,
          borderRightColor: "transparent",
          borderTopWidth: 60,
          borderTopColor: "transparent",
          position: "absolute",
          bottom: "30%",
          left: 0,
          overflow: "hidden",
        }}
        value={fadeValue}
        duration={3500}
      ></FadeAnimation>
      <View style={styles.viewContainer}>
        <View style={styles.eyeFadeSymbol}>
          {fadeValue === 1 ? (
            <Feather
              name="eye-off"
              size={24}
              color="black"
              onPress={() => setFadeValue(0)}
            />
          ) : (
            <AntDesign
              name="eyeo"
              size={24}
              color="black"
              onPress={() => setFadeValue(1)}
            />
          )}
        </View>

        <Text style={styles.heading}>Divid</Text>
        <View style={[styles.customButtonViewContainer, styles.firstButton]}>
          <CustomButton onPress={registerHandler} width={"50%"}>
            <Text style={styles.customButtonText}>Register</Text>
          </CustomButton>
        </View>
        <View style={styles.customButtonViewContainer}>
          <CustomButton onPress={signInHandler} width={"50%"}>
            <Text style={styles.customButtonText}>Login</Text>
          </CustomButton>
        </View>
      </View>
    </View>
  );
};

export default Start_NotAuthenticated;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f2f2f2",
    height: "100%",
  },

  eyeFadeSymbol: {
    position: "absolute",
    top: 5,
    right: 5,
  },

  viewContainer: {
    backgroundColor: "#fbf9fa",
    padding: 15,
    borderRadius: 5,
    elevation: 10,
    width: "70%",
  },

  heading: {
    fontSize: 35,
    marginBottom: 5,
    marginLeft: "auto",
    marginRight: "auto",
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },

  inputLabel: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    marginTop: 10,
  },

  textInput: {
    borderWidth: 1,
    borderColor: "#2b2024",
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    width: "85%",
    height: 40,
    paddingLeft: 5,
    fontSize: 18,
  },

  customButtonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  passwordViewContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  customButtonViewContainer: {
    alignItems: "center",
  },

  firstButton: {
    marginTop: 15,
    marginBottom: 15,
  },
});
