import React, {useEffect, useState} from "react";
import {Pressable, StyleSheet, ToastAndroid, View} from "react-native";
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
import {useAppDispatch} from "../../../app/hooks.ts";
import MyTextInput from "./myTextInput.tsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import {addSelf, hideAddBoard} from "../../../app/slice/agendaSlice.ts";
import ScalingNotAllowedText from "../../global/ScalingNotAllowedText.tsx";


/**
 * 呼出倒计时添加
 * @constructor
 */
const AddBoard = () => {
    const dispatch = useAppDispatch();
    const [onlyExam, setOnlyExam] = useState<boolean>(false);
    const [name, setName] = useState<string>('');
    const [dateStr, setDateStr] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [location, setLocation] = useState<string>('');
    const [tip, setTip] = useState<string>('');
    const [dateVisibility, setDateVisibility] = useState<boolean>(false);

    const colorValue = useSharedValue(0);
    const buttonAnimatedStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(colorValue.value, [0, 1], [BackgroundColor.invalid, BackgroundColor.primary])
        }
    })

    // name和location不为空时，完成按钮变为valid
    useEffect(() => {
        if (name !== '' && location !== '') {
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
    }, [name, location]);

    // onChangeText监听函数
    const handleOnlyExam = () => {
        setOnlyExam(!onlyExam);
    }

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
        setDateVisibility(true);
    }

    const handleConfirm = (date: Date) => {
        if(date.getTime() <= new Date().getTime()) {
            ToastAndroid.showWithGravity('请选择未来的时间段！', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
            setDateVisibility(false);
            return;
        }

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        setDate(date);
        setDateStr(`${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`);
        setDateVisibility(false);
    }

    const handleCancel = () => {
        setDateVisibility(false);
    }

    // 添加agenda
    const handleAddAgenda = () => {
        if(name === '' || location === '') {
            return;
        }

        let start = dateStr === '' ? '' : date.toString();
        // TODO: 目前没有截止时间的选择
        const end = '';
        const agenda = {
            name: name,
            text: tip,
            startTime: start,
            endTime: end,
            location: location,
            isCustom: true,
            isOnTop: false,
        }
        dispatch(addSelf(agenda));
        dispatch(hideAddBoard());
    }

    return (
        <View style={ss.addAgendaContainer}>
            <View style={{width: '100%', height: 30, display: 'flex', alignItems: 'flex-end'}}>
                <Pressable onPress={() => dispatch(hideAddBoard())}>
                    <SvgXml xml={XMLResources.closeAddBoard} width="20" height="20"/>
                </Pressable>
            </View>
            <View style={{width: '100%'}}>
                <ScalingNotAllowedText style={ss.inputAgendaText}>事项名称</ScalingNotAllowedText>
                <Pressable onPress={handleOnlyExam}
                           style={{display: 'flex', flexDirection: 'row', position: 'absolute', top: 0, right: 0}}>
                    <SvgXml xml={onlyExam ? XMLResources.exam : XMLResources.notExam} width="16" height="16"/>
                    <ScalingNotAllowedText style={{marginLeft: 5, color: FontColor.grey, lineHeight: 17}}>仅考试</ScalingNotAllowedText>
                </Pressable>
                <MyTextInput placeholder={'如: 英语四级'} sendData={handleName}/>
            </View>
            <View style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10}}>
                <View style={{width: '40%'}}>
                    <ScalingNotAllowedText style={ss.inputAgendaText}>时间</ScalingNotAllowedText>
                    <Pressable style={ss.dateContainer} onPress={showDatePicker}>
                        <ScalingNotAllowedText>{dateStr}</ScalingNotAllowedText>
                    </Pressable>
                </View>
                <View style={{flex: 1, marginLeft: 10}}>
                    <ScalingNotAllowedText style={ss.inputAgendaText}>地点</ScalingNotAllowedText>
                    <MyTextInput placeholder={'(选填)'} sendData={handleLocation}/>
                </View>
            </View>
            <View style={{marginTop: 10, width: '100%'}}>
                <ScalingNotAllowedText style={ss.inputAgendaText}>备注</ScalingNotAllowedText>
                <MyTextInput placeholder={'(选填)如: 四级500分一击必中!!!'} sendData={handleTip} multiline={true}
                             height={90} alignCenter={false}/>
            </View>
            <Pressable onPress={handleAddAgenda} style={{marginTop: 25}}>
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
            <DateTimePickerModal
                isVisible={dateVisibility}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            ></DateTimePickerModal>
        </View>
    )
}

const ss = StyleSheet.create({
    addAgendaContainer: {
        width: '100%',
        height: 400,
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
        backgroundColor: '#ffcad1',
    }
})

export default AddBoard;
