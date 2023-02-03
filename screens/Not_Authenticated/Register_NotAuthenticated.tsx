import { Dispatch, SetStateAction } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { authRegister } from "../../utils/auth";

const Start_NotAuthenticated = () => {
  const registerHandler = () => {
    authRegister("TestNew234@gmail.com", "AAAAAA234");
  };

  return (
    <View style={styles.container}>
      <Text>Not logged in</Text>
      <Button onPress={registerHandler} title="Register" />
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
