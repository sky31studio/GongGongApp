import {Image, StyleSheet, Text, useColorScheme, View} from "react-native";
import React from "react";
import Schedule from "./schedule";

export default function TablePage(): JSX.Element {
    const theme = useColorScheme();

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
                    <Image
                        source={require('../../assets/png/leftArrow.png')}
                        style={{
                            width: 30,
                            height: 30,
                            position: 'absolute',
                            left: 5,
                            bottom: '40%',
                        }}></Image>
                    <View style={styleSheet.weekBox}>
                        <View style={styleSheet.textBox}>
                            <Text style={{color: 'black', height: 20, lineHeight: 20, fontSize: 18, fontWeight: '600'}}>第5周</Text>
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
        backgroundColor: '#ff6275',
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
