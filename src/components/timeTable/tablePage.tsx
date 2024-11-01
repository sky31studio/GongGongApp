import {BackHandler, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useEffect, useState} from "react";
import Schedule from "./schedule";
import {NavigationProps} from "../home/homePage.tsx";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {fetchTable} from "../../app/slice/scheduleSlice.ts";
import {selectTheWeek, setBottomTabVisibility} from "../../app/slice/globalSlice.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import Animated, {interpolate, useAnimatedStyle, useSharedValue} from "react-native-reanimated";

export const TablePage = ({navigation}: NavigationProps) => {
    const theWeek = useAppSelector(selectTheWeek);
    const [currentWeek, setCurrentWeek] = useState<number>(theWeek);

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
            maxHeight: interpolate(dropWeekListValue.value, [0, 1], [0, 40])
        }
    })

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTable());
    }, [dispatch]);

    useEffect(() => {
        dispatch(setBottomTabVisibility(false));

        const listener = BackHandler.addEventListener('hardwareBackPress', () => {
            dispatch(setBottomTabVisibility(true));
            return false;
        })
        return () => listener.remove();
    }, []);

    const handleGoBack = () => {
        navigation.navigate('Home');
        dispatch(setBottomTabVisibility(true));
    }

    const toggleWeekList = () => {
        dropWeekListValue.value = dropWeekListValue.value === 0 ? 1 : 0;
    }

    const weekData = Array.from({length: 21}, (_, index) => {
        return {
            week: index + 1,
        }
    });


    const weekListRenderItem = (item: any) => {
        const color = currentWeek === item.week ? FontColor.secondary : FontColor.grey;
        let backgroundColor = 'transparent';
        if (theWeek === item.week) backgroundColor = BackgroundColor.grey;
        if (currentWeek === item.week) backgroundColor = BackgroundColor.focused;

        return (
            <Pressable
                onPress={() => setCurrentWeek(item.week)}
                style={{
                    backgroundColor: backgroundColor,
                    borderRadius: 4,
                    paddingHorizontal: 6,
                    paddingVertical: 8,
                    marginHorizontal: 5,
                }}
            >
                <Text style={{fontSize: FontSize.m, color: color}}>第</Text>
                <Text style={{fontSize: FontSize.l, color: color}}>{item.week}</Text>
                <Text style={{fontSize: FontSize.m, color: color}}>周</Text>
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
                            }}>第{theWeek}周</Text>
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
                    style={[weekListAnimatedStyle]}
                    data={weekData}
                    renderItem={weekListRenderItem}
                    horizontal={true}
                    keyExtractor={item => item.week.toString()}
                />

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
    },
})
