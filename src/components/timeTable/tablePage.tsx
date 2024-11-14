import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useRef, useState} from "react";
import {useAppSelector} from "../../app/hooks.ts";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {selectTheWeek} from "../../app/slice/globalSlice.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import Animated, {Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import Schedule from "./schedule.tsx";
import {NavigationProps} from "../home/homePage.tsx";

export const TablePage = ({navigation}: NavigationProps) => {
    const theWeek = useAppSelector(selectTheWeek);
    const [currentWeek, setCurrentWeek] = useState<number>(theWeek);
    // const [pagerViewVisible, setPagerViewVisible] = useState<boolean>(true);
    const pagerViewRef = useRef<PagerView>(null);

    const [modalVisible, steModalVisible] = useState<boolean>(false);

    const dropWeekListValue = useSharedValue<number>(0);
    const arrowAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                rotate: `${interpolate(dropWeekListValue.value, [0, 1], [-90, 90])}deg`
            }]
        }
    })

    const weekListAnimatedStyle = useAnimatedStyle(() => {
        return {
            maxHeight: interpolate(dropWeekListValue.value, [0, 1], [0, 50])
        }
    })

    const handleGoBack = () => {
        navigation.navigate('TabNavigation');
    }

    const toggleWeekList = () => {

        dropWeekListValue.value = withTiming(dropWeekListValue.value === 0 ? 1 : 0, {
            duration: 300,
            easing: Easing.ease,
        });
    }

    // const handlePageSelected = (e: any) => {
    //     const index= e.nativeEvent.position;
    //     setCurrentWeek(index + 1);
    // }

    const weekData = Array.from({length: 21}, (_, index) => {
        return {
            week: index + 1,
        }
    });


    const weekListRenderItem = (data: any) => {
        const color = currentWeek === data.item.week ? FontColor.secondary : FontColor.grey;
        let backgroundColor = 'transparent';
        if (theWeek === data.item.week) backgroundColor = BackgroundColor.grey;
        if (currentWeek === data.item.week) backgroundColor = BackgroundColor.focused;

        // TODO: 滚动
        const handleClick = () => {
            setCurrentWeek(data.item.week);
            pagerViewRef.current?.setPage(data.item.week - 1);
        }

        return (
            <Pressable
                onPress={handleClick}
                style={{
                    height: 44,
                    width: 65,
                    backgroundColor: backgroundColor,
                    borderRadius: 4,
                    paddingHorizontal: 4,
                    paddingVertical: 8,
                    marginVertical: 3,
                    marginHorizontal: 5,
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Text style={{fontSize: FontSize.m, color: color}}>第</Text>
                    <Text style={{fontSize: FontSize.l, letterSpacing: 4, color: color, fontWeight: 600}}>{data.item.week}</Text>
                    <Text style={{fontSize: FontSize.m, color: color}}>周</Text>
                </View>
                {theWeek === data.item.week && <Text style={{fontSize: FontSize.xxs, color: color, textAlign: 'center'}}>(本周)</Text>}

            </Pressable>
        )
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
                            }}>第{currentWeek}周</Text>
                            <Text style={{
                                color: FontColor.light,
                                fontSize: 12
                            }}>{theWeek === currentWeek ? '本周' : '非本周'}</Text>
                            <Animated.View
                                style={[
                                    arrowAnimatedStyle,
                                    {
                                        position: 'absolute',
                                        right: -20,
                                        top: 0,
                                    }
                                ]}
                            >
                                <Pressable onPress={toggleWeekList}>
                                    <SvgXml
                                        xml={XMLResources.backArrow}
                                        width={14} height={14}
                                    />
                                </Pressable>
                            </Animated.View>
                        </View>
                    </View>
                </View>
                <Animated.FlatList
                    showsHorizontalScrollIndicator={false}
                    style={[weekListAnimatedStyle]}
                    data={weekData}
                    renderItem={weekListRenderItem}
                    horizontal={true}
                    keyExtractor={item => item.week.toString()}
                    removeClippedSubviews={false}
                />
                {/*{pagerViewVisible && <PagerView*/}
                {/*    ref={pagerViewRef}*/}
                {/*    style={[styleSheet.tableWrapper]}*/}
                {/*    initialPage={currentWeek - 1}*/}
                {/*    onPageSelected={handlePageSelected}*/}
                {/*    offscreenPageLimit={1}*/}
                {/*>*/}
                {/*    {weekData.map((item, index) => {*/}
                {/*       return (*/}
                {/*           <View key={index} style={{flex: 1}}>*/}
                {/*               <Schedule week={item.week}></Schedule>*/}
                {/*           </View>*/}
                {/*       )*/}
                {/*    })}*/}
                {/*</PagerView>}*/}
                {/*<PagerView style={{flex: 1}}>*/}
                {/*    <View><Text style={{color: 'black'}}>123</Text></View>*/}
                {/*</PagerView>*/}
                <Schedule week={currentWeek}></Schedule>
                <Modal
                    visible={false}
                    transparent={true}
                    animationType={'fade'}
                    onRequestClose={() => {
                    }}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'rgba(0, 0, 0, .2)'
                    }}>
                        {/*<View*/}
                        {/*    style={{*/}
                        {/*        width: '100%',*/}
                        {/*        paddingVertical: 15,*/}
                        {/*        backgroundColor: BackgroundColor.mainLight,*/}
                        {/*        borderTopLeftRadius: 15,*/}
                        {/*        borderTopRightRadius: 15,*/}
                        {/*        position: 'absolute',*/}
                        {/*        bottom: 0,*/}
                        {/*    }}*/}
                        {/*>*/}

                        {/*</View>*/}
                        <View style={{width: 50, height: 50, backgroundColor: 'red'}}></View>
                    </View>
                </Modal>
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
    },
})
