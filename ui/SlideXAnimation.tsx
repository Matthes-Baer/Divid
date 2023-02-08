import { useRef, useEffect, ReactNode } from "react";
import { Animated } from "react-native";
import type { PropsWithChildren } from "react";
import type { ViewStyle } from "react-native";

type FadeInViewProps = PropsWithChildren<{
  style: ViewStyle;
  value: number;
  duration: number;
}>;

const SlideXAnimation: React.FC<FadeInViewProps> = (props: {
  children: ReactNode;
  style: ViewStyle;
  value: number;
  duration: number;
}) => {
  const slideAnim = useRef(new Animated.Value(0)).current; // Initial value

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: props.value,
      duration: props.duration,
      useNativeDriver: true,
    }).start();
  }, [slideAnim]);

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
