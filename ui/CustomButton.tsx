import { Pressable, Text, StyleSheet } from "react-native";

const CustomButton = (props: {
  onPress: Function;
  children: string;
  width: string | number;
}) => {
  return (
    <Pressable
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
    padding: 7.5,
    borderRadius: 5,
    elevation: 3.5,
  },

  text: {
    color: "#fbf9fa",
    fontFamily: "Rajdhani_400Regular",
    justifyContent: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
});
