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

//? Authenticated Screens
import Home_Authenticated from "./screens/Authenticated/Home_Authenticated";
import Game_Authenticated from "./screens/Authenticated/Game_Authenticated";
import Scores_Authenticated from "./screens/Authenticated/Scores_Authenticated";
import Trophies_Authenticated from "./screens/Authenticated/Trophies_Authenticated";

//? Not Authenticated Screens
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
import { Entypo } from "@expo/vector-icons";

//? Colors
// background: f2f2f2 (etwas gräulich)
// .first-color { (neben background auch also font-color bei dunklerem Hintergrund)
// 	background: #fbf9fa;
// }

// .second-color { (rötlich)
// 	background: #fd0054;
// }

// .third-color { (dunkler rötlich)
// 	background: #a80038;
// }

// .fourth-color { (geht ins Schwarze)
// 	background: #2b2024;

const Authenticated_Navigation = () => {
  return (
    <Authenticated_TopTabs_Navigator.Navigator
      screenOptions={{
        animationEnabled: true,
        tabBarBounces: true,
        tabBarStyle: {
          marginTop: Constants.statusBarHeight,
          borderBottomColor: "red",
        },
        tabBarActiveTintColor: "#2b2024",
        tabBarPressColor: "#fd0054",
        tabBarIndicatorStyle: { borderColor: "red" },
      }}
    >
      <Authenticated_TopTabs_Navigator.Screen
        name="Home"
        component={Home_Authenticated}
        options={{
          tabBarAccessibilityLabel: "Home Screen",
          tabBarBadge: () => (
            <AntDesign
              name="home"
              size={13}
              color="black"
              style={{ marginTop: 5, marginRight: 5 }}
            />
          ),
        }}
      />
      <Authenticated_TopTabs_Navigator.Screen
        name="Game"
        component={Game_Authenticated}
        options={{
          tabBarAccessibilityLabel: "Game Screen",
          tabBarBadge: () => (
            <Ionicons
              name="game-controller-outline"
              size={13}
              color="black"
              style={{ marginTop: 5, marginRight: 5 }}
            />
          ),
        }}
      />
      <Authenticated_TopTabs_Navigator.Screen
        name="Scores"
        component={Scores_Authenticated}
        options={{
          tabBarAccessibilityLabel: "Scores Screen",
          tabBarBadge: () => (
            <Entypo
              name="price-ribbon"
              size={13}
              color="black"
              style={{ marginTop: 5, marginRight: 5 }}
            />
          ),
        }}
      />
      <Authenticated_TopTabs_Navigator.Screen
        name="Trophies"
        component={Trophies_Authenticated}
        options={{
          tabBarAccessibilityLabel: "Trophies Screen",
          tabBarBadge: () => (
            <AntDesign
              name="Trophy"
              size={13}
              color="black"
              style={{ marginTop: 5, marginRight: 5 }}
            />
          ),
        }}
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
        headerTintColor: "#fbf9fa",
        headerStyle: {
          backgroundColor: "#fd0054",
        },
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
