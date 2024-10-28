import React, {useEffect, useRef, useState} from "react";
import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../../basic/XMLResources.ts";
import {BackgroundColor, FontColor, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import Animated, {Easing, runOnJS, useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {useAppDispatch} from "../../../app/hooks.ts";
import {hideAddBoard} from "../../../app/slice/agendaSlice.ts";
import MyTextInput from "./myTextInput.tsx";
import DateTimePickerModal from "react-native-modal-datetime-picker";


/**
 * 呼出倒计时添加
 * @constructor
 */
const AddBoard = () => {
    const dispatch = useAppDispatch();
    const [onlyExam, setOnlyExam] = useState(false);
    const [name, setName] = useState('');
    const [dateVisibility, setDateVisibility] = useState(false);
    const [dateStr, setDateStr] = useState<string>('');

    const translateY = useSharedValue(500);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translateY.value}]
        }
    })

    useEffect(() => {
        translateY.value = withTiming(0, {
            duration: 500,
            easing: Easing.ease,
        })
    }, []);

    const handleOnlyExam = () => {
        setOnlyExam(!onlyExam);
    }

    const hideBoard = () => {
        dispatch(hideAddBoard());
    }

    const handleClose = (event: any) => {
        translateY.value = withTiming(400, {
            duration: 300,
            easing: Easing.ease,
        }, () => runOnJS(hideBoard)());
    }

    const handleName = (data: string) => {
        setName(data);
    }

    const handleTime = () => {

    }

    const handleLocation = () => {

    }

    const handleTip = () => {

    }

    const showDatePicker = () => {
        setDateVisibility(true);
    }

    const handleConfirm = (date) => {
        console.log(date);
        console.log(typeof date);
    }

    const handleCancel = () => {
        setDateVisibility(false);
    }

    return (
        <View style={{flex: 1, position: 'relative', backgroundColor: 'rgba(45,45,45,0.3)'}}>
            <Animated.View style={[ss.addAgendaContainer, animatedStyle]}>
                <View style={{width: '100%', height: 30, display: 'flex', alignItems: 'flex-end'}}>
                    <Pressable onPress={handleClose}>
                        <SvgXml xml={XMLResources.closeAddBoard} width="20" height="20"/>
                    </Pressable>
                </View>
                <View>
                    <Text style={ss.inputAgendaText}>事项名称</Text>
                    <Pressable onPress={handleOnlyExam} style={{display: 'flex', flexDirection: 'row', position: 'absolute', top: 0, right: 0}}>
                        <SvgXml xml={onlyExam ? XMLResources.exam : XMLResources.notExam} width="16" height="16"/>
                        <Text style={{marginLeft: 5, color: FontColor.grey, lineHeight: 17}}>仅考试</Text>
                    </Pressable>
                    <MyTextInput placeholder={'如: 英语四级'} sendData={handleName} />
                </View>
                <View style={{display: 'flex', flexDirection: 'row', width: '100%', marginTop: 10}}>
                    <View style={{width: '40%'}}>
                        <Text style={ss.inputAgendaText}>时间</Text>
                        <Pressable style={ss.dateContainer} onPress={showDatePicker}>
                            <Text>{}</Text>
                        </Pressable>
                    </View>
                    <View style={{flex: 1, marginLeft: 10}}>
                        <Text style={ss.inputAgendaText}>地点</Text>
                        <MyTextInput placeholder={'(选填)'} sendData={handleName} />
                    </View>
                </View>
                <View style={{marginTop: 10}}>
                    <Text style={ss.inputAgendaText}>备注</Text>
                    <MyTextInput placeholder={'(选填)如: 四级500分一击必中!!!'} sendData={handleName} multiline={true} height={90} alignCenter={false} />
                </View>
                <View style={{display: 'flex', alignItems: 'center', marginTop: 25}}>
                    <Pressable style={[ss.finishButton, {backgroundColor: '#123'}]}>
                        <Text style={{fontSize: FontSize.m, color: FontColor.light, textAlign: 'center', height: '100%', lineHeight: 30, fontWeight: '600'}}>完成</Text>
                    </Pressable>
                </View>
                <DateTimePickerModal
                    isVisible={dateVisibility}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                    ></DateTimePickerModal>
            </Animated.View>
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
        position: 'absolute',
        bottom: 0,
        zIndex: 20,
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
