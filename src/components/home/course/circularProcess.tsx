import React, {useEffect} from "react";
import {StyleSheet, Text, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming
} from "react-native-reanimated";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProcessProps {
    done: number;
    todo: number;
}

let CircularProcess: React.ComponentType<ProcessProps>;
CircularProcess = ({done, todo}): React.JSX.Element => {
    const innerRadius = 28;
    const circumference = 2 * Math.PI * innerRadius;
    const completion = done / todo;
    const theta = useSharedValue(2 * Math.PI);
    const animateTo = useDerivedValue(() => theta.value * completion);
    const dashoffset = useSharedValue(circumference);

    const animatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: dashoffset.value,
        }
    })

    useEffect(() => {
        dashoffset.value = withDelay(
            200,
            withTiming(circumference - animateTo.value * innerRadius, {
                duration: 1000,
            })
        );
    }, [])

    return (
      <View style={styleSheet.circularProcessContainer}>
          <Svg width="100%" height="100%" viewBox="0 0 100 100">
              <Circle
                  cx={50}
                  cy={50}
                  r={28}
                  stroke="#F6F6F6"
                  fill="none"
                  strokeWidth={8}
              />
              <AnimatedCircle
                  animatedProps={animatedProps}
                  cx={50}
                  cy={50}
                  r={28}
                  stroke="#FF6C87"
                  fill="transparent"
                  strokeWidth={8}
                  strokeDasharray={`${circumference} ${circumference}`}
                  strokeDashoffset={circumference}
                  strokeLinecap="round"
                  transform="rotate(-90, 50, 50)"
              />
          </Svg>
          <View style={styleSheet.processTextContainer}>
              <Text style={styleSheet.processText}>{todo}</Text>
          </View>
      </View>
    );
}

const styleSheet = StyleSheet.create({
    circularProcessContainer: {
        width: '100%',
        height: '100%',
        position: 'relative',
    },

    processTextContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },

    processText: {
        width: '100%',
        color: '#000',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '600',
    }
})

export default CircularProcess;
