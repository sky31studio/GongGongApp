import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import {BackgroundColor} from "../../../config/globalStyleSheetConfig.ts";
import {addOnValueChangedListener, getToken} from "../../../storage.ts";
import ClassComponent from "../course/classComponent.tsx";
import NotLoggedInComponent from "../course/notLoggedInComponent.tsx";
import AgendaComponent from "./agendaComponent.tsx";


export const AgendaList = ({hasToken}: {hasToken: boolean}) => {

    // TODO: NotLoggedInComponent for Agenda没有写
    return (
        <View style={ss.mainContainer}>
            {hasToken ? <AgendaComponent /> : <NotLoggedInComponent />}
        </View>
    )
}

const ss = StyleSheet.create({
    mainContainer: {
        backgroundColor: BackgroundColor.mainLight,
        borderRadius: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
})