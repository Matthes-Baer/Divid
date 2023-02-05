import { View, Text, Button, StyleSheet } from "react-native";

import type { Not_Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<
  Not_Authenticated_Screens_Type,
  "Not_Authenticated_Home"
>;

const Start_NotAuthenticated = ({ navigation, route }: Props) => {
  const registerHandler = () => {
    navigation.navigate("Register");
  };

  const signInHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Text>Not logged in - Register Screen and Log In Screen: ...</Text>
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
    backgroundColor: "purple",
    height: "100%",
  },
});
