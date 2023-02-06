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
      <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 25 }}>
        Not logged in - Register Screen and Log In Screen: ...
      </Text>
      <Button onPress={registerHandler} title="Register" />
      <Button onPress={signInHandler} title="Log in" />
    </View>
  );
};

export default Start_NotAuthenticated;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: "100%",
  },
});
