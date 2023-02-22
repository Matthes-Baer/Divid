import { StatusBar } from "expo-status-bar";
import { Modal, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.modalView}>
            <Text style={[styles.mainHeading]}>How to Play</Text>
            <View>
              <Text style={styles.SectionHeading}>Goal:</Text>
              <Text style={styles.normalText}>
                Your goal is to guess the correct number.
              </Text>
            </View>

            <View>
              <Text style={styles.SectionHeading}>Game mode:</Text>
              <Text style={styles.normalText}>
                In easy mode, the number can range from 5 to 100, while in
                medium mode it can range from 5 to 250 and from 5 to 500 in hard
                mode. The harder the game mode, the more points you can earn.
              </Text>
            </View>

            <View>
              <Text style={styles.SectionHeading}>Hints:</Text>
              <Text style={styles.normalText}>
                You start off with a single hint that tells you if the number is
                dividable or not by a specific number. With this hint, you have
                three chances to guess the right number. If you don't guess the
                correct number within these three attempts, you will receive
                another hint and another three attempts. After 20 hints, you
                will get hints on whether the number is higher or lower than
                your last guess.
              </Text>
            </View>

            <View>
              <Text style={styles.SectionHeading}>Winning:</Text>
              <Text style={styles.normalText}>
                As soon as you guess the correct number, you win the game. When
                you win a game, you receive points that you can spend in the
                Trophies area to adjust your image in the Home area. The
                potential points you may earn are reduced by each attempt and
                hint given throughout the game round.
              </Text>
            </View>
            <CustomButton
              onPress={() => props.setter(!props.visible)}
              width={150}
            >
              <Text style={styles.buttonText}>Back</Text>
            </CustomButton>
          </View>
        </ScrollView>
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
    elevation: 10,
    borderRightWidth: 4,
    borderRightColor: "#2b2024",
    borderBottomWidth: 4,
    borderBottomColor: "#2b2024",
  },

  mainHeading: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#2b2024",
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    marginBottom: 20,
  },

  SectionHeading: {
    fontSize: 35,
    color: "#2b2024",
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    marginBottom: 10,
  },

  scrollView: {
    backgroundColor: "#a80038",
  },

  normalText: {
    color: "#2b2024",
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 20,
    marginBottom: 15,
  },

  buttonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    fontSize: 25,
  },
});

export default InfoModal;
