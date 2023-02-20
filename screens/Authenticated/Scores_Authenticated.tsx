import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
} from "react-native";

import Constants from "expo-constants";

//? Navigation
import type {
  Authenticated_Screens_Type,
  scoresArrayElement_DB,
} from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Scores">;

//? Database & Auth
import {
  readSortedScoresArray_DB,
  readTopTenSortedScoresArray_DB,
} from "../../utils/database";
import { auth } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import FlatListSingleComponent from "../../components/Scores/FlatListSingleComponent";

const Scores_Authenticated = ({ navigation, route }: Props) => {
  const [scoresArray, setScoresArray] =
    useState<Array<scoresArrayElement_DB>>();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readTopTenSortedScoresArray_DB(auth.currentUser.uid, setScoresArray);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/backgroundImages/abstract-background-3.webp")}
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - Constants.statusBarHeight,
          zIndex: -9000,
          opacity: 1,
          position: "absolute",
          bottom: 0,
          left: 0,
        }}
      />
      <Text style={styles.mainHeading}>Top 10 Scores</Text>
      {!scoresArray ? (
        <ActivityIndicator size={"large"} />
      ) : scoresArray.length > 0 ? (
        <FlatList
          data={scoresArray}
          renderItem={(data) => (
            <FlatListSingleComponent data={data.item} index={data.index} />
          )}
          keyExtractor={(item) =>
            item.score.toString() + Math.random() + item.date.total
          }
          style={styles.flatList}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text style={styles.normalTextStyle}>No Scores found yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },

  flatList: {
    width: "90%",
  },

  mainHeading: {
    fontSize: 45,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    marginTop: 35,
    marginBottom: 25,
  },

  normalTextStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },
});

export default Scores_Authenticated;
