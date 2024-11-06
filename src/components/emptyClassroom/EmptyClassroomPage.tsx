import {Pressable, StyleSheet, Text, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import React from "react";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import {NavigationProps} from "../home/homePage.tsx";

const EmptyClassroomPage = ({navigation}: NavigationProps) => {
    const functionField = () => <FunctionField/>


    const handleBack = () => {
        navigation.navigate('TabNavigation');
    }

    return (
        <View style={{height: '100%', width: '100%', backgroundColor: BackgroundColor.primary}}>
            <View style={ss.titleBar}>
                <Pressable onPress={handleBack} style={ss.backButton}>
                    <SvgXml xml={XMLResources.backArrow} width={10} height={18}/>
                </Pressable>
                <Text style={ss.titleText}>空教室</Text>
            </View>
            <View style={ss.mainContainer}>
                {functionField()}
                <View style={ss.mainInfoContainer}>

                </View>
            </View>
        </View>
    )
}

const FunctionField = () => {

    return (
        <View style={ss.functionFieldContainer}>
            <View style={ss.verticalContainer}>
                <Text style={ss.locationText}>逸夫楼</Text>
                <View style={ss.refreshButton}>
                    <Text style={{
                        color: FontColor.light,
                        fontSize: FontSize.ss,
                        transform: [{translateY: -1}]
                    }}>重置</Text>
                </View>
            </View>
            <View style={[ss.verticalContainer, {alignItems: 'flex-end'}]}>
                <View style={ss.shiftButton}>
                    <View style={[{
                        backgroundColor: BackgroundColor.primary,
                        width: 46,
                        height: '100%',
                        borderRadius: 20,
                        position: 'absolute',
                        left: 0
                    }]}></View>
                    <Text style={ss.shiftButtonText}>今天</Text>
                    <Text style={ss.shiftButtonText}>明天</Text>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: BackgroundColor.iconPrimary,
                        borderRadius: 5,
                        marginHorizontal: 5
                    }}></View>
                    <Text style={{
                        color: FontColor.grey,
                        fontSize: FontSize.s,
                        transform: [{translateY: -2}]
                    }}>可用教室</Text>
                </View>
            </View>
        </View>
    )
}

const ss = StyleSheet.create({
    titleBar: {
        width: '100%',
        height: 140,
        paddingTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: BackgroundColor.primary,
        position: 'relative',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    backButton: {
        height: 24,
        width: 20,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50,
        left: 20,
    },

    titleText: {
        fontSize: FontSize.ll,
        color: FontColor.light,
        fontWeight: '600',
    },

    mainContainer: {
        flex: 1,
        paddingVertical: 25,
        paddingHorizontal: 18,
        backgroundColor: BackgroundColor.mainLight,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    functionFieldContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    verticalContainer: {
        height: 65,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    locationText: {
        fontSize: FontSize.ll,
        fontWeight: '600',
        color: FontColor.dark,
    },

    refreshButton: {
        height: 25,
        width: 60,
        backgroundColor: BackgroundColor.primary,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
    },

    shiftButton: {
        height: 25,
        width: 92,
        backgroundColor: BackgroundColor.grey,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
    },

    shiftButtonText: {
        fontSize: FontSize.s,
        fontWeight: '600',
        letterSpacing: 2,
        width: '50%',
        textAlign: 'center',
        lineHeight: 24,
    },

    mainInfoContainer: {
        marginTop: 10,
        flex: 1,
        backgroundColor: 'red',
    },

    periodButton: {
        height: 17,
        width: 32,
    }
})
export default EmptyClassroomPage;
