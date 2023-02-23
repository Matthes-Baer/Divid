import { useRef, useEffect, ReactNode } from "react";
import { Animated } from "react-native";

import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";

type SlideXAnimationProps = PropsWithChildren<{
  style?: ViewStyle;
  value: number;
  duration: number;
  active: boolean;
}>;

const SlideXAnimation: React.FC<SlideXAnimationProps> = (props: {
  children: ReactNode;
  style?: ViewStyle;
  value: number;
  duration: number;
  active: boolean;
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current; // Initial value

  useEffect(() => {
    if (props.active) {
      Animated.timing(slideAnim, {
        toValue: props.value,
        duration: props.duration,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: props.duration,
        useNativeDriver: true,
      }).start();
    }
  }, [slideAnim, props.active]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        // Bind to animated value
        transform: [{ translateX: slideAnim }],
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default SlideXAnimation;
