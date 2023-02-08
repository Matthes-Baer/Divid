import { View, Text, Button, StyleSheet } from "react-native";

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
import CustomButton from "../../ui/CustomButton";
import SlideXAnimation from "../../ui/SlideXAnimation";
SplashScreen.preventAutoHideAsync();

const Start_NotAuthenticated = ({ navigation, route }: Props) => {
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
      <SlideXAnimation
        style={{
          width: 250,
          height: 75,
          backgroundColor: "powderblue",
          position: "absolute",
          bottom: 0,
          right: -100,
          overflow: "hidden",
        }}
        value={-300}
        duration={5000}
      >
        <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>
          Fading in
        </Text>
      </SlideXAnimation>
      <View style={styles.viewContainer}>
        <Text style={styles.heading}>Divid</Text>
        <View style={[styles.customButtonViewContainer, styles.firstButton]}>
          <CustomButton onPress={registerHandler} width={"50%"}>
            Register
          </CustomButton>
        </View>
        <View style={styles.customButtonViewContainer}>
          <CustomButton onPress={signInHandler} width={"50%"}>
            Login
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
