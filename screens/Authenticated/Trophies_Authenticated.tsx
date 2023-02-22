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
import {
  readSpecificUserData_DB,
  readTrophiesData_DB,
} from "../../utils/database";
import type { userData_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";

//* Needed for dynamic import of images
import FlatListSingleComponent from "../../components/Trophies/FlatListSingleComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Trophies_Authenticated = ({ navigation, route }: Props) => {
  const [trophyData, setTrophyData] = useState<Array<trophy_DB>>();
  const [userData, setUserData] = useState<userData_DB>();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readTrophiesData_DB(auth.currentUser.uid, setTrophyData, true);
      readSpecificUserData_DB(auth.currentUser.uid, setUserData);
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.mainHeadingViewContainer}>
        <Text style={styles.mainHeading}>
          Use your game points to unlock trophy images you can use as your main
          profile picture.
        </Text>
        {!userData ? (
          <ActivityIndicator size={"large"} color={"#2b2024"} />
        ) : (
          <View style={styles.currencyViewContainer}>
            <Text style={styles.currencyText}>{userData.TotalScore}</Text>

            <MaterialCommunityIcons
              name="currency-krw"
              size={20}
              color="#2b2024"
            />
          </View>
        )}
      </View>

      {!trophyData ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={trophyData}
          renderItem={(data) => (
            <FlatListSingleComponent
              data={data.item}
              index={data.index}
              totalScore={userData.TotalScore}
            />
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
    width: "100%",
  },

  mainHeadingViewContainer: {
    borderBottomColor: "black",
    borderBottomWidth: 2,
    width: "100%",
    alignItems: "center",
    padding: 15,
  },

  currencyViewContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "row",
  },

  currencyText: {
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    fontSize: 17.5,
    marginRight: 5,
    fontWeight: "bold",
  },

  mainHeading: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },
});

export default Trophies_Authenticated;
