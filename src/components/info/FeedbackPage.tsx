import {NavigationProps} from "../home/homePage.tsx";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import React from "react";
import {FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import WebView from "react-native-webview";

const FeedbackPage = ({navigation}: NavigationProps) => {

    return (
        <View style={{flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'white'}}>
            <View style={ss.guideBar}>
                <Pressable onPress={() => navigation.goBack()} style={ss.backButton} hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}>
                    <SvgXml xml={XMLResources.blackBackArrow} width={10} height={18}/>
                </Pressable>
                <Text style={ss.moreInfoTitle}>联系我们</Text>
            </View>
            <View style={{flex: 1, width: '100%', display: 'flex'}}>
                <WebView style={{flex: 1}} source={{uri: 'http://feedback.leocoding.online'}} nestedScrollEnabled={true}/>
            </View>
        </View>
    )
}

export default  FeedbackPage;

const ss = StyleSheet.create({
    guideBar: {
        paddingTop: 50,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 100,
        position: 'relative',
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

    moreInfoTitle: {
        width: '30%',
        position: 'absolute',
        left: '35%',
        bottom: '55%',
        textAlign: 'center',
        justifyContent: 'center',
        color: FontColor.dark,
        fontSize: FontSize.l,
        fontWeight: '600',
    },
})
