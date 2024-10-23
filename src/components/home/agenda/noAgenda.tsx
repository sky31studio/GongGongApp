import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {FontColor} from "../../../config/globalStyleSheetConfig.ts";
import XMLResources from "../../../basic/XMLResources.ts";

const NoAgendaComponent = () => {

    return (
        <View style={ss.noAgendaContainer}>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{fontSize: 18, color: '#000', fontWeight: '600'}}>倒计时</Text>
            </View>
            <View style={{width: 205, height: 128}}>
                <SvgXml xml={XMLResources.noAgenda} width="100%"/>
            </View>
            <View style={{display: 'flex', alignItems: 'center', paddingVertical: 20}}>
                <Text style={{color: FontColor.grey}}>闲时无计划，忙时多费力</Text>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    noAgendaContainer: {
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default NoAgendaComponent;
