import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../ui/CustomButton";

type PropsType = {
  visible: boolean;
  setter: Function;
};

const InfoModal: React.FC<PropsType> = (props: {
  visible: boolean;
  setter: Function;
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.setter(!props.visible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.upperTextView}>
              <Text style={[styles.textStyle, styles.wonText]}>
                How to Play
              </Text>
            </View>
            <CustomButton
              onPress={() => props.setter(!props.visible)}
              width={150}
            >
              <Text style={styles.buttonText}>Back</Text>
            </CustomButton>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a80038",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#f2f2f2",
    borderRadius: 15,
    padding: 50,
    alignItems: "center",
    shadowColor: "#2b2024",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  upperTextView: {
    marginBottom: 15,
  },

  buttonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 25,
  },

  totalScoreText: {
    fontSize: 35,
  },

  textStyle: {
    color: "#2b2024",
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 35,
    marginBottom: 10,
  },

  wonText: {
    fontSize: 50,
  },
});

export default InfoModal;
