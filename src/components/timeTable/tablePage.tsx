import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Schedule from "./schedule";
import {NavigationProps} from "../home/homePage.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {BackgroundColor, FontColor} from "../../config/globalStyleSheetConfig.ts";
import {fetchTable} from "../../app/slice/scheduleSlice.ts";
import {selectTheWeek} from "../../app/slice/globalSlice.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";

export const TablePage = ({navigation}: NavigationProps) => {
    const theWeek = useAppSelector(selectTheWeek);
    const [currentWeek, setCurrentWeek] = useState<number>(theWeek);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTable());
    }, [dispatch]);

    const handleGoBack = () => {
        navigation.navigate('Home');
    }

    return (
        <View style={{
            width: '100%',
            flex: 1,
        }}
        >
            <View style={{
                width: '100%',
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={styleSheet.guideBar}>
                    <Pressable onPress={handleGoBack} style={styleSheet.backButton}>
                        <SvgXml xml={XMLResources.backArrow} width={10} height={18}/>
                    </Pressable>
                    <View style={styleSheet.weekBox}>
                        <View style={styleSheet.textBox}>
                            <Text style={{
                                color: FontColor.light,
                                height: 20,
                                lineHeight: 20,
                                fontSize: 18,
                                fontWeight: '600'
                            }}>第{theWeek}周</Text>
                            {theWeek === currentWeek &&
                                <Text style={{color: FontColor.light, fontSize: 12}}>本周</Text>}
                            <Image
                                source={require('../../assets/png/leftArrow.png')}
                                style={{
                                    width: 18,
                                    height: 18,
                                    transform: [
                                        {rotate: '-90deg'}
                                    ],
                                    position: 'absolute',
                                    right: -20,
                                    top: 0,
                                }}
                            ></Image>
                        </View>
                    </View>

                    <Image
                        source={require('../../assets/png/reload.png')}
                        style={{
                            width: 26,
                            height: 26,
                            position: 'absolute',
                            right: 10,
                            bottom: '40%'
                        }}
                    ></Image>
                </View>
                <View style={styleSheet.tableWrapper}>
                    <Schedule week={currentWeek}></Schedule>
                </View>
            </View>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    guideBar: {
        paddingTop: 50,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        backgroundColor: BackgroundColor.primary,
        position: 'relative',
    },

    weekBox: {
        width: '30%',
        height: '100%',
        position: 'absolute',
        left: '35%',
        bottom: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    textBox: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    tableWrapper: {
        width: '100%',
        flex: 1,
    },

    tableContainer: {
        flex: 1,
        backgroundColor: '#932626',
    },

    dateContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    dateItem: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
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
    }
})
