import { signOut } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { auth } from "../../firebaseConfig";

import type {
  additionalHint,
  Gamemode,
  Hint,
} from "../../utils/interfaces-and-types";

import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import InfoModal from "../../components/Game/InfoModal";
import CustomButton from "../../components/ui/CustomButton";
import HintItem from "../../components/Game/HintItem";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SuccessModal from "../../components/Game/SuccessModal";
import { HINTS_STATIC } from "../../data/GameData";
import { addScore_DB } from "../../utils/database";
import SlideXAnimation from "../../components/ui/SlideXAnimation";
type Props = NativeStackScreenProps<Authenticated_Screens_Type, "Game">;

// Easy: 5 - 100
// Medium: 5 - 250
// Hard: 5 - 500
const GAMEMODES: Gamemode[] = [
  { mode: "easy", factor: 100 },
  { mode: "medium", factor: 250 },
  { mode: "hard", factor: 500 },
];

const Home_Authenticated = ({ navigation }: Props) => {
  const windowDimensions = useWindowDimensions();

  const [infoModalVisible, setInfoModalVisible] = useState<boolean>(false);
  const [successModalVisible, setSuccessModalVisible] =
    useState<boolean>(false);
  const [gameMode, setGameMode] = useState(
    GAMEMODES.find((e: Gamemode) => e.mode === "easy")
  );
  const [gameNumber, setGameNumber] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [pickedNumber, setPickedNumber] = useState<number>(5);

  const [hints, setHints] = useState<Array<Hint>>([]);
  const [givenHints, setGivenHints] = useState<Array<Hint>>([]);
  const [hintsAmount, setHintsAmount] = useState<number>(givenHints.length);
  const [additionalHint, setAdditionalHint] = useState<additionalHint | null>(
    null
  );

  const [attempts, setAttempts] = useState<number>(3);
  const [totalAttempts, setTotalAttempts] = useState<number>(0);

  const gameModeSetHandler = (setMode: string) => {
    setGameMode(GAMEMODES.find((e: Gamemode) => e.mode === setMode));
  };

  const getRandomGameNumber = () => {
    const randomNumber = Math.round(
      Math.max(Math.random() * gameMode.factor, 5)
    );

    setGameNumber(randomNumber);
    return randomNumber;
  };

  const gameStartHandler = () => {
    setGameActive(true);
    const number = getRandomGameNumber();
    const HINTS = HINTS_STATIC(number);

    setHints(HINTS);
    getHintHandler(HINTS);
  };

  const getHintHandler = (HINTS?: Array<Hint>) => {
    const filteredHints: Array<Hint> =
      hints.length > 0 ? hints.filter((e: Hint) => !e.used) : HINTS;
    if (filteredHints.length === 0) {
      setAdditionalHint({ larger: gameNumber > pickedNumber ? true : false });
      setHintsAmount((prev: number) => prev + 1);
    } else {
      const randomHint: Hint =
        filteredHints[Math.floor(Math.random() * filteredHints.length)];

      setGivenHints((prev: Array<Hint>) => [...prev, randomHint]);
      setHints((prev: Array<Hint>) =>
        prev.map((e: Hint) =>
          e.number === randomHint.number ? { ...randomHint, used: true } : e
        )
      );
      setHintsAmount(givenHints.length);
    }
  };

  const guessHandler = () => {
    setTotalAttempts((prev: number) => prev + 1);

    if (gameNumber == pickedNumber) {
      const currentDate: Date = new Date();

      addScore_DB(
        auth.currentUser.uid,
        Math.max(0, gameMode.factor - totalAttempts - hintsAmount * 2),
        {
          day: currentDate.getDate(),
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          total:
            currentDate.getDate() +
            currentDate.getMonth() +
            currentDate.getFullYear(),
        },
        hintsAmount,
        totalAttempts
      );

      setSuccessModalVisible(true);
      return;
    } else {
      setAttempts((prev: number) => prev - 1);
      console.log(attempts);
      if (attempts === 1) {
        getHintHandler();
        setAttempts(3);
      }
    }
  };

  const gameResetHandler = () => {
    setGameActive(false);
    setPickedNumber(5);
    setGameNumber(null);
    setSuccessModalVisible(false);

    setHints([]);
    setGivenHints([]);
    setHintsAmount(0);
    setAdditionalHint(null);
    setTotalAttempts(0);
    setAttempts(3);
  };

  return (
    <View style={styles.mainContainer}>
      <CustomButton
        width={"75%"}
        onPress={() => setInfoModalVisible(!infoModalVisible)}
      >
        <Text style={styles.customButtonText}>How to Play</Text>
      </CustomButton>

      {!gameActive ? (
        <View style={styles.sectionViewContainer}>
          <Text style={styles.SectionHeading}>Gamemode:</Text>
          <SlideXAnimation
            value={25}
            duration={1000}
            active={gameMode.mode === "easy"}
            style={styles.gamemodePickerView}
          >
            <CustomButton
              onPress={() => gameModeSetHandler("easy")}
              width={"75%"}
            >
              <View style={styles.customButtonChildrenContainer}>
                <Text
                  style={[
                    styles.customButtonText,
                    {
                      color: gameMode.mode === "easy" ? "#2b2024" : "#fbf9fa",
                    },
                  ]}
                >
                  Easy
                </Text>
                <Text
                  style={[
                    styles.customButtonText,
                    {
                      fontSize: 10,
                      color: gameMode.mode === "easy" ? "#2b2024" : "#fbf9fa",
                    },
                  ]}
                >
                  Game number can range from 5 to 100
                </Text>
              </View>
            </CustomButton>
          </SlideXAnimation>
          <SlideXAnimation
            value={25}
            duration={1000}
            active={gameMode.mode === "medium"}
            style={styles.gamemodePickerView}
          >
            <CustomButton
              onPress={() => gameModeSetHandler("medium")}
              width={"75%"}
            >
              <View style={styles.customButtonChildrenContainer}>
                <Text
                  style={[
                    styles.customButtonText,
                    {
                      color: gameMode.mode === "medium" ? "#2b2024" : "#fbf9fa",
                    },
                  ]}
                >
                  Medium
                </Text>
                <Text
                  style={[
                    styles.customButtonText,
                    {
                      fontSize: 10,
                      color: gameMode.mode === "medium" ? "#2b2024" : "#fbf9fa",
                    },
                  ]}
                >
                  Game number can range from 5 to 250
                </Text>
              </View>
            </CustomButton>
          </SlideXAnimation>
          <SlideXAnimation
            value={25}
            duration={1000}
            active={gameMode.mode === "hard"}
            style={styles.gamemodePickerView}
          >
            <CustomButton
              onPress={() => gameModeSetHandler("hard")}
              width={"75%"}
            >
              <View style={styles.customButtonChildrenContainer}>
                <Text
                  style={[
                    styles.customButtonText,
                    {
                      color: gameMode.mode === "hard" ? "#2b2024" : "#fbf9fa",
                    },
                  ]}
                >
                  Hard
                </Text>
                <Text
                  style={[
                    styles.customButtonText,
                    {
                      fontSize: 10,
                      color: gameMode.mode === "hard" ? "#2b2024" : "#fbf9fa",
                    },
                  ]}
                >
                  Game number can range from 5 to 500
                </Text>
              </View>
            </CustomButton>
          </SlideXAnimation>

          <View style={styles.startGameButtonViewContainer}>
            <CustomButton width={"75%"} onPress={gameStartHandler}>
              <Text style={styles.customButtonText}>Start Game</Text>
            </CustomButton>
          </View>
        </View>
      ) : (
        <View>
          <TextInput
            keyboardType="numeric"
            value={pickedNumber.toString()}
            onChangeText={(e: string) => setPickedNumber(+e)}
            maxLength={3}
          />

          <Text>
            Game number: {gameNumber} / pickedNumber: {pickedNumber}
          </Text>
          <Button onPress={gameResetHandler} title="abort game"></Button>
          <Text>Hints: ...</Text>
          <Text>{attempts}</Text>
          <Button title="guess Number" onPress={guessHandler} />
          <View style={{ height: windowDimensions.height / 2 }}>
            <FlatList
              data={givenHints}
              renderItem={(hint) => {
                return (
                  <View>
                    <HintItem
                      hintNumber={hint.item.number}
                      hintDividable={hint.item.dividable}
                      hintUsed={hint.item.used}
                    />
                  </View>
                );
              }}
              keyExtractor={(hint, index) => {
                // should only be implemented in the state (item) which would be structured as an object with "key" - then this function would not be needed.
                // Or use "id", for example, and return that in this function.
                const keyValue = hint.number.toString();
                return keyValue;
              }}
            />
          </View>

          <View>
            {additionalHint ? (
              <Text>
                {additionalHint.larger
                  ? "Game Number is higher than the picked Number"
                  : "Game Number is lower than the picked number"}
              </Text>
            ) : (
              ""
            )}
          </View>
        </View>
      )}

      <InfoModal visible={infoModalVisible} setter={setInfoModalVisible} />
      <SuccessModal
        visible={successModalVisible}
        setter={setSuccessModalVisible}
        resetHandler={gameResetHandler}
        totalScore={gameMode.factor - totalAttempts - hintsAmount * 2 + 1}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    marginTop: 50,
  },

  sectionViewContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },

  customButtonChildrenContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },

  startGameButtonViewContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 50,
  },

  gamemodePickerView: {
    marginBottom: 15,
  },

  customButtonText: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },

  SectionHeading: {
    fontSize: 35,
    color: "#2b2024",
    textAlign: "center",
    fontFamily: "Rajdhani_400Regular",
    marginBottom: 10,
  },
});

export default Home_Authenticated;
