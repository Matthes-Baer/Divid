import { View, Text } from "react-native";
import type { HintItemProps } from "../../utils/interfaces-and-types";

const HintItem: React.FC<HintItemProps> = (props: {
  hintNumber: number;
  hintDividable: boolean;
  hintUsed: boolean;
}) => {
  return (
    <View>
      <Text>
        Number to be found is {props.hintDividable ? "" : "not "}dividable by{" "}
        {props.hintNumber}
      </Text>
    </View>
  );
};

export default HintItem;
