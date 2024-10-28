import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import React, {useEffect, useState} from "react";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {Agenda, selectAgendaList, selectExamList, showAddBoard} from "../../../app/slice/agendaSlice.ts";
import XMLResources from "../../../basic/XMLResources.ts";
import {AgendaType, CNWeekDay} from "../../../utils/enum.ts";
import {Gesture, GestureDetector, GestureHandlerRootView} from "react-native-gesture-handler";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";

const agendaComponent = () => {
    const useDispatch = useAppDispatch();
    // 是否只展示exam
    const [onlyExam, setOnlyExam] = useState<boolean>(false);
    const countdownList = <CountdownList onlyExam={onlyExam} />

    const handleOnlyExam = () => {
        setOnlyExam(!onlyExam);
        console.log(onlyExam);
    }
    // TODO: 添加倒计时
    const handleAddCountdown = () => {
        useDispatch(showAddBoard());
    }

    // TODO: 没有添加
    // 没有考试展示
    const noExam = (
        <View>
            <SvgXml xml={XMLResources.noAgendaOnlyExams} width={193} height={127}/>
            <Text
                style={{width: '100%', textAlign: 'center', color: FontColor.grey}}>没有考试的日子也要好好学习哦~</Text>
        </View>
    )



    return (
        <View style={ss.agendaComponentContainer}>
            <View style={ss.functionContainer}>
                <Pressable onPress={handleAddCountdown}>
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
}

/**
 * Agenda列表部分
 */
const CountdownList = ({onlyExam}: {onlyExam: boolean}): React.JSX.Element => {
    const agendaList = onlyExam ? useAppSelector(selectExamList) : useAppSelector(selectAgendaList);

    const [lastTime, setLastTime] = useState(new Date());
    const intervalID = setInterval(() => {
        setLastTime(new Date());
    }, 8000);

    useEffect(() => {
        return () => {
            clearInterval(intervalID);
        }
    })

    let renderList;
    renderList = agendaList.map((agenda: Agenda, index) => {
        const time = agenda.startTime;
        const year = time[0];
        const month = time[1];
        const day = time[2];
        const weekDay = time[5];
        // 只对天进行判断，不判断一天内是否过期
        let date = new Date(year, month - 1, day);
        const countdown = Math.floor((date.getTime() - lastTime.getTime()) / (1000 * 3600 * 24));
        // 说明该Agenda已经过期
        if (countdown < 0) return;

        return <AgendaBox agenda={agenda} countdown={countdown} key={agenda.id} />
    })

    return (
        <GestureHandlerRootView style={ss.countdownListContainer}>
            {renderList}
        </GestureHandlerRootView>
    );
}

const AgendaBox = ({agenda, countdown}: {agenda: Agenda, countdown: number}) => {
    const time = agenda.startTime;
    const year = time[0];
    const month = time[1];
    const day = time[2];
    const weekDay = time[5];

    // yyyy/mm/dd
    const timeStr = `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`;

    // 标签渲染
    const typeList = agenda.types.map((type, index) => {
        return (
            <View style={ss.agendaTagContainer}>
                <Text style={{fontSize: FontSize.ss, color: FontColor.light, lineHeight: 15}}>{AgendaType[type]}</Text>
            </View>
        )
    })

    // TODO: 手势处理
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
            translateX.value = startTranslateX.value + event.translationX;
        })
        .onEnd((event) => {
            const velocityX = event.velocityX;
            if(velocityX < 0) {
                if(velocityX < -300 || translateX.value + event.translationX < -30) {
                    translateX.value = withTiming(-60, {
                        duration: 300,
                    })
                }
                else {
                    translateX.value = withTiming(0, {
                        duration: 300,
                    })
                }
            }
            else {
                if(velocityX > 300 || translateX.value + event.translationX > -30) {
                    translateX.value = withTiming(0, {
                        duration: 300,
                    })
                }
                else {
                    translateX.value = withTiming(-60, {
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
                        <Text style={[ss.agendaInfoText]}>{CNWeekDay[weekDay]}</Text>
                        <View style={{
                            width: .5,
                            height: 12,
                            backgroundColor: FontColor.grey,
                            marginHorizontal: 5
                        }}></View>
                        <SvgXml xml={XMLResources.location} width={9} height={9}/>
                        <Text style={[ss.agendaInfoText]}>{agenda.location}</Text>
                    </View>
                    <View style={ss.countdownContainer}>
                        <Text style={ss.countdownText}>还剩</Text>
                        <Text style={ss.countdownDayText}>{countdown}</Text>
                        <Text style={ss.countdownText}>天</Text>
                    </View>
                    <Pressable
                        style={[ss.agendaButton, {
                            backgroundColor: BackgroundColor.iconSecondaryBackground,
                            right: -60
                        }]}>
                        <SvgXml xml={XMLResources.deleteAgenda} width={15} height={15} />
                        <Text style={[ss.agendaButtonText, {color: BackgroundColor.iconSecondary}]}>删除</Text>

                    </Pressable>
                    <Pressable style={[ss.agendaButton, {
                        backgroundColor: BackgroundColor.iconPrimaryBackground,
                        right: -30
                    }]}>
                        <SvgXml xml={XMLResources.pinToTop} width={15} height={15} />
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
        alignItems: 'center',
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
        fontSize: FontSize.ll,
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
        width: 30,
        top: 0,
    },

    agendaButtonText: {
        fontSize: FontSize.xxs,
    },
})

export default agendaComponent;
