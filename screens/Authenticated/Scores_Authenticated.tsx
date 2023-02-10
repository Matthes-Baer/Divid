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
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Scores">;

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
import { FlatList } from "react-native-gesture-handler";

const Scores_Authenticated = ({ navigation, route }: Props) => {
  const [scoresArray, setScoresArray] = useState();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readSortedScoresArrayDB(auth.currentUser.uid, setScoresArray);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Scores</Text>
      {scoresArray ? (
        <FlatList
          data={scoresArray}
          renderItem={(data) => <Text>{data.item.score}</Text>}
          keyExtractor={(item) => item.score + Math.random() + item.date.total}
        />
      ) : (
        <ActivityIndicator size={"large"} />
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
