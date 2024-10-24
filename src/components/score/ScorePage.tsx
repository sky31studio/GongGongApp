import {Pressable, StyleSheet, Text, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import React from "react";
import {NavigationProps} from "../home/homePage.tsx";


const ScorePage = ({navigation}: NavigationProps) => {

    const handleBack = () => {
        navigation.navigate('HomePage');
    }

    return (
        <View>
            <View style={ss.titleBar}>
                <Pressable onPress={handleBack} style={ss.backButton}>
                    <SvgXml xml={XMLResources.backArrow} width={10} height={18} />
                </Pressable>

                <Text style={ss.titleText}>查成绩</Text>
            </View>
            <View style={ss.mainContainer}>
                <View style={ss.totalContainer}>
                    <ScoreBox score={'3.703'} text={'平均绩点'} />
                    <ScoreBox score={'1'} text={'班级排名'} />
                    <ScoreBox score={'4'} text={'年级排名'} />
                    <ScoreBox score={'86.92'} text={'平均成绩'} />
                </View>
            </View>
        </View>
    )
}

const ScoreBox = ({score, text}: {score: string, text: string}) => {

    return (
        <View style={ss.scoreBoxContainer}>
            <Text style={{color: FontColor.primary, fontSize: FontSize.xxl, fontWeight: '400'}}>{score}</Text>
            <Text style={{color: FontColor.dark, fontSize: FontSize.xxs}}>{text}</Text>
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
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{translateY: -20}],
    },

    totalContainer: {
        width: '86%',
        height: 70,
        borderRadius: 13,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    scoreBoxContainer: {
        width: 60,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }
})

export default ScorePage;
