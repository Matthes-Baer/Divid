import { View, Text, StyleSheet } from "react-native";
import type { HintItemProps } from "../../utils/interfaces-and-types";

const HintItem: React.FC<HintItemProps> = (props: {
  hintNumber: number;
  hintDividable: boolean;
  hintUsed: boolean;
}) => {
  return (
    <View style={styles.viewContainer}>
      <Text style={styles.textContainer}>
        Number to be found is {props.hintDividable ? "" : "not "}dividable by{" "}
        {props.hintNumber}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {},
  textContainer: {},
});

export default HintItem;
