import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect} from "react";
import Schedule from "./schedule";
import {NavigationProps} from "../home/homePage.tsx";
import {useAppDispatch} from "../../app/hooks.ts";
import {BackgroundColor} from "../../config/globalStyleSheetConfig.ts";
import {fetchTable} from "../../app/slice/scheduleSlice.ts";

export const TablePage = ({navigation}: NavigationProps) => {

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTable());
    }, [dispatch]);

    const handleGoBack = () => {
        navigation.goBack();
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
                    <Pressable onPress={handleGoBack}>
                        <Image
                            source={require('../../assets/png/leftArrow.png')}
                            style={{
                                width: 30,
                                height: 30,
                                position: 'absolute',
                                left: 5,
                                bottom: '40%',
                            }}></Image>
                    </Pressable>

                    <View style={styleSheet.weekBox}>
                        <View style={styleSheet.textBox}>
                            <Text style={{
                                color: 'black',
                                height: 20,
                                lineHeight: 20,
                                fontSize: 18,
                                fontWeight: '600'
                            }}>第5周</Text>
                            <Text style={{color: 'black', fontSize: 12}}>本周</Text>
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
                    <Schedule></Schedule>
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
        maxWidth: 50,
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
    }
})
