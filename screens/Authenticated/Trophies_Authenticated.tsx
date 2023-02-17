import { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
} from "react-native";

//? Navigation
import type {
  Authenticated_Screens_Type,
  trophy_DB,
} from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Trophies">;

//? Database & Auth
import { readTrophiesData_DB } from "../../utils/database";
import type { userData_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";

//* Needed for dynamic import of images
import TROPHY_IMAGE_URL from "../../data/TrohpyData";
import FlatListSingleComponent from "../../components/Trophies/FlatListSingleComponent";

const Trophies_Authenticated = ({ navigation, route }: Props) => {
  const [userData, setUserData] = useState<Array<trophy_DB>>();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readTrophiesData_DB(auth.currentUser.uid, setUserData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainHeadingViewContainer}>
        <Text style={styles.mainHeading}>
          Use your game points to unlock trophy images you can use as your main
          profile picture.
        </Text>
      </View>

      {!userData ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={userData}
          renderItem={(data) => (
            <FlatListSingleComponent data={data.item} index={data.index} />
          )}
          keyExtractor={(item) => item.name + Math.random()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
  },

  mainHeadingViewContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: "100%",
    alignItems: "center",
    padding: 15,
  },

  mainHeading: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },
});

export default Trophies_Authenticated;
