import {FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, ToastAndroid, View} from "react-native";
import {BackgroundColor, FontColor, FontFamily, FontSize} from "../../config/globalStyleSheetConfig.ts";
import React, {memo, useCallback, useMemo, useState} from "react";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import {NavigationProps} from "../home/homePage.tsx";
import {produce} from "immer";
import Animated, {runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {
    selectTodayClassroomStatus,
    selectTomorrowClassroomStatus,
    setTodayEmptyClassroomStatus,
    setTomorrowEmptyClassroomStatus
} from "../../app/slice/classroomSlice.ts";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../../dao/object/User.ts";
import Resources, {ResourceMessage} from "../../basic/Resources.ts";
import {ResourceCode} from "../../utils/enum.ts";

const periods = ['1-2', '3-4', '5-6', '7-8', '9-11'];
/**
 * 空教室页面
 * @param navigation 路由
 * @constructor
 */
const EmptyClassroomPage = ({navigation}: NavigationProps) => {
    const dispatch = useAppDispatch();
    // realm
    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    // 列表刷新状态
    const [refreshing, setRefreshing] = useState<boolean>(false);
    // 选中地点下标
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    // 是否是今天
    const [isToday, setIsToday] = useState<boolean>(true);
    // 选中课程节次
    const [currentPeriod, setCurrentPeriod] = useState([false, false, false, false, false]);

    // 今日空教室数据
    const todayData = useAppSelector(selectTodayClassroomStatus);
    // 明日空教室数据
    const tomorrowData = useAppSelector(selectTomorrowClassroomStatus);

    // 从空教室数据中筛选出的选中地点以及选中课程节次的数据
    const locationData = useMemo(() => {
        const classData = isToday ? todayData : tomorrowData;
        let selectedData: any[] = classData[currentIndex].classroom;

        return selectedData.filter((item: any) => {
            for(let i = 0; i < 5; i++) {
                if(currentPeriod[i] && !item.status[i]) {
                    return false;
                }
            }

            return true;
        });
    }, [isToday, currentIndex, currentPeriod, todayData, tomorrowData]);

    const leftHandler = useCallback(() => setIsToday(true), []);
    const rightHandler = useCallback(() => setIsToday(false), []);

    // 更新currentPeriod数组(使用immer)
    const updatePeriod = (index: number) => {
        setCurrentPeriod(
            produce(currentPeriod, (draftState: any) => {
                draftState[index] = !draftState[index];
            })
        );
    }

    // 重置currentPeriod数组
    const clearCurrentPeriod = useCallback(() => {
        setCurrentPeriod([false, false, false, false, false]);
    }, []);

    // 刷新获取数据
    const onRefresh = useCallback(() => {
        setRefreshing(true);

        if(!user) {
            ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
            setRefreshing(false);
            return;
        }

        const fetchData = async () => {
            let msg: ResourceMessage = await Resources.getTodayClassroomStatus(user.token);
            if(msg.code === ResourceCode.Successful) {
                dispatch(setTodayEmptyClassroomStatus(msg.data));
                realm.write(() => {
                    user.todayClassroom = JSON.stringify(msg.data);
                })
            }

            msg = await Resources.getTomorrowClassroomStatus(user.token);
            if(msg.code === ResourceCode.Successful) {
                dispatch(setTomorrowEmptyClassroomStatus(msg.data));
                realm.write(() => {
                    user.tomorrowClassroom = JSON.stringify(msg.data);
                })
            } else if(msg.code === ResourceCode.PermissionDenied) {
                ToastAndroid.showWithGravity('身份失效，请重新登录！', 1500, ToastAndroid.BOTTOM);
            } else {
                ToastAndroid.showWithGravity('空教室信息获取失败！', 1500, ToastAndroid.BOTTOM);
            }
        }

        fetchData().then(() => setRefreshing(false));
    }, [user.token]);

    // FlatList渲染需要使用的数据
    const listData = todayData.map((place) => {
        return {
            location: place.name,
        }
    })

    // FlatList的item渲染函数
    const itemRenderer = (data: any) => {
        const fontWeight = data.index === currentIndex ? '700' : '400';
        return (
            <Pressable onPress={() => setCurrentIndex(data.index)} style={{width: 55, height: '100%', alignItems: 'center', justifyContent: 'center'}}>
                <ScalingNotAllowedText style={[{
                    fontWeight: fontWeight,
                    color: FontColor.light,
                    fontSize: FontSize.s
                }]}>{data.item.location}</ScalingNotAllowedText>
            </Pressable>
        )
    }

    // 渲染课程节次列表
    const periodList = periods.map((period, index) => {
        const color = currentPeriod[index] ? FontColor.light : FontColor.grey;
        const backgroundColor = currentPeriod[index] ? BackgroundColor.primary : 'transparent';

        return (
            <Pressable
                onPress={() => updatePeriod(index)}
                key={index}
                style={{
                    flex: 1,
                    marginHorizontal: 8,
                    backgroundColor: backgroundColor,
                    borderRadius: 15,
                }}
            >
                <ScalingNotAllowedText style={{color: color, textAlign: 'center'}}>{period}</ScalingNotAllowedText>
            </Pressable>
        )
    })

    return (
        <ScrollView
            contentContainerStyle={{flex: 1}}
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[BackgroundColor.primary]}/>
            }
        >
            <View style={{height: '100%', width: '100%', backgroundColor: BackgroundColor.primary}}>
                <View style={ss.titleBar}>
                    <View
                        style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}
                    >
                        <ScalingNotAllowedText style={ss.titleText}>空教室</ScalingNotAllowedText>
                    </View>
                    <Pressable onPress={() => navigation.navigate('TabNavigation')} style={ss.backButton} hitSlop={{top: 5, bottom: 5, right: 10, left: 10}}>
                        <SvgXml xml={XMLResources.backArrow} width={10} height={18}/>
                    </Pressable>
                    <View style={{width: '100%', height: 40, position: 'absolute', bottom: 0}}>
                        <FlatList
                            data={listData}
                            renderItem={itemRenderer}
                            style={{flex: 1}}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            removeClippedSubviews={false}
                        />
                    </View>
                </View>
                <View style={ss.mainContainer}>
                    <FunctionField
                        handleLeft={leftHandler}
                        handleRight={rightHandler}
                        reset={clearCurrentPeriod}
                        locationName={todayData[currentIndex].name}
                    />
                    <View style={ss.mainInfoContainer}>
                        <View style={{width: '100%', height: 40, display: 'flex', flexDirection: 'row'}}>
                            <View style={{width: 50, height: '100%'}}></View>
                            <View style={{flex: 1, height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                                {periodList.map((item) => (
                                    item
                                ))}
                            </View>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
                            {/* 有数据 */}
                            {locationData.length !== 0 && locationData.map((location, index) => {
                                return (
                                    <View key={index} style={{width: '100%', height: 30, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                                        <View style={{width: 50, height: '100%', justifyContent: 'center'}}>
                                            <ScalingNotAllowedText
                                                style={{color: FontColor.grey}}>{location.name}</ScalingNotAllowedText>
                                        </View>
                                        <View
                                            style={{flex: 1, height: '25%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}
                                        >
                                            <View style={ss.periodBackgroundBlock}></View>
                                            {location.status.map((status: boolean, index: number) => {
                                                const backgroundColor = status ? BackgroundColor.iconPrimary : 'transparent';
                                                return (
                                                    <View key={index} style={{flex: 1, alignItems: 'center'}}>
                                                        <View style={[ss.periodItem, {backgroundColor: backgroundColor}]}></View>
                                                    </View>
                                                )
                                            })}
                                        </View>
                                    </View>
                                )
                            })}
                            {/* 无数据 */}
                            {locationData.length === 0 &&
                                <View style={{width: '100%', alignItems: 'center', marginTop: 70}}>
                                    <SvgXml xml={XMLResources.noClassroomAvailable} width={248} height={176}/>
                                </View>
                            }
                            <View style={{width: '100%', alignItems: 'center', marginTop: 25}}>
                                <ScalingNotAllowedText style={{
                                    fontSize: FontSize.s,
                                    color: FontColor.grey
                                }}>{locationData.length !== 0 ? '到底了哟 (´▽｀)~' : '没有找到诶＞︿＜，去其他地方看看吧~'}</ScalingNotAllowedText>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

const FunctionField = memo(({handleLeft, handleRight, reset, locationName}: any) => {
    const [isToday, setIsToday] = useState<boolean>(true);

    const buttonAnimatedValue = useSharedValue<number>(0);
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            left: `${buttonAnimatedValue.value}%`
        }
    })

    const toggleLeft = () => {
        handleLeft();

        if(!isToday) {
            buttonAnimatedValue.value = withTiming(0, {duration: 300}, () => runOnJS(setIsToday)(true));
        }
    }

    const toggleRight = () => {
        handleRight();

        if(isToday) {
            buttonAnimatedValue.value = withTiming(50, {duration: 300}, () => runOnJS(setIsToday)(false));
        }
    }

    return (
        <View style={ss.functionFieldContainer}>
            <View style={ss.verticalContainer}>
                <ScalingNotAllowedText style={ss.locationText}>{locationName}</ScalingNotAllowedText>
                <Pressable style={ss.refreshButton} onPress={reset}>
                    <ScalingNotAllowedText style={{
                        color: FontColor.light,
                        fontWeight: '800',
                        fontSize: FontSize.ss,
                        transform: [{translateY: -1}]
                    }}>重置</ScalingNotAllowedText>
                </Pressable>
            </View>
            <View style={[ss.verticalContainer, {alignItems: 'flex-end'}]}>
                <View style={ss.shiftButton}>
                    <Animated.View style={[{
                        backgroundColor: BackgroundColor.primary,
                        width: 46,
                        height: '100%',
                        borderRadius: 20,
                        position: 'absolute',
                        left: 0
                    }, buttonAnimatedStyle]}></Animated.View>
                    <Pressable onPress={toggleLeft} style={{width: '50%'}}>
                        <ScalingNotAllowedText
                            style={[ss.shiftButtonText, {color: isToday ? FontColor.light : FontColor.dark}]}>今天</ScalingNotAllowedText>
                    </Pressable>
                    <Pressable onPress={toggleRight} style={{width: '50%'}}>
                        <ScalingNotAllowedText
                            style={[ss.shiftButtonText, {color: isToday ? FontColor.dark : FontColor.light}]}>明天</ScalingNotAllowedText>
                    </Pressable>
                </View>
                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{
                        width: 10,
                        height: 10,
                        backgroundColor: BackgroundColor.iconPrimary,
                        borderRadius: 5,
                        marginHorizontal: 5
                    }}></View>
                    <ScalingNotAllowedText style={{
                        color: FontColor.grey,
                        fontSize: FontSize.s,
                        transform: [{translateY: -2}]
                    }}>可用教室</ScalingNotAllowedText>
                </View>
            </View>
        </View>
    )
})

const ss = StyleSheet.create({
    titleBar: {
        width: '100%',
        height: 140,
        paddingTop: 50,
        alignItems: 'center',
        flexDirection: 'column',
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
        fontWeight: '800',
        fontFamily: FontFamily.main
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
        fontWeight: '900',
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
        fontFamily: FontFamily.main,
        fontWeight: '800',
        letterSpacing: 2,
        textAlign: 'center',
        lineHeight: 24,
    },

    mainInfoContainer: {
        marginTop: 10,
        flex: 1,
    },

    periodButton: {
        height: 17,
        width: 32,
    },

    periodBackgroundBlock: {
        backgroundColor: BackgroundColor.iconPrimaryBackground,
        position: 'absolute',
        width: '92%',
        height: '100%',
        left: '4%',
        borderRadius: 15,
    },

    periodItem: {
        height: '100%',
        width: '60%',
        borderRadius: 15
    },
})
export default EmptyClassroomPage;
