import { useRef, useEffect, ReactNode } from "react";
import { Animated } from "react-native";

import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{
  style?: ViewStyle;
  value: number;
  duration: number;
}>;

const FadeAnimation: React.FC<FadeInViewProps> = (props: {
  children: ReactNode;
  style?: ViewStyle;
  value: number;
  duration: number;
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: props.value,
      duration: props.duration,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim, props.value]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        // Bind to animated value
        opacity: fadeAnim,
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default FadeAnimation;
