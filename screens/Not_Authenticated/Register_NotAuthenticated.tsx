import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authRegister } from "../../utils/auth";

const Start_NotAuthenticated = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const registerHandler: () => void = (): void => {
    authRegister(email, password, username);
  };

  return (
    <View style={styles.container}>
      <Text>Register</Text>
      <Text>E-Mail:</Text>
      <TextInput
        value={email}
        onChangeText={(e: string) => setEmail(e)}
        style={styles.textInput}
      ></TextInput>
      <Text>Username:</Text>
      <TextInput
        value={username}
        onChangeText={(e: string) => setUsername(e)}
        style={styles.textInput}
      ></TextInput>
      <Text>Password:</Text>
      <TextInput
        value={password}
        onChangeText={(e: string) => setPassword(e)}
        secureTextEntry={showPassword}
        style={styles.textInput}
      ></TextInput>
      <Button
        title="show/hide password"
        onPress={() => setShowPassword((prev) => !prev)}
      />
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

  textInput: {
    width: "25%",
    backgroundColor: "red",
  },
});
