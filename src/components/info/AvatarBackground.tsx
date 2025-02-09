import React from "react";
import {View} from "react-native";
import {Canvas, Path} from "@shopify/react-native-skia";

const AvatarBackground = () => {

    const d = "M 100 100"

    return (
        <Canvas style={{flex: 1}}>
            <Path path={d} />
        </Canvas>
    )
}

export default AvatarBackground;
