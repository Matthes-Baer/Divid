import { useEffect } from "react";
import { Text, StyleSheet } from "react-native";
import type { HintItemProps } from "../../utils/interfaces-and-types";
import FadeAnimation from "../ui/FadeAnimation";

const HintItem: React.FC<HintItemProps> = (props: {
  hintNumber: number;
  hintDividable: boolean;
  hintUsed: boolean;
}) => {
  return (
    <FadeAnimation style={styles.viewContainer} duration={1000} value={1}>
      <Text
        style={[
          styles.textContainer,
          { color: props.hintDividable ? "#2b2024" : "#a80038" },
        ]}
      >
        Number to be found is {props.hintDividable ? "" : "not "}dividable by{" "}
        {props.hintNumber}
      </Text>
    </FadeAnimation>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    width: "100%",
  },
  textContainer: {
    fontFamily: "Rajdhani_400Regular",
    textAlign: "justify",
    fontSize: 20,
    paddingBottom: 2.5,
    paddingTop: 2.5,
  },
});

export default HintItem;
