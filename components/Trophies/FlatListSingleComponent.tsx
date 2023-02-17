import type { trophy_DB } from "../../utils/interfaces-and-types";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { auth } from "../../firebaseConfig";

//* Needed for dynamic import of images
import TROPHY_IMAGE_URL from "../../data/TrohpyData";
import { updateSingleTrophyData_DB } from "../../utils/database";
import CustomButton from "../ui/CustomButton";

const FlatListSingleComponent = (props: { data: trophy_DB; index: number }) => {
  return (
    <View style={[styles.mainViewContainer]}>
      <Text style={styles.normalTextStyle}>{props.data.name}</Text>
      <Image
        style={{
          height: 250,
          width: 250,
          backgroundColor: "transparent",
        }}
        source={
          TROPHY_IMAGE_URL.find(
            (e: { image: string; url: NodeRequire }) =>
              e.image === props.data.name
          ).url
        }
      />
      {!props.data.available ? (
        <CustomButton
          onPress={() =>
            updateSingleTrophyData_DB(
              auth.currentUser.uid,
              props.data.name,
              "available",
              true
            )
          }
          width={"100%"}
        >
          <Text style={styles.customButtonText}>Enable</Text>
        </CustomButton>
      ) : (
        <Text style={styles.normalTextStyle}>Already unlocked</Text>
      )}
    </View>
  );
};

export default FlatListSingleComponent;

const styles = StyleSheet.create({
  mainViewContainer: {
    elevation: 1,
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
    padding: 35,
    marginBottom: 25,
  },

  sectionViewContainer: {
    flexDirection: "row",
  },

  normalTextStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },

  customButtonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
