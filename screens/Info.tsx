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
    </View>
  );
}

const styles = StyleSheet.create({});
