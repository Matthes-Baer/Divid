import { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authRegister } from "../../utils/auth";

import { AntDesign, Feather } from "@expo/vector-icons";

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
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.inputLabel}>E-Mail:</Text>
        <TextInput
          selectionColor={"#2b2024"}
          value={email}
          onChangeText={(e: string) => setEmail(e)}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.inputLabel}>Username:</Text>
        <TextInput
          selectionColor={"#2b2024"}
          value={username}
          onChangeText={(e: string) => setUsername(e)}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.inputLabel}>Password:</Text>
        <View style={styles.passwordViewContainer}>
          <TextInput
            selectionColor={"#2b2024"}
            value={password}
            onChangeText={(e: string) => setPassword(e)}
            secureTextEntry={showPassword}
            style={styles.textInput}
          ></TextInput>
          {showPassword ? (
            <Feather
              name="eye-off"
              size={24}
              color="black"
              onPress={() => setShowPassword((prev) => !prev)}
            />
          ) : (
            <AntDesign
              name="eyeo"
              size={24}
              color="black"
              onPress={() => setShowPassword((prev) => !prev)}
            />
          )}
        </View>

        <Button onPress={registerHandler} title="Register" />
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

  formContainer: {
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
});
