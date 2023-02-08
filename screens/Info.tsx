import { StyleSheet, View, Text } from "react-native";

export default function Start(): JSX.Element {
  return (
    <View>
      <Text>
        Potenzieller Zusatz:
        <br />
        - E-Mail-Verifikation richtig einbauen (firebase gibt error meldung
        raus) - bei Login etwas ähnliches?
        <br />
        - Passwort-Vergessen-Funktion einbauen
        <br />- Bei Register auf Login verweisen (Account schon vorhanden?)
      </Text>

      <Text>
        Logo erstellen mit Midjourney? Bei Home_NotAuthenticated einfügen.
      </Text>
      <Text>
        Mit Home_Authenticated oder Game-Logik weitermachen? Ggf. erst
        Auth-Funktionen/Database-Funtkionen auf das Game anpassen?
      </Text>

      <Text>
        Game: Zuerst Planung durchführen/aufschreiben / Hints: Teilbar durch x
        ..., größer oder kleiner als letzter Tipp? / Legende/Erklärung als Modal
        einbauen zum Einblenden
      </Text>
      <View>
        <Text>
          Für Database-Struktur: db('user') - Array mit Objekten jeweils: (uid:
          ..., username: ..., Email?: ..., Scores: Array mit Objekten
          jeweils:(score, data, used tips?, ), total points (für rewards?))
        </Text>
        <Text>
          Bereich einbauen, wo man abhängig von den totalPoints Bilder
          freispielen kann (mittels Midjourney erstellt)?
        </Text>
      </View>
      <View>
        <Text>
          In App.tsx wird gecheckt, ob jemand eingeloggt ist: Wenn nein, wird
          landet man im Not_Authenticated_Bereich Startübersicht mitsamt LogIn &
          Register Möglichkeiten. Wenn eingeloggt, landet man im
          Authenticated-Screen-Bereich
        </Text>
        //! Hierauf wahrscheinlich zuerst Fokus legen?
        <Text>
          Login-Screen (Form), Register-Screen (Form) + Möglichkeit für Username
          hinzufügen, Main-Start-Screen, Generelle Database-Struktur festlegen
          für alles
        </Text>
        <Text>
          Not authenticated: Start_NotAuthenticated Component, Login-Screen
          (nach Klick auf Login-Button), Register-Screen (nach Klick auf
          Register-Button)
        </Text>
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
