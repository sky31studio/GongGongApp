import React, {useMemo} from "react";
import {Text} from "react-native";
import {FontColor, FontFamily} from "../../config/globalStyleSheetConfig.ts";

const ScalingNotAllowedText = (props: any) => {
    const {style, ...otherProps} = props;
    const customStyle = useMemo(() => {
        return [
            {
                fontFamily: FontFamily.main,
                color: FontColor.dark,
            },
            style,
        ]
    }, [style]);

    return <Text allowFontScaling={false} style={customStyle} {...otherProps}/>;
}

export default ScalingNotAllowedText;
