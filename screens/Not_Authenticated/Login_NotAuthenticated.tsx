import { useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { authSignin } from "../../utils/auth";
import { auth } from "../../firebaseConfig";
import { AntDesign, Feather } from "@expo/vector-icons";

import CustomButton from "../../ui/CustomButton";

const Start_NotAuthenticated = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const loginHandler = () => {
    if (!email || !password) {
      Alert.alert(
        "Insufficient Input",
        "email and/or password is missing.",
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

    authSignin(email, password);

    const waitForSigninTimeout = setTimeout(() => {
      if (!auth.currentUser) {
        Alert.alert(
          "No user found",
          "There was no user found based on this data.",
          [{ text: "OK", style: "default" }],
          { cancelable: true }
        );
      }
      setLoading(false);
    }, 5000);

    return () => clearTimeout(waitForSigninTimeout);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.heading}>Login</Text>
        <Text style={styles.inputLabel}>Email:</Text>
        <TextInput
          autoComplete="email"
          selectionColor={"rgba(25,25,25,0.25)"}
          cursorColor={"#2b2024"}
          value={email}
          onChangeText={(e: string) => setEmail(e)}
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
          <CustomButton onPress={loginHandler} loading={loading} width={"50%"}>
            {loading ? (
              <ActivityIndicator size={25} color={"#2b2024"} />
            ) : (
              "Login"
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
