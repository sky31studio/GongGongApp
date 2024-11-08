import React from "react";
import {Pressable, StyleSheet, Text, View} from "react-native";
import {BackgroundColor, BorderColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectCurrentAgendaNumber} from "../../app/slice/agendaSlice.ts";
import {selectCurrentCourseNumber} from "../../app/slice/scheduleSlice.ts";
import {selectStudentID, selectStudentMajor, selectStudentName} from "../../app/slice/infoSlice.ts";

const InfoPage = () => {
    const dispatch = useAppDispatch();
    const agendaNumber = useAppSelector(selectCurrentAgendaNumber);
    const courseNumber = useAppSelector(selectCurrentCourseNumber);
    const studentID = useAppSelector(selectStudentID);
    const name = useAppSelector(selectStudentName);
    const major = useAppSelector(selectStudentMajor);

    return (
        <View style={{flex: 1}}>
            <View style={ss.titleBar}>
                <Text style={ss.titleText}>我的</Text>
                <Pressable style={{
                    position: 'absolute',
                    top: 46,
                    right: 20,
                }}>
                    <SvgXml xml={XMLResources.more} width={35} height={35}/>
                </Pressable>
            </View>
            <View style={ss.mainContainer}>
                {/* 个人信息 */}
                <View style={ss.infoContainer}>
                    <View style={ss.innerInfoContainer}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 6}}>
                            <View style={{width: 35, height: 35, borderRadius: 20, backgroundColor: 'red'}}></View>
                            <Text style={{marginLeft: 12}}>点击登录</Text>
                        </View>

                        <Pressable style={ss.editInfoButton}>
                            <Text
                                style={{
                                    color: FontColor.grey,
                                    fontSize: FontSize.ss,
                                    width: '100%',
                                    textAlign: 'center',
                                    height: '100%',
                                    lineHeight: 17,
                                }}
                            >编辑资料</Text>
                        </Pressable>

                    </View>
                    <View style={[ss.innerInfoContainer, {marginTop: 25}]}>
                        <View style={ss.infoBox}>
                            <Text>{courseNumber}</Text>
                            <Text style={ss.infoBoxText}>今日课程</Text>
                        </View>
                        <View style={ss.infoBox}>
                            <Text>{agendaNumber}</Text>
                            <Text style={ss.infoBoxText}>倒计时</Text>
                        </View>
                    </View>
                </View>
                <Text
                    style={{
                        fontSize: FontSize.l,
                        color: FontColor.dark,
                        marginVertical: 15,
                        alignSelf: 'flex-start',
                        fontWeight: '600'
                    }}
                >小Tips</Text>

                {/* 更多信息 */}
                <View style={ss.infoContainer}>

                </View>

                {/* 登录/退出登录 按钮 */}
                <View>

                </View>
            </View>


        </View>
    )
}

/**
 * 更多信息中的跳转盒子
 * @param title
 * @param handleNavigation
 */
const navigationBox = ({title, handleNavigation}: {
    title: string,
    handleNavigation: () => void
}) => {

    return (
        <View
            style={{
                width: '100%',
                paddingVertical: 8,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <Text>{title}</Text>
            <Pressable>
                <SvgXml xml={XMLResources.infoArrow} width={10} height={10}/>
            </Pressable>
        </View>
    )
}

const ss = StyleSheet.create({
    titleBar: {
        width: '100%',
        height: 140,
        paddingTop: 50,
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: BackgroundColor.primary,
        position: 'relative',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    titleText: {
        fontSize: FontSize.ll,
        color: FontColor.light,
        fontWeight: '600',
    },

    mainContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        transform: [{translateY: -35}],
        paddingHorizontal: '7%',
    },

    infoContainer: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 13,
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    innerInfoContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    infoBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    infoBoxText: {
        fontSize: FontSize.s,
        color: FontColor.grey,
    },

    editInfoButton: {
        borderWidth: 1,
        borderColor: BorderColor.grey,
        width: 60,
        height: 20,
        paddingHorizontal: 5,
        borderRadius: 10,
    },
})

export default InfoPage;
