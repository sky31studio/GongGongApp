import React, {useEffect} from "react";
import Svg, {Circle} from "react-native-svg";
import {BackgroundColor} from "../../config/globalStyleSheetConfig.ts";
import Animated, {
    Easing,
    useAnimatedProps,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const LoadingAnimation = () => {
    const radius = 28;
    const circumference = 2 * Math.PI * radius;

    const rotateValue = useSharedValue(0);
    const strokeDashoffsetValue = useSharedValue(25);

    const circleAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{rotate: `${rotateValue.value}deg`}],
        }
    })

    const circleAnimatedProps = useAnimatedProps(() => {
        return {
            strokeDashoffset: strokeDashoffsetValue.value,
        }
    })

    useEffect(() => {
        strokeDashoffsetValue.value = withRepeat(withSequence(
            withTiming(circumference / 2, {duration: 1000, easing: Easing.inOut(Easing.linear)}),
            withTiming(25, {duration: 1000, easing: Easing.inOut(Easing.linear)}),
        ), 0);

        rotateValue.value = withRepeat(withSequence(
            withTiming(360, {duration: 1000, easing: Easing.inOut(Easing.linear)}),
        ), 0);
    }, []);

    return (
        <Animated.View style={[{flex: 1}, circleAnimatedStyle]}>
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
                <AnimatedCircle
                    animatedProps={circleAnimatedProps}
                    cx={50}
                    cy={50}
                    r={28}
                    stroke={BackgroundColor.mainLight}
                    fill="transparent"
                    strokeWidth={4}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeLinecap="round"
                    transform="rotate(0, 50, 50)"
                />
            </Svg>
        </Animated.View>
    )
}

export default LoadingAnimation;
