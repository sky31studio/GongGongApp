import React, {useState} from "react";
import {StyleSheet, View} from "react-native";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";
import {FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";

const TruncatedTextContainer = (
    {
        text
    }: {
        text: string
    }
) => {

    const [isTruncated, setIsTruncated] = useState(false);

    const handleTextLayout = (e: any) => {
        const lines = e.nativeEvent.lines;

        if(lines.length > 4) {
            setIsTruncated(true);
        } else {
            setIsTruncated(false);
        }
    }

    return (
        <View style={ss.mainContainer}>
            <ScalingNotAllowedText
                style={{
                    fontSize: FontSize.ll
                }}
                onTextLayout={handleTextLayout}
                numberOfLines={4}
                ellipsizeMode={"tail"}
            >
                {text}
            </ScalingNotAllowedText>
            {isTruncated && (
                <View>
                    <ScalingNotAllowedText style={{fontWeight: '800', color: FontColor.secondary, fontSize: FontSize.l}}>全文</ScalingNotAllowedText>
                </View>
            )}
        </View>
    )
}

export default TruncatedTextContainer;

const ss = StyleSheet.create({
    mainContainer: {
        width: '100%',
    }
})
