import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
    Image,
    Modal,
    Pressable,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    View,
} from 'react-native';
import {
    BackgroundColor,
    FontColor,
    FontSize,
} from '../../config/globalStyleSheetConfig.ts';
import {SvgXml} from 'react-native-svg';
import XMLResources from '../../basic/XMLResources.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {agendaResetAll} from '../../app/slice/agendaSlice.ts';
import {resetSchedule} from '../../app/slice/scheduleSlice.ts';
import {
    clearInfo,
    selectStudentID,
    selectStudentName,
} from '../../app/slice/infoSlice.ts';
import {logoutSuccessful} from '../../app/slice/globalSlice.ts';
import {NavigationProps} from '../home/homePage.tsx';
import ScalingNotAllowedText from '../global/ScalingNotAllowedText.tsx';
import {useQuery, useRealm} from '@realm/react';
import GongUser from '../../dao/object/User.ts';
import {getVersion} from 'react-native-device-info';
import {clearScore} from '../../app/slice/scoreSlice.ts';
import {useFocusEffect} from '@react-navigation/native';
import Animated, {
    interpolate,
    interpolateColor,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import {
    downloadAndInstallApk,
    navigateToPicSelectScreen,
} from '../../utils/AndoridModuleUtils.ts';
import Resources from '../../basic/Resources.ts';
import {checkUpdate} from '../../utils/infoUtils.tsx';
import axios, {CancelTokenSource} from 'axios';

interface UpdateInfo {
    last_version: string;
    least_version: string;
    update_url: string;
    update_title: string;
    update_notice: string;
    update_date: string;
}

const InfoPage = ({navigation}: NavigationProps) => {
    // realm
    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];

    // redux
    const dispatch = useAppDispatch();
    const studentID = useAppSelector(selectStudentID);
    const name = useAppSelector(selectStudentName);
    // const major = useAppSelector(selectStudentMajor);
    const isLogin = useMemo(() => !!user, [user]);

    // state
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
    const [avatarModalVisible, setAvatarModalVisible] = useState<boolean>(false);
    const [updateInfo, setUpdateInfo] = useState<UpdateInfo | undefined>(undefined);
    const [axiosSource, setAxiosSource] = useState<CancelTokenSource | undefined>(undefined);
    const [version, setVersion] = useState<string>('--');

    const cardAnimatedValue = useSharedValue(0);
    const listAnimatedValue = useSharedValue(0);

    const listAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(listAnimatedValue.value, [0, 1], [0, 1]),
            transform: [{translateY: interpolate(listAnimatedValue.value, [0, 1], [40, 0])}]
        }
    })

    const handleReLogin = () => {
        setModalVisible(false);
        dispatch(agendaResetAll());
        dispatch(resetSchedule());
        dispatch(clearInfo());
        dispatch(clearScore());

        if(user) {
            realm.write(() => {
                realm.delete(user);
            })
        }
        setTimeout(() => dispatch(logoutSuccessful()), 800);
    }

    const toLogin = () => {
        dispatch(logoutSuccessful());
    }

    const handleCheck = async () => {
        const source = axios.CancelToken.source();
        setAxiosSource(source);
        const response = await Resources.getUpdateInfo(source.token);

        if(response.code !== 200) {
            ToastAndroid.showWithGravity('更新信息获取失败！', 1500, ToastAndroid.BOTTOM);
        } else {
            const status = checkUpdate(version, response.data.last_version);

            if(status === 0) {
                ToastAndroid.showWithGravity('当前版本已经是最新版本！', 1500, ToastAndroid.BOTTOM);
            } else if(status === -1) {
                setUpdateModalVisible(true);
                setUpdateInfo(response.data);
            }
        }
    }

    const handleConfirmUpdate = () => {
        ToastAndroid.showWithGravity('正在下载更新...', 2000, ToastAndroid.BOTTOM);
        downloadAndInstallApk(updateInfo?.update_url!);
        setUpdateModalVisible(false);
    }

    const handleCancelUpdate = () => {
        setUpdateModalVisible(false);
    }

    const handleShowAvatarModal = () => {
        setAvatarModalVisible(true);
    }

    const handleDismissAvatarModal = () => {
        setAvatarModalVisible(false);
    }

    useEffect(() => {
        setVersion(getVersion());
    }, []);

    useFocusEffect(useCallback(() => {
        cardAnimatedValue.value = withTiming(1, {duration: 300});
        listAnimatedValue.value = withDelay(100, withTiming(1, {duration: 300}));

        // 如果写在useFocusEffect内，会导致导航到该页面会有闪烁
        return () => {
            cardAnimatedValue.value = 0;
            listAnimatedValue.value = 0;

            if(axiosSource !== undefined) {
                axiosSource.cancel('getUpdateInfo is cancelled');
            }
        }
    }, []))

    return (
        <View style={{flex: 1}}>
            <View style={ss.mainContainer}>
                {/* 个人信息 */}
                <View style={ss.innerInfoContainer}>
                    <Pressable
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            overflow: 'hidden',
                            borderWidth: 2,
                            borderColor: 'white',
                            backgroundColor: 'rgba(200, 200, 200, .1)'
                    }}
                        onPress={isLogin ? handleShowAvatarModal : handleReLogin}
                    >
                        <Image source={require('../../assets/png/avatar.png')} style={{height: '100%', width: '100%'}}/>
                    </Pressable>
                    <View style={{marginTop: 25}}>
                        <ScalingNotAllowedText
                            style={{
                                color: FontColor.light,
                                fontSize: FontSize.ll,
                                fontWeight: '700',
                                letterSpacing: 2,
                            }}
                        >{isLogin ? name : '点击登录'}</ScalingNotAllowedText>
                    </View>
                    <ScalingNotAllowedText
                        style={{
                            fontSize: FontSize.m,
                            color: FontColor.light,
                            fontWeight: '600',
                            letterSpacing: 1,
                            width: '100%',
                            textAlign: 'center',
                            lineHeight: 17,
                            marginVertical: 9
                        }}
                    >ID: {studentID}</ScalingNotAllowedText>
                </View>

                <View style={{width: '90%', marginTop: 15}}>
                    <ScalingNotAllowedText
                        style={{
                            fontSize: FontSize.m,
                            color: FontColor.dark,
                            marginVertical: 15,
                            alignSelf: 'flex-start',
                            fontWeight: '700',
                        }}
                    >小Tips</ScalingNotAllowedText>
                </View>

                {/* 更多信息 */}
                <Animated.View style={[ss.infoContainer, {paddingTop: 5, paddingBottom: 40, paddingHorizontal: 0}, listAnimatedStyle]}>
                    {/*<NavigationBox title={'新功能'} handleNavigation={() => null}/>*/}
                    {/*<NavigationBox title={'新手指南'} handleNavigation={() => null}/>*/}
                    {/*<NavigationBox title={'关于拱拱'} handleNavigation={() => null}/>*/}
                    <NavigationBox title='联系我们' handleNavigation={() => navigation.navigate('FeedbackPage')}/>
                    <NavigationBox title='用户协议' handleNavigation={() => navigation.navigate('UserAgreementPage')}/>
                    <NavigationBox title='隐私条款' handleNavigation={() => navigation.navigate('PrivacyPolicyPage')}/>
                    {/*<NavigationBox title='社区规范' handleNavigation={() => navigation.navigate('SpecificationPage')}/>*/}
                    <Pressable
                        onPress={handleCheck}
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
                        <ScalingNotAllowedText
                            style={{
                                fontSize: FontSize.s,
                                color: FontColor.dark,
                            }}
                        >当前版本</ScalingNotAllowedText>
                        <ScalingNotAllowedText
                            style={{
                                fontSize: FontSize.s,
                                color: FontColor.dark,
                            }}
                        >{version}</ScalingNotAllowedText>
                    </Pressable>
                </Animated.View>
                {/* 登录/退出登录 按钮 */}
                <Pressable
                    style={{
                        height: 43,
                        width: '90%',
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: BackgroundColor.primary,
                        marginVertical: 15,
                        bottom: 0,
                        position: 'absolute',
                        transform: [{translateY: 35}]
                    }}
                    onPress={isLogin ? () => setModalVisible(true) : toLogin}
                >
                    <ScalingNotAllowedText
                        style={{
                            color: FontColor.light,
                            letterSpacing: 1,
                            fontWeight: '600'
                        }}
                    >{isLogin ? '退出登录' : '登录'}</ScalingNotAllowedText>
                </Pressable>
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType={'fade'}
            >
                <View style={ss.modalBackgroundBox}>
                    <View
                        style={[
                            {
                            width: '70%',
                            backgroundColor: BackgroundColor.mainLight,
                            }
                            , ss.modalWrapper
                        ]}
                    >
                        <ScalingNotAllowedText style={{
                            fontSize: FontSize.ll,
                            color: FontColor.dark,
                            fontWeight: '800',
                            marginBottom: 25,
                            marginTop: 10
                        }}>提示</ScalingNotAllowedText>
                        <ScalingNotAllowedText style={{fontWeight: '600', color: FontColor.dark}}>确定要退出登录？</ScalingNotAllowedText>
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
            <UpdateModal
                visible={updateModalVisible}
                data={updateInfo}
                handleCancel={handleCancelUpdate}
                handleConfirm={handleConfirmUpdate}
            />
            <AvtarModal
                visible={avatarModalVisible}
                dismiss={handleDismissAvatarModal}
            />
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

const UpdateModal = ({visible, data, handleCancel, handleConfirm}:
                         {
                             visible: boolean,
                             data: UpdateInfo | undefined,
                             handleCancel: () => void,
                             handleConfirm: () => void
                         }) => {

    console.log(data);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType={'fade'}
        >
            <View style={ss.modalBackgroundBox}>
                <View
                    style={[
                        ss.modalWrapper,
                        {
                            width: '80%',
                            backgroundColor: BackgroundColor.mainLight,
                            paddingTop: 20
                        }
                    ]}
                >
                    <View style={{width: '90%'}}>
                        <ScalingNotAllowedText style={{fontSize: FontSize.xxl, fontWeight: '800'}}>{data?.update_title}</ScalingNotAllowedText>
                        <View style={{flexDirection: 'row'}}>
                            <ScalingNotAllowedText style={{fontSize: FontSize.s, color: FontColor.grey, marginRight: 10}}>{data?.update_date}</ScalingNotAllowedText>
                            <ScalingNotAllowedText style={{fontSize: FontSize.s, color: FontColor.grey}}>{data?.last_version}</ScalingNotAllowedText>
                        </View>
                    </View>

                    <View style={{width: '90%', marginTop: 15}}>
                        <ScalingNotAllowedText style={{fontSize: FontSize.ll, fontWeight: '800', color: FontColor.primary}}>Notice</ScalingNotAllowedText>
                        <ScalingNotAllowedText>{data?.update_notice}</ScalingNotAllowedText>
                    </View>

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: 10,
                        borderTopWidth: 1,
                        borderTopColor: BackgroundColor.grey
                    }}>
                        <Pressable style={{
                            width: '50%',
                            alignItems: 'center',
                            borderRightWidth: 1,
                            borderRightColor: BackgroundColor.grey,
                            paddingVertical: 15
                        }} onPress={handleCancel}>
                            <ScalingNotAllowedText
                                style={{
                                    color: FontColor.grey,
                                    fontSize: FontSize.l
                                }}>暂不更新</ScalingNotAllowedText>
                        </Pressable>
                        <Pressable style={{width: '50%', alignItems: 'center', paddingVertical: 15}}
                                   onPress={handleConfirm}>
                            <ScalingNotAllowedText
                                style={{
                                    color: FontColor.primary,
                                    fontSize: FontSize.l
                                }}>更新</ScalingNotAllowedText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const AvtarModal = ({visible, dismiss}: {visible: boolean, dismiss: () => void}) => {
    const [modalHeight, setModalHeight] = useState(0);
    const backgroundValue = useSharedValue(0);

    const backgroundStyle = useAnimatedStyle(() => {
        return {
            backgroundColor: interpolateColor(backgroundValue.value, [0, 1], ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, .4)']),
        }
    })

    const translateStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateY: interpolate(backgroundValue.value, [0, 1], [modalHeight, 0])}]
        }
    })

    const handleChooseGallery = () => {
        backgroundValue.value = withTiming(0, {duration: 400}, (finished) => {
            if(finished) {
                runOnJS(dismiss)()
            }
        });
        navigateToPicSelectScreen();
    }

    const handleDismiss = () => {
        backgroundValue.value = withTiming(0, {duration: 400}, (finished) => {
            if(finished) {
                runOnJS(dismiss)()
            }
        });
    }

    useEffect(() => {
        if(visible && modalHeight !== undefined) {
            backgroundValue.value = withTiming(1, {duration: 200});
        }
    }, [visible, modalHeight]);

    return (
        <Modal
            visible={visible}
            transparent={true}
        >
            <Animated.View style={[{flex: 1}, backgroundStyle]}>
                <Pressable
                    onPress={handleDismiss}
                    style={ss.modalTransparentBackgroundWrapper}
                >
                    <Animated.View
                        style={[
                            translateStyle,
                            {
                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                borderTopRightRadius: 15,
                                borderTopLeftRadius: 15,
                                width: '100%',
                                backgroundColor: BackgroundColor.mainLight,
                            }
                        ]}
                        onLayout={({nativeEvent}) => {
                            setModalHeight(nativeEvent.layout.height);
                        }}
                    >
                        <Pressable
                            onPress={(event) => event.stopPropagation()}
                            style={{
                                width: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <View style={{width: '100%', height: 30, display: 'flex', alignItems: 'flex-end'}}>
                                <Pressable onPress={handleDismiss} hitSlop={{top: 4, bottom: 4, left: 8, right: 8}}>
                                    <SvgXml xml={XMLResources.closeAddBoard} width="20" height="20"/>
                                </Pressable>
                            </View>

                            <Pressable
                                onPress={handleChooseGallery}
                                style={ss.avatarModalButton}
                            >
                                <ScalingNotAllowedText style={ss.avatarModalButtonText}>从相册中选择</ScalingNotAllowedText>
                            </Pressable>

                            <Pressable
                                onPress={() => {}} // TODO 相机
                                style={ss.avatarModalButton}
                            >
                                <ScalingNotAllowedText style={ss.avatarModalButtonText}>拍照上传照片</ScalingNotAllowedText>
                            </Pressable>
                        </Pressable>
                    </Animated.View>
                </Pressable>
            </Animated.View>
        </Modal>
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
    },

    infoContainer: {
        width: '90%',
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
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: BackgroundColor.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        paddingTop: StatusBar.currentHeight! * 3,
        paddingBottom: 20,
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

    modalBackgroundBox: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, .2)'
    },

    modalTransparentBackgroundWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    avatarModalContainer: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },

    modalWrapper: {
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },

    avatarModalButton: {
        width: '90%',
        height: 40,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        backgroundColor: BackgroundColor.primary
    },

    avatarModalButtonText: {
        fontSize: FontSize.l,
        color: FontColor.light,
        fontWeight: '700',
        letterSpacing: 1,
    }
})

export default InfoPage;
