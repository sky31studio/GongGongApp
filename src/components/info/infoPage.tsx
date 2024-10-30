import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import Resources from "../../basic/Resources.ts";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";

const InfoPage = () => {
    const [info, setInfo] = useState<{ student_id: string, name: string, major: string }>();

    useEffect(() => {
        Resources.getInfo().then((data) => {
            setInfo(data);
        })
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={ss.titleBar}>
                <Text style={ss.titleText}>我的</Text>
                <Pressable style={{
                    position: 'absolute',
                    top: 46,
                    right: 20,
                }}>
                    <SvgXml xml={XMLResources.more} width={35} height={35}/>
                </Pressable>
            </View>
            <View style={ss.mainContainer}>
                <View style={ss.totalContainer}>

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

    titleText: {
        fontSize: FontSize.ll,
        color: FontColor.light,
        fontWeight: '600',
    },

    mainContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{translateY: -20}],
    },

    totalContainer: {
        width: '86%',
        height: 100,
        borderRadius: 13,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

export default InfoPage;