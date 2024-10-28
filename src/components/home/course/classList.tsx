import React, {memo} from "react";
import {StyleSheet, View} from "react-native";
import {BackgroundColor} from "../../../config/globalStyleSheetConfig.ts";
import ClassComponent from "./classComponent.tsx";
import NotLoginComponent from "./notLoginComponent.tsx";

const ClassList = memo(({hasToken}: { hasToken: boolean }) => {

    return (
        <View>
            <View style={ss.mainContainer}>
                {hasToken ? <ClassComponent/> : <NotLoginComponent/>}
            </View>
        </View>
    )

})

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

export default ClassList;
