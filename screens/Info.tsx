import { View, Text } from "react-native";

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
        Logik: Für Home noch weitere Einträge für UserData, ggf. Settings zum
        Anpassen?
      </Text>

      <Text>
        Game: How to play Modal Information Korrektur lesen (noch erwähnen,
        welche Punkte es bei easy, medium & hard geben kann?)
      </Text>

      <Text>
        Styling: Überall fehlt es noch an Background und ggf. Feinschliff
      </Text>

      <Text>
        Anfangs-Ladescreen-Bild anpassen (splash image, background color, ...)
        in app.json
      </Text>
      <Text>
        Für Game: Bessere Score-Berechnung überlegen (Mit welchem Faktor
        subtrahiert wird / soll der erste Hint, der immer erscheint, auch schon
        subtrahiert werden vom totalScore?)
      </Text>
      <Text>
        Für Trophies: Richtige Preise überlegen - abstimmen mit Punkten, die man
        gewinnt.
      </Text>
      <Text>
        Für Trophies: Bilder-Namen und Paths bei TropyData.ts eintragen /
        Bilder-Namen bei createUser_DB eintragen
      </Text>

      <Text>
        Bei Info-Modal ggf. noch anpassen, ob es sich um das Bild nur beim Home
        Screen handelt oder auch bei anderen Screens (derzeit nur bei Home)
      </Text>

      <Text>
        Für Screen Navigation Top Bar bei Authenticated noch anderen Style
        nutzen? Andere Farbe für diese border bottom bspw.
      </Text>

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
