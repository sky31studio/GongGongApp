import {Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    Agenda,
    hideAddBoard,
    selectAgendaList,
    selectExamLength,
    selectOnlyExamList,
    selectShowAddBoard,
    showAddBoard
} from "../../../app/slice/agendaSlice.ts";
import XMLResources from "../../../basic/XMLResources.ts";
import {AgendaType, CNWeekDay} from "../../../utils/enum.ts";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {convertDateToString} from "../../../utils/agendaUtils.ts";
import AddBoard from "./addBoard.tsx";

const agendaComponent = () => {
    const dispatch = useAppDispatch();
    const winWidth = useWindowDimensions().width;
    const winHeight = useWindowDimensions().height;
    const modalVisibility = useAppSelector(selectShowAddBoard);

    const translateY = useSharedValue(400);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}]
        }
    })

    // 是否只展示exam
    const [onlyExam, setOnlyExam] = useState<boolean>(false);
    const countdownList = <CountdownList onlyExam={onlyExam}/>

    const handleOnlyExam = () => {
        setOnlyExam(!onlyExam);
    }

    const showBoard = () => {
        dispatch(showAddBoard());
    }

    const openModal = () => {
        translateY.value = withTiming(0, {
            duration: 200,
            easing: Easing.ease
        }, () => runOnJS(showBoard)());
    }

    const hideBoard = () => {
        dispatch(hideAddBoard());
    }

    const closeModal = () => {
        translateY.value = withTiming(400, {
            duration: 200,
            easing: Easing.ease
        }, () => runOnJS(hideBoard)());
    }

    return (
        <View style={ss.agendaComponentContainer}>
            <View style={ss.functionContainer}>
                <Pressable onPress={openModal}>
                    <View style={ss.addContainer}>
                        <SvgXml xml={XMLResources.addCountdown} width="10" height="10"/>
                        <Text style={ss.addText}>添加倒计时</Text>
                    </View>
                </Pressable>

                <View style={ss.chosenContainer}>
                    <Pressable onPress={handleOnlyExam} style={{display: 'flex', flexDirection: 'row'}}>
                        <SvgXml xml={onlyExam ? XMLResources.exam : XMLResources.notExam} width="16" height="16"/>
                        <Text style={{marginLeft: 5, color: FontColor.grey, lineHeight: 17}}>仅考试</Text>
                    </Pressable>
                </View>
            </View>
            {countdownList}
            <Modal
                visible={modalVisibility}
                animationType={'none'}
                onRequestClose={closeModal}
                transparent={true}
            >
                <View style={{width: winWidth, height: winHeight, backgroundColor: 'rgba(0, 0, 0, .25)'}}>
                    <Animated.View style={[animatedStyle, {position: 'absolute', bottom: 0}]}>
                        <AddBoard handleClose={closeModal}/>
                    </Animated.View>

                </View>
            </Modal>
        </View>
    )
}

/**
 * Agenda列表部分
 */
const CountdownList = ({onlyExam}: { onlyExam: boolean }): React.JSX.Element => {
    const agendaList = onlyExam ? useAppSelector(selectOnlyExamList) : useAppSelector(selectAgendaList);
    const agendaListLength = useAppSelector(selectExamLength);

    const [lastTime, setLastTime] = useState(new Date());
    const intervalID = setInterval(() => {
        setLastTime(new Date());
    }, 8000);

    useEffect(() => {
        return () => {
            clearInterval(intervalID);
        }
    })

    const renderList = agendaList
        .filter((agenda: Agenda) => {
            let endDate = new Date(agenda.endTime);
            const countdown = Math.floor((endDate.getTime() - lastTime.getTime()) / (1000 * 3600 * 24));
            // 说明该Agenda已经过期
            return countdown >= 0;
        })
        .map((agenda: Agenda) => {
            let endDate = new Date(agenda.endTime);
            const countdown = Math.floor((endDate.getTime() - lastTime.getTime()) / (1000 * 3600 * 24));

            return (
                <View key={agenda.id}>
                    <AgendaBox agenda={agenda} countdown={countdown}/>
                </View>
            )
    })

    // 没有考试展示
    const noExam = (
        <View style={{marginTop: 20, display: 'flex', alignItems: 'center'}}>
            <SvgXml xml={XMLResources.noAgendaOnlyExams} width={193} height={127}/>
            <Text
                style={{
                    width: '100%',
                    textAlign: 'center',
                    color: FontColor.grey,
                    marginTop: 20
                }}>没有考试的日子也要好好学习哦~</Text>
        </View>
    )

    return (
        <GestureHandlerRootView style={{width: '100%'}}>
            <ScrollView style={ss.countdownListContainer}>
                {agendaListLength === 0 && onlyExam ? noExam : renderList}
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const AgendaBox = ({agenda, countdown}: { agenda: Agenda, countdown: number }) => {
    // yyyy/mm/dd mm:ss-mm:ss
    let timeStr;
    let weekDay;
    let location = agenda.location === '' ? '无地点' : agenda.location;
    if (agenda.startTime === '') {
        timeStr = '无时间';
        weekDay = '';
    } else {
        const startTime = new Date(agenda.startTime);
        const endTime = new Date(agenda.endTime);
        weekDay = CNWeekDay[startTime.getDay()];
        timeStr = convertDateToString(startTime, endTime);
    }

    // 标签渲染
    const typeList = agenda.types.map((type) => {
        return (
            <View style={ss.agendaTagContainer}>
                <Text style={{fontSize: FontSize.ss, color: FontColor.light, lineHeight: 15}}>{AgendaType[type]}</Text>
            </View>
        )
    })

    const translateX = useSharedValue(0);
    const startTranslateX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}],
        }
    })

    const pan = Gesture.Pan()
        .shouldCancelWhenOutside(false)
        .onBegin(() => {
            startTranslateX.value = translateX.value;
        })
        .onUpdate((event) => {
            if (startTranslateX.value + event.translationX >= 0) {
                translateX.value = 0;
            } else if (startTranslateX.value + event.translationX <= -80) {
                translateX.value = -80;
            } else {
                translateX.value = startTranslateX.value + event.translationX;
            }
        })
        .onEnd((event) => {
            const velocityX = event.velocityX;
            if (velocityX < 0) {
                if (velocityX < -300 || translateX.value + event.translationX < -40) {
                    translateX.value = withTiming(-80, {
                        duration: 300,
                    })
                } else {
                    translateX.value = withTiming(0, {
                        duration: 300,
                    })
                }
            } else {
                if (velocityX > 300 || translateX.value + event.translationX > -40) {
                    translateX.value = withTiming(0, {
                        duration: 300,
                    })
                } else {
                    translateX.value = withTiming(-80, {
                        duration: 300,
                    })
                }
            }
        })

    return (
        <GestureDetector gesture={pan}>
            <View style={{width: '100%', overflow: 'hidden'}}>
                <Animated.View style={[ss.agendaContainer, animatedStyle]}>
                    <View style={ss.agendaNameContainer}>
                        <Text numberOfLines={1} ellipsizeMode="tail" style={ss.agendaName}>{agenda.name}</Text>
                        {agenda.types.length && typeList}
                    </View>
                    {agenda.text !== '' && <Text style={[ss.agendaText]}>{agenda.text}</Text>}
                    <View style={ss.agendaLocationAndTimeContainer}>
                        <SvgXml xml={XMLResources.clock} width={9} height={9}/>
                        <Text style={[ss.agendaInfoText]}>{timeStr}</Text>
                        <Text style={[ss.agendaInfoText]}>{weekDay}</Text>
                        <View style={{
                            width: .5,
                            height: 12,
                            backgroundColor: FontColor.grey,
                            marginHorizontal: 5
                        }}></View>
                        <SvgXml xml={XMLResources.location} width={9} height={9}/>
                        <Text style={[ss.agendaInfoText]}>{location}</Text>
                    </View>
                    {agenda.startTime !== '' && (
                        <View style={ss.countdownContainer}>
                            <Text style={ss.countdownText}>还剩</Text>
                            <Text style={ss.countdownDayText}>{countdown}</Text>
                            <Text style={ss.countdownText}>天</Text>
                        </View>
                    )}
                    <Pressable
                        style={[ss.agendaButton, {
                            backgroundColor: BackgroundColor.iconSecondaryBackground,
                            right: -80
                        }]}>
                        <SvgXml xml={XMLResources.deleteAgenda} width={15} height={15}/>
                        <Text style={[ss.agendaButtonText, {color: BackgroundColor.iconSecondary}]}>删除</Text>

                    </Pressable>
                    <Pressable style={[ss.agendaButton, {
                        backgroundColor: BackgroundColor.iconPrimaryBackground,
                        right: -40
                    }]}>
                        <SvgXml xml={XMLResources.pinToTop} width={15} height={15}/>
                        <Text style={[ss.agendaButtonText, {color: BackgroundColor.iconPrimary}]}>{'置顶'}</Text>
                    </Pressable>
                </Animated.View>
            </View>
        </GestureDetector>
    )
}

const ss = StyleSheet.create({
    agendaComponentContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },

    functionContainer: {
        width: '100%',
        height: 60,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 10,
    },

    countdownListContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '100%',
    },

    addContainer: {
        height: 26,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: BackgroundColor.primary,
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 5,
        alignItems: 'center',
    },

    addText: {
        marginLeft: 3,
        fontSize: 13,
        height: 30,
        lineHeight: 30,
        color: 'white',
    },

    chosenContainer: {
        flex: 1,
        display: 'flex',
        alignItems: 'flex-end',
    },

    agendaContainer: {
        width: '100%',
        height: 75,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderTopWidth: .8,
        borderTopColor: '#EEEEEE',
        paddingVertical: 10,
        paddingHorizontal: 25,
    },

    agendaNameContainer: {
        display: 'flex',
        flexDirection: 'row',
    },

    agendaName: {
        color: FontColor.dark,
        fontSize: FontSize.l,
        fontWeight: '600',
    },

    agendaLocationAndTimeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        left: 25,
    },

    countdownContainer: {
        position: 'absolute',
        top: 10,
        right: 5,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    agendaTagContainer: {
        display: 'flex',
        alignItems: 'center',
        height: 18,
        borderRadius: 14,
        borderBottomLeftRadius: 0,
        backgroundColor: BackgroundColor.tertiary,
        marginLeft: 10,
        paddingVertical: 2,
        paddingHorizontal: 8,
    },

    agendaText: {
        fontSize: FontSize.m,
        color: FontColor.grey,
    },

    agendaInfoText: {
        color: FontColor.greyLight,
        fontSize: FontSize.ss,
        marginLeft: 3,
        lineHeight: 16,
    },

    countdownText: {
        color: FontColor.dark,
        fontSize: FontSize.ss,
        verticalAlign: 'bottom',
    },

    countdownDayText: {
        color: BackgroundColor.primary,
        fontSize: FontSize.ll,
        verticalAlign: 'bottom',
        marginHorizontal: 3,
    },

    agendaButton: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: 40,
        top: 0,
    },

    agendaButtonText: {
        fontSize: FontSize.xxs,
    },
})

export default agendaComponent;
