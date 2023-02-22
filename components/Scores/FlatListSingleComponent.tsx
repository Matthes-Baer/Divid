import type { scoresArrayElement_DB } from "../../utils/interfaces-and-types";
import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";

const FlatListSingleComponent = (props: {
  data: scoresArrayElement_DB;
  index: number;
}) => {
  const getDate = (): string => {
    const day =
      props.data.date.day.toString().length < 2
        ? `0${props.data.date.day}`
        : props.data.date.day;
    const month =
      props.data.date.month.toString().length < 2
        ? `0${props.data.date.month}`
        : props.data.date.month;
    const year = props.data.date.year;
    const dateResult = `${day}.${month}.${year}`;

    return dateResult;
  };

  return (
    <View
      style={[
        styles.mainViewContainer,
        { backgroundColor: props.index % 2 === 0 ? "#a80038" : "#fd0054" },
      ]}
    >
      <View style={styles.sectionViewContainer}>
        <Text style={[styles.normalTextStyle]}>{props.index + 1}.</Text>
      </View>
      <View style={styles.sectionViewContainer}>
        <Text style={styles.normalTextStyle}>{getDate()}</Text>
      </View>
      <View style={styles.sectionViewContainer}>
        <Text style={[styles.normalTextStyle]}>Score: </Text>
        <Text style={styles.normalTextStyle}>{props.data.score}</Text>
      </View>
    </View>
  );
};

export default FlatListSingleComponent;

const styles = StyleSheet.create({
  mainViewContainer: {
    elevation: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",
    padding: 15,
    marginBottom: 25,
  },

  sectionViewContainer: {
    flexDirection: "row",
  },

  normalTextStyle: {
    fontSize: 20,
    fontFamily: "Rajdhani_400Regular",
    color: "#fbf9fa",
  },
});
