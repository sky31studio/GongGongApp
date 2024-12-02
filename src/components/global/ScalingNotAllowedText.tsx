import React, {useMemo} from "react";
import {Text} from "react-native";
import {FontFamily} from "../../config/globalStyleSheetConfig.ts";

const ScalingNotAllowedText = (props: any) => {
    const {style, ...otherProps} = props;
    const customStyle = useMemo(() => {
        return [
            style,
            {
                fontFamily: FontFamily.main
            }
        ]
    }, [style]);

    return <Text allowFontScaling={false} style={customStyle} {...otherProps}/>;
}

export default ScalingNotAllowedText;
