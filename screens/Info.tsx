import { StyleSheet, View, Text } from "react-native";

export default function Start(): JSX.Element {
  return (
    <View>
      <Text>
        Potenzieller Zusatz:
        <br />
        - E-Mail-Verifikation richtig einbauen (firebase gibt error meldung
        raus) - bei Login etwas ähnliches?
        <br />- Passwort-Vergessen-Funktion einbauen - Bei Register auf Login
        verweisen (Account schon vorhanden?) - Genereller Einstellungen-Screen
        erstellen
      </Text>

      <Text>
        Logo erstellen mit Midjourney / Trophies erstellen mit Midjourney (Auch
        Bild für "None" raussuchen) - webp verwenden.
      </Text>
      <Text>
        Logik: Home ggf. aufteilen in einzelne Components / generell
        übersichtlicher gestalten
      </Text>
      <Text>
        Logik: Für Home noch weitere Einträge für UserData, ggf. Settings zum
        Anpassen?
      </Text>
      <Text>Styling: Home</Text>
      <Text>Styling: Game</Text>
      <Text>Styling: Scores</Text>
      <Text>Styling: Trophies</Text>
      <Text>
        Für Game: Bessere Score-Berechnung überlegen (Mit welchem Faktor
        subtrahiert wird / soll der erste Hint, der immer erscheint, auch schon
        subtrahiert werden vom totalScore?)
      </Text>
      <Text>
        Für Trophies: Bilder-Namen und Paths bei TropyData.ts eintragen /
        Bilder-Namen bei createUser_DB eintragen
      </Text>

      <Text>Info-Modal füllen mit Infos & Styling bearbeiten</Text>
      <View>
        <Text>
          Authenticated: Home-Screen (total points, profile pic wird angezeigt,
          wenn eines erspielt wurde), Screen für Profileinstellungen
          (Möglichkeit zum E-Mail ändern oder zum Passwort anpassen, ...),
          Screen für das eigentliche Spiel, Screen für Rewards-Shop, Screen mit
          persönlicher Rangliste (Top Scores)
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
