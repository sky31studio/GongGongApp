import React from "react";
import {Text} from "react-native";
import {FontFamily} from "../../config/globalStyleSheetConfig.ts";

const ScalingNotAllowedText = (props: any) => {
    const {style, ...otherProps} = props;
    const customStyle = [
        style,
        {
            fontFamily: FontFamily.main
        }
    ]

    return <Text allowFontScaling={false} style={customStyle} {...otherProps}/>;
}

export default ScalingNotAllowedText;