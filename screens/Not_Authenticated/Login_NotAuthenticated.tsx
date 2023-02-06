import { Dispatch, SetStateAction } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { authSignin } from "../../utils/auth";

const Start_NotAuthenticated = () => {
  const signInHandler = () => {
    authSignin("TestNew235@gmail.com", "AAAAAA235");
    // props.loginSetter(true);
  };

  return (
    <View style={styles.container}>
      <Text>Not logged in</Text>

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
