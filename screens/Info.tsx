import { StyleSheet, View, Text } from "react-native";

export default function Start(): JSX.Element {
  return (
    <View>
      <Text>Eigene Font aktivieren</Text>
      <Text>
        Authentication mit Firebase einrichten - Favoriten entsprechend etwas
        aufräumen
      </Text>
      <Text>
        Database-Funktionen mit Firebase einrichten, die als authenticated user
        genutzt werden können - uids verwenden für database Einträge
      </Text>
      <Text>Routing, ...</Text>
      <View>
        <Text>
          Bei Auth-Nutzer-Erstellung auch Databse-Erstellung hinzufügen für neue
          Nutzer (auf Basis der uid)
        </Text>
        <Text>
          Für Database-Struktur: db('user') - Array mit Objektten jeweils: (uid:
          ..., username: ..., Email?: ..., Scores: Array mit Objektten
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
