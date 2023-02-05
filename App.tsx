import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View, Animated, Easing } from "react-native";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useEffect, useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import type { RootStackParamList } from "./utils/interfaces-and-types";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Home_Authenticated from "./screens/Authenticated/Home_Authenticated";
import Game_Authenticated from "./screens/Authenticated/Game_Authenticated";

import Home_NotAuthenticated from "./screens/Not_Authenticated/Home_NotAuthenticated";
import Login_NotAuthenticated from "./screens/Not_Authenticated/Login_NotAuthenticated";
import Register_NotAuthenticated from "./screens/Not_Authenticated/Register_NotAuthenticated";

import Constants from "expo-constants";

const Authenticated_TopTabs_Navigator = createMaterialTopTabNavigator();
const Not_Authenticated_Stack_Navigator = createStackNavigator();
const Main = createStackNavigator<RootStackParamList>();

// https://icons.expo.fyi/
import { AntDesign } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Authenticated_Navigation = () => {
  return (
    <Authenticated_TopTabs_Navigator.Navigator
      screenOptions={{
        animationEnabled: true,
        tabBarBounces: true,
        tabBarStyle: { marginTop: Constants.statusBarHeight },
      }}
    >
      <Authenticated_TopTabs_Navigator.Screen
        name="Home"
        component={Home_Authenticated}
      />
      <Authenticated_TopTabs_Navigator.Screen
        name="Game"
        component={Game_Authenticated}
      />
    </Authenticated_TopTabs_Navigator.Navigator>
  );
};

const Not_Authenticated_Navigation = () => {
  return (
    <Not_Authenticated_Stack_Navigator.Navigator
      screenOptions={{
        cardStyleInterpolator:
          CardStyleInterpolators.forRevealFromBottomAndroid,
        headerStyle: { marginTop: Constants.statusBarHeight },
      }}
    >
      <Not_Authenticated_Stack_Navigator.Screen
        name="Not_Authenticated_Home"
        component={Home_NotAuthenticated}
        options={{ headerShown: false }}
      />
      <Not_Authenticated_Stack_Navigator.Screen
        name="Login"
        component={Login_NotAuthenticated}
      />
      <Not_Authenticated_Stack_Navigator.Screen
        name="Register"
        component={Register_NotAuthenticated}
      />
    </Not_Authenticated_Stack_Navigator.Navigator>
  );
};

export default function App() {
  const [userData, setUserData] = useState<User | null>();

  useEffect(() => {
    onAuthStateChanged(auth, (user: User) => {
      if (user) {
        setUserData(user);
      } else {
        console.log("no user found");
        setUserData(null);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Main.Navigator>
        {/* //? Anstatt einzelne Components sollte es jeweils einen Navigator Stack für Authenticated und einen für Not_Authenticated geben (also nested Navigation) */}
        <Main.Screen
          name="Start"
          component={
            userData ? Authenticated_Navigation : Not_Authenticated_Navigation
          }
          options={{
            headerShown: false,
            cardStyleInterpolator:
              CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
      </Main.Navigator>
      <StatusBar backgroundColor="black" />
    </NavigationContainer>
  );

  // if (loggedin) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>{userData && userData.uid}</Text>
  //       <Button onPress={signOutHandler} title="Log out" />
  //       <Button
  //         onPress={() => writeUserData(userData.uid, "Tester", "test@gmx.com")}
  //         title="Test DB"
  //       />
  //       <Button onPress={() => ReadTest(userData.uid)} title="Read DB" />
  //       <Button onPress={() => updateData(userData.uid)} title="update DB" />
  //       <StatusBar style="auto" />
  //     </View>
  //   );
  // } else {
  //   // return <Start_NotAuthenticated loginSetter={setLoggedin} />;
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
