import { ReactNode } from "react";
import { Pressable, StyleSheet } from "react-native";

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
      android_ripple={{ color: "#a80038" }}
    >
      {props.children}
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
    elevation: 2.5,
    height: 50,
    borderBottomColor: "#2b2024",
    borderBottomWidth: 1,
    borderTopColor: "#2b2024",
    borderTopWidth: 1,
    borderRightColor: "#2b2024",
    borderRightWidth: 1,
    borderLeftColor: "#2b2024",
    borderLeftWidth: 1,
  },
});
