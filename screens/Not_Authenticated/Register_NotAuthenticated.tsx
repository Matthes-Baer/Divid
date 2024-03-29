import { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authRegister } from "../../utils/auth";

import { AntDesign, Feather } from "@expo/vector-icons";

import CustomButton from "../../components/ui/CustomButton";
import { auth } from "../../firebaseConfig";

const Start_NotAuthenticated = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const registerHandler = () => {
    if (!email || !password || !username) {
      Alert.alert(
        "Insufficient Input",
        "email, password and/or username is missing.",
        [
          {
            text: "OK",
            style: "default",
            onPress() {
              setLoading(false);
            },
          },
        ],
        {
          cancelable: true,
          onDismiss() {
            setLoading(false);
          },
        }
      );
      return;
    }
    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "password length has to be 6 or more.",
        [
          {
            text: "OK",
            style: "default",
            onPress() {
              setLoading(false);
            },
          },
        ],
        {
          cancelable: true,
        }
      );
      return;
    }
    authRegister(email, password, username);

    const waitForRegisterTimeout = setTimeout(() => {
      if (!auth.currentUser) {
        Alert.alert(
          "Error",
          "User could not be registered. Try again in a few minutes.",
          [{ text: "OK", style: "default" }],
          {
            cancelable: true,
          }
        );
      }
      setLoading(false);
    }, 5000);

    return () => clearTimeout(waitForRegisterTimeout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          autoComplete="email"
          selectionColor={"rgba(25,25,25,0.25)"}
          cursorColor={"#2b2024"}
          value={email}
          onChangeText={(e: string) => setEmail(e)}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.inputLabel}>Username:</Text>
        <TextInput
          selectionColor={"rgba(25,25,25,0.25)"}
          cursorColor={"#2b2024"}
          value={username}
          onChangeText={(e: string) => setUsername(e)}
          style={styles.textInput}
        ></TextInput>
        <Text style={styles.inputLabel}>Password:</Text>
        <View style={styles.passwordViewContainer}>
          <TextInput
            selectionColor={"rgba(25,25,25,0.25)"}
            cursorColor={"#2b2024"}
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
        <View
          style={styles.customButtonViewContainer}
          onTouchEnd={() => setLoading(true)}
        >
          <CustomButton
            onPress={registerHandler}
            width={"50%"}
            loading={loading}
          >
            {loading ? (
              <ActivityIndicator size={25} color={"#fbf9fa"} />
            ) : (
              <Text style={styles.customButtonText}>Register</Text>
            )}
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
});
