import {Pressable, ScrollView, StyleSheet, Text, ToastAndroid, useWindowDimensions, View} from "react-native";
import React, {memo, useCallback, useEffect, useMemo, useRef, useState} from "react";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    addExamToTop,
    addSelfToTop,
    Agenda,
    removeExamFromTop,
    removeSelf,
    removeSelfFromTop,
    selectAgendaList,
    selectExamLength,
    selectOnlyExamList,
    showAddBoard
} from "../../../app/slice/agendaSlice.ts";
import XMLResources from "../../../basic/XMLResources.ts";
import {AgendaType, CNWeekDay} from "../../../utils/enum.ts";
import {GestureHandlerRootView} from "react-native-gesture-handler";
import {convertDateToString} from "../../../utils/agendaUtils.ts";
import Swipeable, {SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';
import ScalingNotAllowedText from "../../global/ScalingNotAllowedText.tsx";

const agendaComponent = memo(() => {
    const dispatch = useAppDispatch();

    // 是否只展示exam
    const [onlyExam, setOnlyExam] = useState<boolean>(false);
    const countdownList = <CountdownList onlyExam={onlyExam}/>

    const handleOnlyExam = () => {
        setOnlyExam(!onlyExam);
    }

    const openBoard = () => {
        dispatch(showAddBoard());
    }

    return (
        <View style={ss.agendaComponentContainer}>
            <View style={ss.functionContainer}>
                <Pressable onPress={openBoard}>
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
        </View>
    )
})

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

    const renderList = useMemo(() => {
        return agendaList
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
    }, [lastTime])

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
        <GestureHandlerRootView style={{width: '100%', flex: 1}}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                scrollEnabled={true}
                style={ss.countdownListContainer}>
                {agendaListLength === 0 && onlyExam ? noExam : renderList}
            </ScrollView>
        </GestureHandlerRootView>
    );
}

const AgendaBox = ({agenda, countdown}: { agenda: Agenda, countdown: number }) => {
    const winWidth = useWindowDimensions().width;
    const dispatch = useAppDispatch();

    const swipeableRef = useRef<SwipeableMethods>(null);
    const isOnTop = agenda.isOnTop;

    // yyyy/mm/dd mm:ss-mm:ss
    let timeStr;
    let weekDay;
    let location = useMemo(() => agenda.location === '' ? '无地点' : agenda.location, [agenda.location]);
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
    const typeTip = () => {
        return (
            <View style={[ss.agendaTagContainer, {backgroundColor: BackgroundColor.tertiary}]}>
                <ScalingNotAllowedText style={{
                    fontSize: FontSize.ss,
                    color: FontColor.light,
                    lineHeight: 15
                }}>{AgendaType[agenda.type]}</ScalingNotAllowedText>
            </View>
        )
    }

    const handlePinToTop = useCallback(() => {
        swipeableRef.current?.reset();
        if (agenda.isCustom) {
            dispatch(addSelfToTop(agenda.id));
        } else {
            dispatch(addExamToTop(agenda.id));
        }
    }, [agenda.isCustom, dispatch, agenda.id]);

    const handleUnpinToTop = useCallback(() => {
        swipeableRef.current?.reset();
        if (agenda.isCustom) {
            dispatch(removeSelfFromTop(agenda.id));
        } else {
            dispatch(removeExamFromTop(agenda.id));
        }
    }, [agenda.isCustom, dispatch, agenda.id]);

    const handleDelete = useCallback(() => {
        if (!agenda.isCustom) {
            ToastAndroid.showWithGravity('考试不可以删除!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            swipeableRef.current?.close();
        } else {
            dispatch(removeSelf);
        }
    }, [agenda.isCustom, dispatch]);

    const rightAction = () => {
        return (
            <View style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
                <Pressable
                    style={[ss.agendaButton, {
                        backgroundColor: BackgroundColor.iconPrimaryBackground,
                    }]}
                    onPress={isOnTop ? handleUnpinToTop : handlePinToTop}
                >
                    <SvgXml xml={isOnTop ? XMLResources.unPinToTop : XMLResources.pinToTop} width={15} height={15}/>
                    <Text
                        style={[ss.agendaButtonText, {color: BackgroundColor.iconPrimary}]}>{isOnTop ? '取消置顶' : '置顶'}</Text>
                </Pressable>
                <Pressable
                    style={[ss.agendaButton, {
                        backgroundColor: BackgroundColor.iconSecondaryBackground,
                    }]}
                    onPress={handleDelete}
                >
                    <SvgXml xml={XMLResources.deleteAgenda} width={15} height={15}/>
                    <Text style={[ss.agendaButtonText, {color: BackgroundColor.iconSecondary}]}>删除</Text>

                </Pressable>
            </View>
        )
    }

    return (
        <Swipeable
            ref={swipeableRef}
            renderRightActions={rightAction}
            rightThreshold={40}
            overshootRight={false}

        >
            <View style={[ss.agendaContainer]}>
                <View style={ss.agendaNameContainer}>
                    <ScalingNotAllowedText numberOfLines={1} ellipsizeMode="tail"
                                           style={[ss.agendaName, {maxWidth: winWidth * .4}
                                           ]}>{agenda.name}</ScalingNotAllowedText>
                    {typeTip()}
                </View>
                {agenda.text !== '' && <ScalingNotAllowedText
                    style={[ss.agendaText, {maxWidth: winWidth * .4}]}>{agenda.text}</ScalingNotAllowedText>}
                <View style={ss.agendaLocationAndTimeContainer}>
                    <SvgXml xml={XMLResources.clock} width={9} height={9}/>
                    <ScalingNotAllowedText style={[ss.agendaInfoText]}>{timeStr}</ScalingNotAllowedText>
                    <ScalingNotAllowedText style={[ss.agendaInfoText]}>{weekDay}</ScalingNotAllowedText>
                    <View style={{
                        width: .5,
                        height: 12,
                        backgroundColor: FontColor.grey,
                        marginHorizontal: 5
                    }}></View>
                    <SvgXml xml={XMLResources.location} width={9} height={9}/>
                    <ScalingNotAllowedText style={[ss.agendaInfoText]}>{location}</ScalingNotAllowedText>
                </View>
                {agenda.startTime !== '' && (
                    <View style={ss.countdownContainer}>
                        <ScalingNotAllowedText style={ss.countdownText}>还剩</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={ss.countdownDayText}>{countdown}</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={ss.countdownText}>天</ScalingNotAllowedText>
                    </View>
                )}
            </View>
        </Swipeable>
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
        flex: 1,
        overflow: 'hidden',
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
        backgroundColor: '#fff',
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 75,
        width: 40,
    },

    agendaButtonText: {
        fontSize: FontSize.xxs,
    },
})

export default agendaComponent;
