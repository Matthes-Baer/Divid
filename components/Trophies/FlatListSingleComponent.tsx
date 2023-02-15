import type { trophy_DB } from "../../utils/interfaces-and-types";
import { View, Text, StyleSheet, Image, Button } from "react-native";
import { auth } from "../../firebaseConfig";

//* Needed for dynamic import of images
import TROPHY_IMAGE_URL from "../../data/TrohpyData";
import { updateSingleTrophyData_DB } from "../../utils/database";
import CustomButton from "../ui/CustomButton";

const FlatListSingleComponent = (props: { data: trophy_DB; index: number }) => {
  return (
    <View
      style={[
        styles.mainViewContainer,
        { backgroundColor: props.index % 2 === 0 ? "#a80038" : "#fd0054" },
      ]}
    >
      <Text>
        {props.data.name} / {JSON.stringify(props.data.available)}
      </Text>
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
          <Text>Enable</Text>
        </CustomButton>
      ) : null}
    </View>
  );
};

export default FlatListSingleComponent;

const styles = StyleSheet.create({
  mainViewContainer: {
    elevation: 5,
    justifyContent: "space-between",
    flexDirection: "column",
    width: "100%",
    padding: 15,
    marginBottom: 25,
  },

  sectionViewContainer: {
    flexDirection: "row",
  },

  normalTextStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#fbf9fa",
  },
});
