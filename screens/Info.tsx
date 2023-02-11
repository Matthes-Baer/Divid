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
        Logo erstellen mit Midjourney? Bei Home_NotAuthenticated einfügen.
      </Text>
      <Text>
        Logik: Bei Game muss noch weitergebaut werden (Sieg-Modal
        (Database-Eintrag und so) / Info-Modal) Logik: Bei Home muss noch
        weitergebaut werden (Einbindung des active Image / Leeres Image wenn
        kein active vorhanden / Noch weitere Einträge?)
      </Text>
      <Text>Styling: Home, Game, Scores & Trophies</Text>

      <Text>
        Legende/Erklärung als Modal einbauen zum Einblenden / Weitere Notizen in
        Game_Authenticated.
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
