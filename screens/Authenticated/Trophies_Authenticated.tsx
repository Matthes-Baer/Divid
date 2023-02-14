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
  readAllUserData_DB,
  readSortedScoresArray_DB,
  readSpecificUserData_DB,
  addScore_DB,
  updateSingleData_DB,
  readTrophiesData_DB,
} from "../../utils/database";
import type { userData_DB } from "../../utils/interfaces-and-types";
import { auth } from "../../firebaseConfig";
import { FlatList } from "react-native-gesture-handler";

//* Needed for dynamic import of images
import TROPHY_IMAGE_URL from "../../data/TrohpyData";

const Trophies_Authenticated = ({ navigation, route }: Props) => {
  const [userData, setUserData] = useState<Array<trophy_DB>>();

  useEffect(() => {
    if (!auth.currentUser) {
      navigation.navigate("Start");
    } else {
      readTrophiesData_DB(auth.currentUser.uid, setUserData);

      //   const Image = require(URL);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Trophies</Text>
      {!userData ? (
        <ActivityIndicator size={"large"} />
      ) : (
        <FlatList
          data={userData}
          renderItem={(data) => (
            <View>
              <Text>{data.item.name}</Text>
              <View>
                <Image
                  style={{
                    height: 250,
                    width: 250,
                    backgroundColor: "transparent",
                  }}
                  source={
                    TROPHY_IMAGE_URL.find(
                      (e: { image: string; url: NodeRequire }) =>
                        e.image === data.item.name
                    ).url
                  }
                />
              </View>
            </View>
          )}
          keyExtractor={(item) => item.name + Math.random()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});

export default Trophies_Authenticated;
