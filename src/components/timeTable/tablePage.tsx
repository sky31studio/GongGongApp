import {Modal, Pressable, RefreshControl, ScrollView, StyleSheet, Text, ToastAndroid, View} from "react-native";
import React, {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {BackgroundColor, BorderColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {selectTheWeek} from "../../app/slice/globalSlice.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import Animated, {Easing, interpolate, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import PagerView from "react-native-pager-view";
import Schedule from "./schedule.tsx";
import {NavigationProps} from "../home/homePage.tsx";
import {
    hideModal,
    initTable,
    lockModal,
    selectCurrentTimeCourses,
    selectModalVisible,
    unlockModal
} from "../../app/slice/scheduleSlice.ts";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";
import {ENToCNWeekDay, ResourceCode} from "../../utils/enum.ts";
import Resources, {ResourceMessage} from "../../basic/Resources.ts";
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../../dao/object/User.ts";

export const TablePage = ({navigation}: NavigationProps) => {
    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    const dispatch = useAppDispatch();
    const theWeek = useAppSelector(selectTheWeek);
    const modalVisible = useAppSelector(selectModalVisible);
    const courseList = useAppSelector(selectCurrentTimeCourses);

    const [isLazyLoaded, setIsLazyLoaded] = useState<boolean>(false);
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const onRefresh = () => {
        setRefreshing(true);

        const getData = async () => {
            const msg: ResourceMessage = await Resources.getClassData(user.token);
            if(msg.code === ResourceCode.Successful) {
                dispatch(initTable(msg.data));
                realm.write(() => {
                    user.courses = JSON.stringify(msg.data);
                });
            } else if(msg.code === ResourceCode.PermissionDenied) {
                ToastAndroid.showWithGravity('身份失效，请重新登录！', 1500, ToastAndroid.BOTTOM);
            } else {
                ToastAndroid.showWithGravity('课表获取失败！', 1500, ToastAndroid.BOTTOM);
            }
        }

        getData().then(() => setRefreshing(false));
    }

    useEffect(() => {
        setTimeout(() => {
            setIsLazyLoaded(true);
        }, 500);
    }, []);

    const [currentWeek, setCurrentWeek] = useState<number>(theWeek);
    const pagerViewRef = useRef<PagerView>(null);

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

    const handlePageSelected = (e: any) => {
        const index= e.nativeEvent.position;
        setCurrentWeek(index + 1);
    }

    // 防止在滑动时点开Modal
    const handleScrollStateChanged = (event: any) => {
        if(event.nativeEvent.pageScrollState === 'idle') {
            dispatch(unlockModal());
        } else {
            dispatch(lockModal());
        }
    }

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
                    <ScalingNotAllowedText style={{fontSize: FontSize.m, color: color}}>第</ScalingNotAllowedText>
                    <ScalingNotAllowedText style={{fontSize: FontSize.l, letterSpacing: 4, color: color, fontWeight: 600}}>{data.item.week}</ScalingNotAllowedText>
                    <ScalingNotAllowedText style={{fontSize: FontSize.m, color: color}}>周</ScalingNotAllowedText>
                </View>
                {theWeek === data.item.week && <Text style={{fontSize: FontSize.xxs, color: color, textAlign: 'center'}}>(本周)</Text>}

            </Pressable>
        )
    }

    return (
        <ScrollView
            contentContainerStyle={{flex: 1}}
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[BackgroundColor.primary]}/>
            }
        >
            <View style={{
                width: '100%',
                flex: 1,
                flexDirection: 'column',
            }}>
                <View style={styleSheet.guideBar}>
                    <Pressable onPress={handleGoBack} style={styleSheet.backButton} hitSlop={{top: 5, bottom: 5, right: 10, left: 10}}>
                        <SvgXml xml={XMLResources.backArrow} width={10} height={18}/>
                    </Pressable>
                    <View style={styleSheet.weekBox}>
                        <Pressable onPress={toggleWeekList} style={styleSheet.textBox}>
                            <ScalingNotAllowedText style={{
                                color: FontColor.light,
                                height: 20,
                                lineHeight: 20,
                                fontSize: 18,
                                fontWeight: '600'
                            }}>第{currentWeek}周</ScalingNotAllowedText>
                            <ScalingNotAllowedText style={{
                                color: FontColor.light,
                                fontSize: 12
                            }}>{theWeek === currentWeek ? '本周' : '非本周'}</ScalingNotAllowedText>
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
                                <View>
                                    <SvgXml
                                        xml={XMLResources.backArrow}
                                        width={14} height={14}
                                    />
                                </View>
                            </Animated.View>
                        </Pressable>
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
                {isLazyLoaded ?
                    <PagerView
                        ref={pagerViewRef}
                        style={[styleSheet.tableWrapper]}
                        initialPage={currentWeek - 1}
                        onPageSelected={handlePageSelected}
                        onPageScrollStateChanged={handleScrollStateChanged}
                        offscreenPageLimit={1}
                    >
                        {weekData.map((item, index) => {
                            return (
                                <View key={index} style={{flex: 1}}>
                                    <Schedule week={item.week}></Schedule>
                                </View>
                            )
                        })}
                    </PagerView> : null
                }
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: BackgroundColor.modalShadow
                    }}>
                        <View style={styleSheet.modalContainer}>
                            <View style={{width: '100%', height: 30, display: 'flex', alignItems: 'flex-end'}}>
                                {/* 关闭按钮 */}
                                <Pressable onPress={() => dispatch(hideModal())}>
                                    <SvgXml xml={XMLResources.closeAddBoard} width="20" height="20"/>
                                </Pressable>
                            </View>
                            <ScrollView style={{width: '100%', height: 400}}>
                                {courseList ?
                                    courseList.map((course, index) => {
                                        const periodStart = course.placeInfo.periodStart;
                                        const weekDay = ENToCNWeekDay[course.placeInfo.day as keyof typeof ENToCNWeekDay];
                                        const periodText = `${weekDay} ${periodStart}-${periodStart + course.placeInfo.periodDuration - 1}节`;
                                        let weekText = '';
                                        for(let info of course.placeInfo.weekInfo) {
                                            if(info.weekStart === info.weekEnd) {
                                                weekText = weekText.concat(`${info.weekStart},`);
                                            } else {
                                                weekText = weekText.concat(`${info.weekStart}-${info.weekEnd},`);
                                            }
                                        }
                                        weekText = weekText.slice(0, -1);
                                        weekText = weekText.concat(' 周');
                                        return (
                                            <View key={index} style={{width: '100%', marginVertical: 15, borderBottomColor: BorderColor.grey, borderBottomWidth: .8}}>
                                                <View style={{marginBottom: 15}}>
                                                    <ScalingNotAllowedText style={{fontSize: FontSize.ll, color: FontColor.dark, fontWeight: '700'}}>{course.name}</ScalingNotAllowedText>
                                                </View>
                                                <View style={{display: 'flex', flexDirection: 'row'}}>
                                                    <View style={{marginRight: 20}}>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubTitle}>教室</ScalingNotAllowedText>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubTitle}>周次</ScalingNotAllowedText>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubTitle}>节数</ScalingNotAllowedText>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubTitle}>老师</ScalingNotAllowedText>
                                                    </View>
                                                    <View>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubText}>{course.classroom}</ScalingNotAllowedText>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubText}>{weekText}</ScalingNotAllowedText>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubText}>{periodText}</ScalingNotAllowedText>
                                                        <ScalingNotAllowedText style={styleSheet.modalSubText}>{course.teacher}</ScalingNotAllowedText>
                                                    </View>
                                                </View>
                                            </View>
                                        )
                                    }) : null
                                }
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styleSheet = StyleSheet.create({
    guideBar: {
        paddingTop: 50,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        width: '100%',
        height: 90,
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

    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: BackgroundColor.mainLight,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        paddingVertical: 10,
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'column',
    },

    modalSubTitle: {
        color: FontColor.grey,
        fontSize: FontSize.s,
        marginVertical: 10,
    },

    modalSubText: {
        color: FontColor.dark,
        fontSize: FontSize.s,
        marginVertical: 10,
    }
})
