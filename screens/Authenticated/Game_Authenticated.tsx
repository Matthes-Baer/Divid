import { signOut } from "firebase/auth";
import { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { auth } from "../../firebaseConfig";

import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Game">;

const Home_Authenticated = ({ navigation }: Props) => {
  return (
    <View>
      <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 25 }}>
        Game
      </Text>
      <Text>{auth.currentUser.uid}</Text>
    </View>
  );
};

export default Home_Authenticated;
