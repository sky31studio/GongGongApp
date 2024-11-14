import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {FontColor} from "../../../config/globalStyleSheetConfig.ts";
import XMLResources from "../../../basic/XMLResources.ts";
import ScalingNotAllowedText from "../../global/ScalingNotAllowedText.tsx";


const NotLoginComponent = () => {

    return (
        <View style={styleSheet.notLoggedContainer}>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>课程表</Text>
            </View>
            <View style={{width: 205, height: 128}}>
                <SvgXml xml={XMLResources.notLogin} width="100%"/>
            </View>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <ScalingNotAllowedText style={{color: FontColor.primary}}>登录后才能查看课表哟~</ScalingNotAllowedText>
            </View>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    notLoggedContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default NotLoginComponent;
