import {Pressable, StyleSheet, Text, View} from "react-native";
import {createSlice} from "@reduxjs/toolkit";
import React, {useState} from "react";
import {SvgXml} from "react-native-svg";
import {BackgroundColor} from "../../../config/globalStyleSheetConfig.ts";
import Resources from "../../../basic/Resources.ts";
import {getToken} from "../../../storage.ts";

const addXml = `
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 1.17645V7.17645" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M7 4.17642H1" stroke="white" stroke-width="0.8" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`;



const agendaComponent = () => {

    const handleAddCountdown = async () => {
    }

    return (
        <View style={ss.agendaContainer}>
            <View style={ss.functionContainer}>
                <Pressable onPress={handleAddCountdown}>
                    <View style={ss.addContainer}>
                        <SvgXml xml={addXml} width="10" height="10" />
                        <Text style={ss.addText}>添加倒计时</Text>
                    </View>
                </Pressable>

                <View style={ss.chosenContainer}>

                </View>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    agendaContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },

    functionContainer: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },

    addContainer: {
        height: 26,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: BackgroundColor.primary,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        alignItems: 'center',
    },

    addText: {
        marginLeft: 3,
        fontSize: 13,
        height: 30,
        lineHeight: 30,
        color: 'white',
    },

    chosenContainer: {

    }
})

export default agendaComponent;
