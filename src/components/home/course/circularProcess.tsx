import React from "react";
import {StyleSheet, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {useAnimatedProps, useDerivedValue, useSharedValue, withTiming} from "react-native-reanimated";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProcessProps {
    done: number;
    todo: number;
}

let CircularProcess: React.ComponentType<ProcessProps>;
CircularProcess = ({done, todo}): React.JSX.Element => {
    const innerRadius = 30;
    const circumference = 2 * Math.PI * innerRadius;
    const completion = done / todo;
    const theta = useSharedValue(2 * Math.PI);
    const animateTo = useDerivedValue(() => theta.value * completion);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: withTiming(animateTo.value * innerRadius, {
                duration: 3000,
            })
        }
    })

    return (
      <View style={styleSheet.circularProcessContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 100 100">
              <Circle
                  cx={50}
                  cy={50}
                  r={30}
                  stroke="#F6F6F6"
                  fill="none"
                  strokeWidth={8}
              />
              <AnimatedCircle
                  animatedProps={animatedProps}
                  cx={50}
                  cy={50}
                  r={30}
                  stroke="#FF6C87"
                  fill="transparent"
                  strokeWidth={8}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={circumference}
                  strokeLinecap="round"
              />
          </Svg>
      </View>
    );
}

const styleSheet = StyleSheet.create({
    circularProcessContainer: {
        width: '100%',
        height: '100%',
    },
})

export default CircularProcess;
