import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

//? Navigation
import type {
  Authenticated_Screens_Type,
  scoresArrayElement_DB,
} from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Scores">;

//? Database & Auth
import {
  readAllUserData_DB,
  readSortedScoresArray_DB,
  readSpecificUserData_DB,
  addScore_DB,
  updateSingleData_DB,
} from "../../utils/database";
import type { userData_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";

const Scores_Authenticated = ({ navigation, route }: Props) => {
  const [scoresArray, setScoresArray] =
    useState<Array<scoresArrayElement_DB>>();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readSortedScoresArray_DB(auth.currentUser.uid, setScoresArray);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Scores</Text>
      {!scoresArray ? (
        <ActivityIndicator size={"large"} />
      ) : scoresArray.length > 0 ? (
        <FlatList
          data={scoresArray}
          renderItem={(data) => <Text>{data.item.score}</Text>}
          keyExtractor={(item) =>
            item.score.toString() + Math.random() + item.date.total
          }
        />
      ) : (
        <Text>Nothing found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Scores_Authenticated;
