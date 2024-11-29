import React from "react";
import {Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import {handleStrongText} from "../../utils/infoUtils.tsx";
import {Content} from "../../config/TextConfig.ts";

export interface MoreInfoPageProps {
    wholeTitle: string;
    title: {main: string, sub: string};
    content: Content[];
}

const MoreInfoPage = ({props, handleNavigation}: {props: MoreInfoPageProps, handleNavigation: any}) => {

    const handleGoBack = () => {
        handleNavigation();
    }

    return (
        <View style={{flex: 1, display: 'flex', alignItems: 'center', backgroundColor: 'white'}}>
            <View style={ss.guideBar}>
                <Pressable onPress={handleGoBack} style={ss.backButton} hitSlop={{top: 5, bottom: 5, left: 10, right: 10}}>
                    <SvgXml xml={XMLResources.blackBackArrow} width={10} height={18}/>
                </Pressable>
                <Text style={ss.moreInfoTitle}>{props.wholeTitle}</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{width: '88%'}} nestedScrollEnabled={true}>
                <View style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
                    <View style={{width: 8, backgroundColor: BackgroundColor.primary, height: '100%'}}></View>
                    <View style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginLeft: 8}}>
                        <Text style={ss.mainTitle}>{props.title.main}</Text>
                        <Text style={ss.subTitle}>{props.title.sub}</Text>
                    </View>
                </View>
                {props.content.map((item) => {
                    const content = item.content.map((item) => {
                         if(item.type === 0) {
                             return (
                                 <Text>
                                     {handleStrongText(item.text[0])}
                                 </Text>
                             )
                         }

                         if(item.type === 1) {
                             const len = item.text.length;
                             const imgList = item.text.map((url, index) => {
                                 const width = useWindowDimensions().width * .8 / len;
                                 return (
                                     <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                         <Image
                                             source={{uri: url}}
                                             width={width}
                                         />
                                         {item.extra && item.extra[index] !== '' &&
                                             <Text style={{width: '100%', textAlign: 'center', justifyContent: 'center', marginTop: 8}}>{item.extra[index]}</Text>
                                         }
                                     </View>
                                 )
                             })

                             return (
                                 <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                     {imgList}
                                 </View>
                             )
                         }
                    })

                    return (
                        <View style={{marginVertical: 10}}>
                            {item.title !== '' &&
                                <View style={{position: 'relative', marginBottom: 10}}>
                                    <View style={{position: 'absolute', bottom: -1, backgroundColor: BackgroundColor.primarySemiTransparent, width: 100, height: 7}}></View>
                                    <Text style={ss.contentTitle}>{item.title}</Text>
                                </View>
                            }
                            <View>
                                {content}
                            </View>
                        </View>
                    )
                })}
                {/* 结尾固定样式 */}
                <View style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40, marginBottom: 20}}>
                    <Image
                        source={require('../../assets/png/logo.png')}
                        style={{width: 80, height: 80}}
                    />
                    <View style={{width: 100, height: 50, alignItems: 'center', transform: [{translateY: -10}]}}>
                        <SvgXml xml={XMLResources.logo} width='70%' height='100%'/>
                    </View>
                    <Text>湘大变得如此简单</Text>
                    <Image
                        source={require('../../assets/png/sureStudioGrey.png')}
                        style={{width: 120, height: 80, marginTop: 60}}
                    />
                    <Text style={{color: FontColor.grey, fontSize: FontSize.l}}>湘潭大学三翼工作室-产品中心©技术支持</Text>
                </View>
            </ScrollView>
        </View>
    )

}

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

    mainTitle: {
        fontSize: FontSize.ll,
        color: FontColor.dark,
        fontWeight: '600',
        marginBottom: 5,
    },

    subTitle: {
        fontSize: FontSize.m,
        color: FontColor.grey,
    },

    contentTitle: {
        fontSize: FontSize.m,
        color: FontColor.dark,
        fontWeight: '600',
    }
})

export default MoreInfoPage;
