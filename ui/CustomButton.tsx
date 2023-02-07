import { ReactNode } from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const CustomButton = (props: {
  onPress: Function;
  children: ReactNode;
  width: string | number;
  loading?: boolean;
}) => {
  return (
    <Pressable
      disabled={props.loading ? props.loading : false}
      onPress={() => props.onPress()}
      style={({ pressed }) => [
        {
          width: props.width,
        },
        styles.pressableContainer,
      ]}
    >
      <Text style={styles.text}>{props.children}</Text>
    </Pressable>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: "#fd0054",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    elevation: 3.5,
    height: 50,
  },

  text: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
