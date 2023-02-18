import { Picker } from "@react-native-picker/picker";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { trophy_DB, userData_DB } from "../../utils/interfaces-and-types";
import { Entypo } from "@expo/vector-icons";

const PickerModal = (props: {
  visible: boolean;
  setter: Function;
  activeImageHandler: Function;
  trophiesArray: Array<trophy_DB>;
  activeTrophyImage: string;
  userData: userData_DB;
}) => {
  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.setter(!props.visible);
        }}
      >
        <View style={styles.centeredView}>
          <Pressable
            onPress={() => props.setter(false)}
            style={styles.closePressable}
          >
            <Entypo name="cross" size={30} color="#fbf9fa" />
          </Pressable>

          <Text style={styles.headinTextStyle}>Profile Image Change</Text>

          {!props.trophiesArray ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Picker
              selectedValue={
                !props.activeTrophyImage && !props.userData ? (
                  <ActivityIndicator size={"large"} />
                ) : props.activeTrophyImage ? (
                  props.activeTrophyImage
                ) : (
                  props.userData.trophyImage
                )
              }
              onValueChange={(value, index) =>
                props.activeImageHandler(value, index)
              }
              mode="dropdown" // Android only
              style={styles.picker}
            >
              <Picker.Item label="None" value="None" />

              {props.trophiesArray.map((e: trophy_DB) => (
                <Picker.Item key={e.name} label={e.name} value={e.name} />
              ))}
            </Picker>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    marginBottom: "auto",
    marginTop: "125%",
    marginLeft: "auto",
    marginRight: "auto",
    width: "90%",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#2b2024",
    borderTopWidth: 2,
    borderBottomColor: "#2b2024",
    borderBottomWidth: 2,
    borderRightColor: "#2b2024",
    borderRightWidth: 2,
    borderLeftColor: "#2b2024",
    borderLeftWidth: 2,
    backgroundColor: "#f2f2f2",
    elevation: 3.5,
  },

  closePressable: {
    position: "absolute",
    top: 0,
    right: 0,
    padding: 5,
    backgroundColor: "#2b2024",
  },

  picker: {
    marginVertical: 30,
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: "#666",
    fontFamily: "Rajdhani_400Regular",
  },

  headinTextStyle: {
    fontSize: 27,
    fontFamily: "Rajdhani_400Regular",
    color: "#2b2024",
  },
});

export default PickerModal;
