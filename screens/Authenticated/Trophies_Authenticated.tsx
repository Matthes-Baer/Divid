import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

//? Navigation
import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Trophies">;

//? Database & Auth
import {
  readingAllUserData,
  readSortedScoresArrayDB,
  readSpecificUserDataDB,
  updateScoresArrayDB,
  updateSingleData,
} from "../../utils/database";
import type { database_userData } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";

const Trophies_Authenticated = ({ navigation, route }: Props) => {
  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Trophies</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Trophies_Authenticated;
