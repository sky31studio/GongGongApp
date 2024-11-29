import {Pressable, ScrollView, StyleSheet, Text, ToastAndroid, useWindowDimensions, View} from "react-native";
import React, {forwardRef, memo, useImperativeHandle, useMemo, useRef, useState} from "react";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {
    addExamToTop,
    addSelfToTop,
    Agenda,
    examChangedCountIncrement,
    removeExamFromTop,
    removeSelf,
    removeSelfFromTop,
    selectAgendaList,
    selectExamLength,
    selectOnlyExamList,
    selfChangedCountIncrement,
    setShowedAgenda,
    showAddBoard
} from "../../../app/slice/agendaSlice.ts";
import XMLResources from "../../../basic/XMLResources.ts";
import {AgendaType, CNWeekDay} from "../../../utils/enum.ts";
import {convertDateToString} from "../../../utils/agendaUtils.ts";
import Swipeable, {SwipeableMethods} from 'react-native-gesture-handler/ReanimatedSwipeable';
import ScalingNotAllowedText from "../../global/ScalingNotAllowedText.tsx";

/**
 * homePage > MainBoard 倒计时组件
 */
const agendaComponent = memo(() => {
    const dispatch = useAppDispatch();

    // 是否只展示exam
    const [onlyExam, setOnlyExam] = useState<boolean>(false);
    const countdownList = useMemo(() => <CountdownList onlyExam={onlyExam}/>, [onlyExam]);

    const handleOnlyExam = () => {
        setOnlyExam(!onlyExam);
    }

    const openBoard = () => {
        dispatch(setShowedAgenda(null));
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
    const dispatch = useAppDispatch();
    const agendaList = onlyExam ? useAppSelector(selectOnlyExamList) : useAppSelector(selectAgendaList);
    const agendaListLength = useAppSelector(selectExamLength);

    const [lastTime, _] = useState(new Date());
    const [openedIndex, setOpenedIndex] = useState<number | null>(null);

    const swipeableListRef = useRef<Record<number, SwipeableMethods>>({})

    // 设置打开的Swipeable下标
    const setIndex = (index: number) => {
        setOpenedIndex(index);
    }

    // TODO: 没有正确的关闭，可能与index的存储有关
    // 监听滚动，如果有Swipeable是打开的，则关闭所有Swipeable
    const closeOpenedSwipeable = () => {
        if(openedIndex) {
            if(swipeableListRef.current) {
                for(let index in swipeableListRef.current) {
                    if(Number(index) === openedIndex && swipeableListRef.current[index]) {
                        swipeableListRef.current[index].close();
                        break;
                    }
                }
            }
            setOpenedIndex(null);
        }
    }

    const renderList = useMemo(() => {
        return agendaList
            .filter((agenda: Agenda) => {
                // 如果没有时间
                if(agenda.endTime === '' && agenda.startTime === '') {
                    return true;
                }
                let endDate = new Date(agenda.endTime === '' ? agenda.startTime : agenda.endTime);
                const countdown = Math.floor((endDate.getTime() - lastTime.getTime()) / (1000 * 3600 * 24));
                // 说明该Agenda已经过期
                return countdown >= 0;
            })
            .map((agenda: Agenda, index: number) => {
                let comparedDate;
                let countdown;
                if(agenda.endTime !== '') {
                    comparedDate = new Date(agenda.endTime);
                } else if(agenda.startTime !== '') {
                    comparedDate = new Date(agenda.startTime);
                }

                if(comparedDate) {
                    countdown = Math.floor((comparedDate.getTime() - lastTime.getTime()) / (1000 * 3600 * 24));
                }

                return (
                    <View key={agenda.id} style={{height: 75, width: '100%'}}>
                        {/* 分割线 */}
                        <View
                            style={{
                                width: '90%',
                                marginHorizontal: '5%',
                                height: 1,
                                backgroundColor: BackgroundColor.grey
                            }}
                        >
                        </View>
                        <Pressable
                            style={{width: '100%'}}
                            onPress={() => {
                                dispatch(setShowedAgenda(agenda));
                                dispatch(showAddBoard());
                            }}>
                            <AgendaBox
                                handleClose={closeOpenedSwipeable}
                                index={index} agenda={agenda}
                                countdown={countdown}
                                ref={el => swipeableListRef.current[index] = el as SwipeableMethods}
                                sendIndex={setIndex}
                            />
                        </Pressable>
                    </View>
                )
            })
    }, [lastTime, agendaList])

    // 没有考试展示
    const noExam = <NoExam/>

    return (
        <View style={{width: '100%', flex: 1}}>
            <ScrollView
                nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
                style={ss.countdownListContainer}
                onScroll={closeOpenedSwipeable}
            >
                {agendaListLength === 0 && onlyExam ? noExam : renderList}
            </ScrollView>
        </View>
    );
}

const NoExam = () => {
    return (
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
    );
}

interface AgendaBoxProps {
    agenda: Agenda,
    countdown: number | undefined,
    index: number,
    handleClose: (idx: number) => void,
    sendIndex: (index: number) => void
}

const AgendaBox = forwardRef((
    {
        agenda,
        countdown,
        index,
        handleClose,
        sendIndex,
    }: AgendaBoxProps, ref: any) => {
    const winWidth = useWindowDimensions().width;
    const dispatch = useAppDispatch();

    const swipeableRef = useRef<SwipeableMethods>(null);
    const isOnTop = agenda.isOnTop;

    // 将close暴露给父组件
    useImperativeHandle(ref, () => ({
        close: () => {
            swipeableRef.current?.close();
        }
    }))

    // yyyy/mm/dd mm:ss-mm:ss or yyyy/mm/dd mm:ss
    let timeStr = useMemo(() => {
        if(agenda.startTime === '') {
            return '无时间';
        } else {
            const startTime = new Date(agenda.startTime);
            const endTime = agenda.endTime !== '' ? new Date(agenda.endTime) : undefined;

            return convertDateToString(startTime, endTime);
        }
    }, [agenda.startTime, agenda.endTime]);
    let weekDay = useMemo(() => {
        if(agenda.startTime === '') {
            return '';
        } else {
            const startTime = new Date(agenda.startTime);
            return CNWeekDay[startTime.getDay()];
        }
    }, [agenda.startTime, agenda.endTime])
    let location = useMemo(() => agenda.location === '' ? '无地点' : agenda.location, [agenda.location]);

    // 标签渲染
    const typeTip = () => {
        return (
            <View style={[ss.agendaTagContainer, {backgroundColor: BackgroundColor.tertiary}]}>
                <ScalingNotAllowedText style={{
                    fontSize: FontSize.ss,
                    color: FontColor.light,
                    lineHeight: 15
                }}>{AgendaType[agenda.type!]}</ScalingNotAllowedText>
                <ScalingNotAllowedText>{agenda.isOnTop}</ScalingNotAllowedText>
            </View>
        )
    }

    const handlePinToTop = () => {
        swipeableRef.current?.reset();
        if (agenda.isCustom) {
            dispatch(selfChangedCountIncrement());
            dispatch(addSelfToTop(agenda.id));
        } else {
            dispatch(examChangedCountIncrement());
            dispatch(addExamToTop(agenda.id));
        }
    };

    const handleUnpinToTop = () => {
        swipeableRef.current?.reset();
        if (agenda.isCustom) {
            dispatch(selfChangedCountIncrement());
            dispatch(removeSelfFromTop(agenda.id));
        } else {
            dispatch(examChangedCountIncrement());
            dispatch(removeExamFromTop(agenda.id));
        }
    };

    const handleDelete = () => {
        if (!agenda.isCustom) {
            ToastAndroid.showWithGravity('考试不可以删除!', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            swipeableRef.current?.close();
        } else {
            dispatch(selfChangedCountIncrement());
            dispatch(removeSelf(agenda.id));
        }
    };

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
            overshootLeft={false}
            onSwipeableOpenStartDrag={() => handleClose(index)}
            onSwipeableWillOpen={() => sendIndex(index)}
        >
            <View style={[ss.agendaContainer, {backgroundColor: isOnTop ? '#eeeeee' : BackgroundColor.mainLight}]}>
                <View>
                    <View style={ss.agendaNameContainer}>
                        <ScalingNotAllowedText
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={
                                [ss.agendaName, {maxWidth: winWidth * .4}]
                            }
                        >
                            {agenda.name}
                        </ScalingNotAllowedText>
                        {agenda.type !== undefined && typeTip()}
                    </View>
                    {agenda.text !== '' ? <ScalingNotAllowedText
                        numberOfLines={1} ellipsizeMode="tail"
                        style={[ss.agendaText, {maxWidth: winWidth * .4, paddingLeft: '5%'}]}>{agenda.text}</ScalingNotAllowedText> : null}
                </View>
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
                    <ScalingNotAllowedText numberOfLines={1} ellipsizeMode="tail" style={[ss.agendaInfoText, {maxWidth: winWidth * .3}]}>{location}</ScalingNotAllowedText>
                </View>
                {(countdown !== undefined && countdown >= 0) ? (
                    <View style={ss.countdownContainer}>
                        <ScalingNotAllowedText style={ss.countdownText}>还剩</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={ss.countdownDayText}>{countdown}</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={ss.countdownText}>天</ScalingNotAllowedText>
                    </View>
                ) : null}
            </View>
        </Swipeable>
    )
})

const ss = StyleSheet.create({
    agendaComponentContainer: {
        width: '100%',
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
        paddingHorizontal: 25,
        backgroundColor: '#fff',
    },

    agendaNameContainer: {
        paddingTop: 10,
        paddingLeft: '5%',
        display: 'flex',
        flexDirection: 'row',
    },

    agendaName: {
        color: FontColor.dark,
        fontSize: FontSize.l,
        fontWeight: '600',
    },

    agendaLocationAndTimeContainer: {
        paddingLeft: '5%',
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
        right: '8%',
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
        fontSize: FontSize.ss,
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
