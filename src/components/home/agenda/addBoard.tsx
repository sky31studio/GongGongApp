import React, {useEffect, useMemo, useState} from "react";
import {Modal, Pressable, StyleSheet, ToastAndroid, View} from "react-native";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../../basic/XMLResources.ts";
import {BackgroundColor, FontColor, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import Animated, {
    Easing,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import MyTextInput from "./myTextInput.tsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {
    addSelf,
    hideAddBoard,
    selectShowedAgenda,
    selfChangedCountIncrement,
    updateSelf
} from "../../../app/slice/agendaSlice.ts";
import ScalingNotAllowedText from "../../global/ScalingNotAllowedText.tsx";
import {transTo2Digits} from "../../../utils/agendaUtils.ts";

/**
 * 呼出倒计时添加
 * @constructor
 */
const AddBoard = () => {
    const dispatch = useAppDispatch();
    const agenda = useAppSelector(selectShowedAgenda);
    // 是否是考试
    const [onlyExam, setOnlyExam] = useState<boolean>(agenda ? (agenda.type === 0) : false);
    //  初始化设置名称、地点、tip、起止时间
    const [name, setName] = useState<string>(agenda ? agenda.name : '');
    const [location, setLocation] = useState<string>(agenda ? agenda.location : '');
    const [tip, setTip] = useState<string>(agenda?.text ?? '');
    const [theDate, setTheDate] = useState<Date | null>(agenda ? (agenda.startTime === '' ? null : new Date(agenda.startTime)) : null);
    // 起始和终止下标
    const [timePickerIndex, setTimePickerIndex] = useState<number | null>(null);
    // 起止时间Date对象
    const [startTime, setStartTime] = useState<Date | null>(agenda ? (agenda.startTime === '' ? null : new Date(agenda.startTime)) : null);
    const [endTime, setEndTime] = useState<Date | null>(agenda ? (agenda.endTime === '' ? null : new Date(agenda.endTime)) : null);
    // picker显示
    const [datePickerVisible, setDatePickerVisible] = useState<boolean>(false);
    const [timePickerVisible, setTimePickerVisible] = useState<boolean>(false);
    // 提示Modal显示
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [type, setType] = useState<number>(0);

    const disabled = useMemo(() => name === '', [name]);
    const tipBoardText = useMemo(() => {
        if(!agenda) {
            return type === 0 ? '确认添加倒计时吗？' : '确认退出添加吗？';
        } else {
            return type === 0 ? '确认保存修改吗？' : '确认退出修改吗？';
        }
    }, [type, agenda])
    // 是否可以编辑，取决于agenda是自定义的还是后端数据
    const editable = useMemo(() => agenda ? agenda.isCustom : true, [agenda]);
    const dateStr = useMemo(() => {
        if(theDate) {
            return `${theDate.getFullYear()}/${transTo2Digits(theDate.getMonth() + 1)}/${transTo2Digits(theDate.getDate())}`;
        }

        return ''
    }, [theDate]);
    // 起止时间字符串
    const startTimeStr = useMemo(() => {
        if(startTime) {
            return `${transTo2Digits(startTime.getHours())}:${transTo2Digits(startTime.getMinutes())}`;
        }

        return '';
    }, [startTime]);
    const endTimeStr = useMemo(() => {
        if(endTime) {
            return `${transTo2Digits(endTime.getHours())}:${transTo2Digits(endTime.getMinutes())}`;
        }

        return '';
    }, [endTime]);

    // '完成'按钮颜色变化
    const colorValue = useSharedValue(agenda ? 1 : 0);
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorValue.value, [0, 1], [BackgroundColor.invalid, BackgroundColor.primary])
        }
    })

    // 起止时间色块的背景色
    const firstTimeColorValue = useSharedValue((agenda && agenda.startTime !== '') ? 1 : 0);
    const secondTimeColorValue = useSharedValue((agenda && agenda.endTime !== '') ? 1 : 0);

    const firstTimeAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(firstTimeColorValue.value, [0, 1], [BackgroundColor.grey, '#fff7f8'])
        }
    })
    const secondTimeAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(secondTimeColorValue.value, [0, 1], [BackgroundColor.grey, '#fff7f8'])
        }
    })

    // 仅考试
    const handleOnlyExam = () => {
        if(agenda && !agenda.isCustom) return;
        setOnlyExam(!onlyExam);
    }
    // onChangeText回调函数
    const handleName = (data: string) => {
        setName(data);
    }

    const handleLocation = (data: string) => {
        setLocation(data);
    }

    const handleTip = (data: string) => {
        setTip(data);
    }
    // ----------------------
    const showDatePicker = () => {
        if(agenda && !agenda.isCustom) return;

        setDatePickerVisible(true);
    }

    const showFirstTimePicker = () => {
        if(agenda && !agenda.isCustom) return;
        if(firstTimeColorValue.value === 0) return;

        setTimePickerIndex(0);
        setTimePickerVisible(true);
    }

    const showSecondTimePicker = () => {
        if(agenda && !agenda.isCustom) return;
        if(secondTimeColorValue.value === 0) return;

        setTimePickerIndex(1);
        setTimePickerVisible(true);
    }

    const handleTimePickerCancel = () => {
        setTimePickerIndex(null);
        setTimePickerVisible(false);
    }

    const handleDatePickerCancel = () => {
        setDatePickerVisible(false);
    }
    // 添加倒计时回调函数
    const handleDateConfirm = (date: Date) => {
        setTheDate(date);

        if(firstTimeColorValue.value === 0) {
            firstTimeColorValue.value = withTiming(1, {
                duration: 300,
                easing: Easing.ease
            })
        }

        setDatePickerVisible(false);
    }

    const handleTimeConfirm = (date: Date) => {
        date.setFullYear(theDate!.getFullYear());
        date.setMonth(theDate!.getMonth());
        date.setDate(theDate!.getDate());

        if(timePickerIndex === 0) {
            setStartTime(date);

            if(endTime !== null && date.getTime() > endTime?.getTime()) {
                setEndTime(null);
            }

            if(secondTimeColorValue.value === 0) {
                secondTimeColorValue.value = withTiming(1, {
                    duration: 300,
                    easing: Easing.ease
                })
            }

        } else {
            if(startTime != null && date.getTime() < startTime.getTime()) {
                ToastAndroid.showWithGravity('不能小于起始时间!', 2000, ToastAndroid.BOTTOM);
                setTimePickerVisible(false);
                return;
            }

            setEndTime(date);
        }

        setTimePickerVisible(false);
    }

    const closeTrigger = () => {
        setType(1);

        if(!agenda && name === '' && location === '' && tip === '' && theDate === null && startTime === null && endTime === null) {
            dispatch(hideAddBoard());
        } else if(!agenda) {
            setModalVisible(true);
        } else if(agenda && agenda.isCustom) {
            setModalVisible(true);
        } else {
            dispatch(hideAddBoard());
        }
    }

    const addTrigger = () => {
        setType(0);
        setModalVisible(true);
    }

    const handleCloseConfirm = () => {
        dispatch(hideAddBoard());
    }

    // 添加agenda
    const handleAddAgenda = () => {
        if(agenda && !agenda.isCustom) {
            dispatch(hideAddBoard());
            return;
        }
        if(name === '') return;

        let start = theDate === null ? '' : theDate.toString();
        start = startTime === null ? start : startTime.toString();
        let end = endTime === null ? '' : endTime.toString();
        const res = {
            id: agenda ? agenda.id : null,
            name: name,
            text: tip,
            startTime: start,
            endTime: end,
            location: location,
            type: onlyExam ? 0 : undefined,
            isCustom: true,
            isOnTop: false,
        }

        if(agenda && agenda.isCustom) {
            dispatch(updateSelf(res));
        }
        else if(!agenda){
            dispatch(selfChangedCountIncrement());
            dispatch(addSelf(res));
        }

        setModalVisible(false);
        dispatch(hideAddBoard());
    }

    // name不为空时，完成按钮变为valid
    useEffect(() => {
        if (name !== '') {
            colorValue.value = withTiming(1, {
                duration: 300,
                easing: Easing.ease,
            })
        } else if(colorValue.value !== 0) {
            colorValue.value = withTiming(0, {
                duration: 300,
                easing: Easing.ease,
            })
        }
    }, [name]);

    return (
        <View style={ss.addAgendaContainer}>
            <View style={{width: '100%', height: 30, display: 'flex', alignItems: 'flex-end'}}>
                <Pressable onPress={closeTrigger} hitSlop={{top: 4, bottom: 4, left: 8, right: 8}}>
                    <SvgXml xml={XMLResources.closeAddBoard} width="20" height="20"/>
                </Pressable>
            </View>
            <View style={{width: '100%'}}>
                <ScalingNotAllowedText style={ss.inputAgendaText}>事项名称</ScalingNotAllowedText>
                <Pressable onPress={handleOnlyExam}
                           style={{display: 'flex', flexDirection: 'row', position: 'absolute', top: 0, right: 0}}>
                    <SvgXml xml={onlyExam ? XMLResources.exam : XMLResources.notExam} width="16" height="16"/>
                    <ScalingNotAllowedText style={{marginLeft: 5, color: FontColor.grey, lineHeight: 17}}>考试</ScalingNotAllowedText>
                </Pressable>
                <MyTextInput editable={editable} placeholder={'如: 英语四级'} initText={agenda ? agenda.name : ''} sendData={handleName}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 10}}>
                <View style={{width: '40%'}}>
                    <ScalingNotAllowedText style={ss.inputAgendaText}>日期</ScalingNotAllowedText>
                    <Pressable style={[ss.dateContainer, {backgroundColor: '#fff7f8'}]} onPress={showDatePicker}>
                        <ScalingNotAllowedText style={{paddingLeft: 5, color: FontColor.dark}}>{dateStr}</ScalingNotAllowedText>
                    </Pressable>
                </View>
                <View style={{width: '23%'}}>
                    <ScalingNotAllowedText style={ss.inputAgendaText}>起始时间</ScalingNotAllowedText>
                    <Animated.View style={[ss.dateContainer, firstTimeAnimatedStyle]}>
                        <Pressable style={{flex: 1, justifyContent: 'center'}} onPress={showFirstTimePicker}>
                            <ScalingNotAllowedText style={{paddingLeft: 5, color: FontColor.dark}}>{startTimeStr}</ScalingNotAllowedText>
                        </Pressable>
                    </Animated.View>
                </View>
                <View style={{width: '23%'}}>
                    <ScalingNotAllowedText style={ss.inputAgendaText}>终止时间</ScalingNotAllowedText>
                    <Animated.View style={[ss.dateContainer, secondTimeAnimatedStyle]}>
                        <Pressable style={{flex: 1, justifyContent: 'center'}} onPress={showSecondTimePicker}>
                            <ScalingNotAllowedText style={{paddingLeft: 5, color: FontColor.dark}}>{endTimeStr}</ScalingNotAllowedText>
                        </Pressable>
                    </Animated.View>
                </View>
            </View>
            <View style={{marginTop: 10, width: '100%'}}>
                <ScalingNotAllowedText style={ss.inputAgendaText}>地点</ScalingNotAllowedText>
                <MyTextInput editable={editable} placeholder={'(选填)'} initText={agenda ? agenda.location : ''} sendData={handleLocation}/>
            </View>

            {editable ? (
                <View style={{marginTop: 10, width: '100%'}}>
                    <ScalingNotAllowedText style={ss.inputAgendaText}>备注</ScalingNotAllowedText>
                    <MyTextInput placeholder={'(选填)如: 四级500分一击必中!!!'} initText={agenda ? agenda.text : ''} sendData={handleTip} multiline={true}
                                 height={90} alignCenter={false}/>
                </View>
            ) : null}
            {(agenda?.isCustom || !agenda) ? (
                <Pressable onPress={addTrigger} style={{marginTop: 25}} disabled={disabled}>
                    <Animated.View style={[ss.finishButton, buttonAnimatedStyle]}>
                        <ScalingNotAllowedText style={{
                            fontSize: FontSize.m,
                            color: FontColor.light,
                            textAlign: 'center',
                            height: '100%',
                            lineHeight: 30,
                            fontWeight: '600'
                        }}>完成</ScalingNotAllowedText>
                    </Animated.View>
                </Pressable>
            ) : null}
            <DateTimePickerModal
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={handleDateConfirm}
                onCancel={handleDatePickerCancel}
                minimumDate={new Date()}
            ></DateTimePickerModal>
            <DateTimePickerModal
                isVisible={timePickerVisible}
                mode="time"
                onConfirm={handleTimeConfirm}
                onCancel={handleTimePickerCancel}
            ></DateTimePickerModal>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType={'fade'}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BackgroundColor.modalShadow}}>
                    <View
                        style={{
                            width: '70%',
                            backgroundColor:
                            BackgroundColor.mainLight,
                            borderRadius: 15,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <ScalingNotAllowedText style={{
                            fontSize: FontSize.ll,
                            color: FontColor.dark,
                            fontWeight: '800',
                            marginBottom: 25,
                            marginTop: 10
                        }}>提示</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={{fontWeight: '600', color: FontColor.dark}}>{tipBoardText}</ScalingNotAllowedText>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: 30,
                            borderTopWidth: 1,
                            borderTopColor: BackgroundColor.grey
                        }}>
                            <Pressable style={{
                                width: '50%',
                                alignItems: 'center',
                                borderRightWidth: 1,
                                borderRightColor: BackgroundColor.grey,
                                paddingVertical: 15
                            }} onPress={() => setModalVisible(false)}>
                                <ScalingNotAllowedText
                                    style={{color: FontColor.grey, fontSize: FontSize.l}}>取消</ScalingNotAllowedText>
                            </Pressable>
                            <Pressable style={{width: '50%', alignItems: 'center', paddingVertical: 15}}
                                       onPress={type === 0 ? handleAddAgenda : handleCloseConfirm}>
                                <ScalingNotAllowedText style={{
                                    color: FontColor.primary,
                                    fontSize: FontSize.l
                                }}>确定</ScalingNotAllowedText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const ss = StyleSheet.create({
    addAgendaContainer: {
        width: '100%',
        paddingBottom: 25,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    inputAgendaText: {
        fontSize: FontSize.s,
        color: FontColor.grey,
        letterSpacing: 1,
        marginBottom: 8,
    },

    inputAgenda: {
        height: 34,
        borderRadius: 5,
        fontSize: FontSize.m,
        backgroundColor: '#fff7f8',
        paddingLeft: 5,
        paddingTop: 2,
    },

    finishButton: {
        width: 100,
        height: 32,
        borderRadius: 16,
    },

    dateContainer: {
        width: '100%',
        height: 34,
        justifyContent: 'center',
        borderRadius: 5,
    }
})

export default AddBoard;
