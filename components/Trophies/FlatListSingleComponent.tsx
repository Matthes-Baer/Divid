import type { trophy_DB } from "../../utils/interfaces-and-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  Dimensions,
} from "react-native";
import { auth } from "../../firebaseConfig";

//* Needed for dynamic import of images
import TROPHY_IMAGE_URL from "../../data/TrohpyData";
import {
  updateSingleTrophyData_DB,
  updateTotalScore_DB,
} from "../../utils/database";
import CustomButton from "../ui/CustomButton";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FlatListSingleComponent = (props: { data: trophy_DB; index: number }) => {
  const updateDBHandler = () => {
    updateSingleTrophyData_DB(
      auth.currentUser.uid,
      props.data.name,
      "available",
      true
    );

    updateTotalScore_DB(auth.currentUser.uid, -props.data.costs);
  };

  return (
    <View style={[styles.mainViewContainer]}>
      <Text style={styles.titleText}>{props.data.name}</Text>
      <Image
        style={{
          height: Dimensions.get("window").width * 0.95,
          width: Dimensions.get("window").width * 0.95,
          backgroundColor: "transparent",
          borderRadius: 5,
          marginBottom: 15,
        }}
        source={
          TROPHY_IMAGE_URL.find(
            (e: { image: string; url: NodeRequire }) =>
              e.image === props.data.name
          ).url
        }
      />
      {!props.data.available ? (
        <CustomButton onPress={updateDBHandler} width={"100%"}>
          <Text style={styles.customButtonText}>
            Unlock for {props.data.costs}{" "}
            <MaterialCommunityIcons
              name="currency-krw"
              size={20}
              color="#fbf9fa"
            />
          </Text>
        </CustomButton>
      ) : (
        <Text style={styles.normalTextStyle}>Already Unlocked</Text>
      )}
    </View>
  );
};

export default FlatListSingleComponent;

const styles = StyleSheet.create({
  mainViewContainer: {
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    marginBottom: 25,
    marginTop: 15,
  },

  sectionViewContainer: {
    flexDirection: "row",
  },

  normalTextStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    padding: 10,
  },

  titleText: {
    fontSize: 30,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
    padding: 10,
  },

  customButtonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
