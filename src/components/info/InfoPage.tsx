import React, {useEffect, useState} from "react";
import {Modal, Pressable, StyleSheet, Text, View} from "react-native";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import {SvgXml} from "react-native-svg";
import XMLResources from "../../basic/XMLResources.ts";
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {agendaResetAll, selectCurrentAgendaNumber} from "../../app/slice/agendaSlice.ts";
import {resetSchedule, selectCurrentCourseNumber} from "../../app/slice/scheduleSlice.ts";
import {selectStudentID, selectStudentMajor, selectStudentName} from "../../app/slice/infoSlice.ts";
import {logoutSuccessful, selectIsLogin} from "../../app/slice/globalSlice.ts";
import {NavigationProps} from "../home/homePage.tsx";
import ScalingNotAllowedText from "../global/ScalingNotAllowedText.tsx";
import {useQuery, useRealm} from "@realm/react";
import GongUser from "../../dao/object/User.ts";
import {getAndroidId, getVersion} from "react-native-device-info";

const InfoPage = ({navigation}: NavigationProps) => {
    // realm
    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    // redux
    const dispatch = useAppDispatch();
    const agendaNumber = useAppSelector(selectCurrentAgendaNumber);
    const courseNumber = useAppSelector(selectCurrentCourseNumber);
    const studentID = useAppSelector(selectStudentID);
    const name = useAppSelector(selectStudentName);
    const major = useAppSelector(selectStudentMajor);
    const isLogin = useAppSelector(selectIsLogin);

    // state
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [version, setVersion] = useState<string>('--');

    const handleReLogin = () => {
        setModalVisible(false);
        dispatch(agendaResetAll());
        dispatch(resetSchedule());
        realm.write(() => {
            realm.delete(user);
        })
        setTimeout(() => dispatch(logoutSuccessful()), 800);
    }

    useEffect(() => {
        setVersion(getVersion());
    }, []);

    return (
        <View style={{flex: 1}}>
            <View style={ss.titleBar}>
                <Text style={ss.titleText}>我的</Text>
                {/*<Pressable style={{*/}
                {/*    position: 'absolute',*/}
                {/*    top: 46,*/}
                {/*    right: 20,*/}
                {/*}}>*/}
                {/*    <SvgXml xml={XMLResources.more} width={35} height={35}/>*/}
                {/*</Pressable>*/}
            </View>
            <View style={ss.mainContainer}>
                {/* 个人信息 */}
                <View style={ss.infoContainer}>
                    <View style={ss.innerInfoContainer}>
                        <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 6}}>
                            <View style={{width: 35, height: 35, borderRadius: 20, backgroundColor: 'red'}}></View>
                            <Pressable style={{height: '100%', paddingHorizontal: 12}} onPress={isLogin ? null : handleReLogin}>
                                <Text>{isLogin ? name : '点击登录'}</Text>
                            </Pressable>
                        </View>

                        <Pressable style={ss.editInfoButton}>
                            <Text
                                style={{
                                    color: FontColor.dark,
                                    fontSize: FontSize.ss,
                                    fontWeight: '700',
                                    letterSpacing: 1,
                                    width: '100%',
                                    textAlign: 'center',
                                    height: '100%',
                                    lineHeight: 17,
                                }}
                            >{studentID}</Text>
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
                <View style={[ss.infoContainer, {paddingTop: 5, paddingBottom: 40, paddingHorizontal: 0}]}>
                    {/*<NavigationBox title={'新功能'} handleNavigation={() => null}/>*/}
                    {/*<NavigationBox title={'新手指南'} handleNavigation={() => null}/>*/}
                    {/*<NavigationBox title={'关于拱拱'} handleNavigation={() => null}/>*/}
                    <NavigationBox title='联系我们' handleNavigation={() => navigation.navigate('FeedbackPage')}/>
                    <NavigationBox title='用户协议' handleNavigation={() => navigation.navigate('UserAgreementPage')}/>
                    <NavigationBox title='隐私条款' handleNavigation={() => navigation.navigate('PrivacyPolicyPage')}/>
                    <NavigationBox title='社区规范' handleNavigation={() => navigation.navigate('SpecificationPage')}/>
                    <View
                        style={{
                            width: '100%',
                            paddingVertical: 12,
                            paddingHorizontal: 20,
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderBottomWidth: .5,
                            borderBottomColor: BackgroundColor.grey,
                        }}
                    >
                        <Text
                            style={{
                                fontSize: FontSize.s,
                                color: FontColor.dark,
                            }}
                        >当前版本</Text>
                        <Text
                            style={{
                                fontSize: FontSize.s,
                                color: FontColor.dark,
                            }}
                        >{version}</Text>
                    </View>
                </View>
                {/* 登录/退出登录 按钮 */}
                <Pressable
                    style={{
                        height: 43,
                        width: '100%',
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BackgroundColor.primary,
                        marginVertical: 15,
                        bottom: 0,
                        position: 'absolute',
                        transform: [{translateY: 35}]
                    }}
                    onPress={() => setModalVisible(true)}>
                    <Text
                        style={{
                            color: FontColor.light,
                            letterSpacing: 1,
                            fontWeight: '600'
                        }}
                    >{isLogin ? '退出登录' : '登录'}</Text>
                </Pressable>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType={'fade'}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(0, 0, 0, .2)'
                }}>
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
                            fontWeight: '800',
                            marginBottom: 25,
                            marginTop: 10
                        }}>提示</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={{fontWeight: '600'}}>确定要退出登录？</ScalingNotAllowedText>
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
                                       onPress={handleReLogin}>
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

/**
 * 更多信息中的跳转盒子
 * @param title
 * @param handleNavigation
 */
const NavigationBox = ({title, handleNavigation}: {
    title: string,
    handleNavigation: () => void
}) => {

    return (
        <View
            style={{
                width: '100%',
                paddingVertical: 12,
                paddingHorizontal: 20,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottomWidth: .5,
                borderBottomColor: BackgroundColor.grey,
            }}
        >
            <Text
                style={{
                    fontSize: FontSize.s,
                    color: FontColor.dark,
                }}
            >{title}</Text>
            <Pressable onPress={handleNavigation} hitSlop={{top: 8, bottom: 8, right: 15, left: 15}}>
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
        // borderWidth: 1,
        // borderColor: BorderColor.grey,
        height: 20,
        paddingHorizontal: 5,
        // borderRadius: 10,
    },
})

export default InfoPage;
