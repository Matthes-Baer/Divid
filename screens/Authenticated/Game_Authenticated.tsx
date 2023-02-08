import { signOut } from "firebase/auth";
import { useCallback, useEffect, useMemo, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { auth } from "../../firebaseConfig";

import type { Gamemode } from "../../utils/interfaces-and-types";

import type { Authenticated_Screens_Type } from "../../utils/interfaces-and-types";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import InfoModal from "../../components/Game/InfoModal";
import CustomButton from "../../components/ui/CustomButton";
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [gameMode, setGameMode] = useState(
    GAMEMODES.find((e: Gamemode) => e.mode === "easy")
  );
  const [gameNumber, setGameNumber] = useState<number | null>(null);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [pickedNumber, setPickedNumber] = useState<number | null>(null);

  const gameModeSetHandler = (setMode: string) => {
    setGameMode(GAMEMODES.find((e: Gamemode) => e.mode === setMode));
  };

  const gameStartHandler = () => {
    setGameActive(true);
    getRandomGameNumber();
    // state mit Array mit Objekten für jeden Tipp (conditional testen, ob die Zahl jeweils die Bedingung erfüllt (beispielsweise teilbar durch 4)) - key für "used", nur "unused" hints werden weiterhin ausgegeben - wenn alle "used" sind, muss eine Meldung geben mit den letzten 3 Versuchen, danach hat man verloren und die game Number wird angezeigt
    // state mit Versuchsanzahl
    // state mit Hinweisanzahl
    // Anfangstipp (bspw: Zahl ist teilbar durch 5) und dann geht es los.
    // Man hat dann 3 Versuche. Danach erhält man einen weiteren Tipp - oder man holt sich vorher den nächsten Tipp ein und hat dann wieder 3 Versuche
  };

  const nextRoundHandler = () => {
    if (gameNumber == pickedNumber) {
      // let totalScore = 0
      // Database-Eintrag...
      // won? true
      // Animation einbauen für Bereich, der dann aufkommt... (ähnlich wie bei fadeIn)
    } else {
      // Versuchsstate-- -> wenn = 0, dann neuer Tipp & Hinweisstate++ & Versuche = 3 & Hinweis als "used" markieren / Kann auch vorher neuen Tipp einholen, dann wird das gleiche Prozedere wie bei Versuche = 0 eingeleitet.
      // zufälligen Hinweis aus Array raussuchen (filter und dann Math.random)
    }
  };

  const getRandomGameNumber = () => {
    const randomNumber = Math.round(
      Math.max(Math.random() * gameMode.factor, 5)
    );

    setGameNumber(randomNumber);
  };

  return (
    <View>
      <View style={{ opacity: modalVisible ? 0.25 : 1 }}>
        <Text style={{ fontFamily: "Rajdhani_400Regular", fontSize: 25 }}>
          Game
        </Text>
        <Text>{auth.currentUser.uid}</Text>
        <Button title="modal" onPress={() => setModalVisible(!modalVisible)} />

        {!gameActive ? (
          <View>
            <Text>Gamemode:</Text>
            <CustomButton
              onPress={() => gameModeSetHandler("easy")}
              width={"50%"}
            >
              Easy
            </CustomButton>
            <CustomButton
              onPress={() => gameModeSetHandler("medium")}
              width={"50%"}
            >
              Medium
            </CustomButton>
            <CustomButton
              onPress={() => gameModeSetHandler("hard")}
              width={"50%"}
            >
              Hard
            </CustomButton>
            <Text>
              {gameMode.mode}: {gameMode.factor}
            </Text>
            <Button title="start game" onPress={gameStartHandler} />
            <Text>Game not started yet.</Text>
          </View>
        ) : (
          <View>
            <Text>Game active: {gameNumber}</Text>
            <Button
              onPress={() => setGameActive(false)}
              title="abort game"
            ></Button>
            <Text>Hints: ...</Text>
          </View>
        )}

        <InfoModal visible={modalVisible} setter={setModalVisible} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default Home_Authenticated;
