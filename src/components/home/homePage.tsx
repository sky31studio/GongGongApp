import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  useWindowDimensions,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {
  BackgroundColor,
  FontColor,
} from '../../config/globalStyleSheetConfig.ts';
import {AgendaList} from './agenda/agendaList.tsx';
import ClassList from './course/classList.tsx';
import XMLResources from '../../basic/XMLResources.ts';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import ScalingNotAllowedText from '../global/ScalingNotAllowedText.tsx';
import {useQuery, useRealm} from '@realm/react';
import GongUser from '../../dao/object/User.ts';
import {useAppDispatch, useAppSelector} from '../../app/hooks.ts';
import {
  examChangedCountIncrement,
  selectShowAddBoard,
  updateExamAgendaList,
} from '../../app/slice/agendaSlice.ts';
import AddBoard from './agenda/addBoard.tsx';
import Resources, {ResourceMessage} from '../../basic/Resources.ts';
import {ResourceCode} from '../../utils/enum.ts';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {logoutSuccessful, setCalendar} from '../../app/slice/globalSlice.ts';

export interface NavigationProps {
    navigation: {
        navigate: (name: string, params?: object) => void;
        goBack: () => void;
    };
}

const Home = ({navigation}: NavigationProps) => {
    const dispatch = useAppDispatch();
    const modalVisible = useAppSelector(selectShowAddBoard);

    const realm = useRealm();
    const user = useQuery<GongUser>('GongUser')[0];
    const [refreshing, setRefreshing] = useState<boolean>(false);

    const isFocused = useIsFocused();

    const onRefresh = () => {
        setRefreshing(true);

        if(!user) {
            ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
            setRefreshing(false);
            return;
        }

        const getData = async () => {
            let msg: ResourceMessage = await Resources.getExam(user.token);
            if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                dispatch(examChangedCountIncrement());
                dispatch(updateExamAgendaList(msg.data));
                realm.write(() => {
                    user.scoreList = JSON.stringify(msg.data);
                })
            } else if(msg.code === ResourceCode.InvalidToken) {
                ToastAndroid.showWithGravity('身份失效，请重新登录！', 1500, ToastAndroid.BOTTOM);
                return;
            } else {
                ToastAndroid.showWithGravity('考试信息获取失败！', 1500, ToastAndroid.BOTTOM);
            }

            msg = await Resources.getCalendar(user.token);
            if(msg.code === ResourceCode.Successful || ResourceCode.DataExpired) {
                dispatch(setCalendar(msg.data));
                realm.write(() => {
                    user.firstDate = new Date(msg.data.start);
                    user.termID = msg.data.termID;
                    user.totalWeeks = msg.data.weeks;
                })
            } else if(msg.code === ResourceCode.InvalidToken) {
                ToastAndroid.showWithGravity('身份失效，请重新登录！', 1500, ToastAndroid.BOTTOM);
                return;
            } else {
                ToastAndroid.showWithGravity('日期信息获取失败！', 1500, ToastAndroid.BOTTOM);
            }
        }

        getData().then(() => setRefreshing(false));
    }

    return (
        <ScrollView
            contentContainerStyle={{flex: 1}}
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[BackgroundColor.primary]}/>
            }
        >
            <View style={styleSheet.homeContainer}>
                <View style={{width: '100%', height: '18%'}}>
                    <FunctionBar navigation={navigation} isFocused={isFocused}/>
                </View>
                <View style={styleSheet.mainBoardWrapper}>
                    <MainBoard/>
                </View>
                {/*AddBoard模态*/}
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType={'fade'}
                >
                    <View style={{flex: 1, alignItems: 'center', backgroundColor: BackgroundColor.modalShadow}}>
                        <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
                            <AddBoard/>
                        </View>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    )
}

const FunctionBar = ({navigation, isFocused}: {navigation: any, isFocused: boolean}) => {
    const user = useQuery<GongUser>('GongUser')[0];

    const dispatch = useAppDispatch();

    const [disabled, setDisabled] = useState<boolean>(false);

    const toEmptyClassroomPage = useCallback(() => {
        if(!user) {
            dispatch(logoutSuccessful());
            ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
        }

        if(!disabled) {
            setDisabled(true);
            navigation.navigate("EmptyClassroomPage");
        }
    }, [disabled]);

    const toTablePage = useCallback(() => {
        if(!user) {
            dispatch(logoutSuccessful());
            ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
            return;
        }

        if(!disabled) {
            setDisabled(true);
            navigation.navigate("TablePage");
        }
    }, [disabled]);

    const toScorePage = useCallback(() => {
        if(!user) {
            dispatch(logoutSuccessful());
            ToastAndroid.showWithGravity('暂未登录！', 1500, ToastAndroid.BOTTOM);
            return;
        }

        if(!disabled) {
            setDisabled(true);
            navigation.navigate("ScorePage");
            return;
        }
    }, [disabled]);

    useEffect(() => {
        console.log(isFocused);
        if(isFocused) {
            setDisabled(false);
        }
    }, [isFocused]);

    return (
        <View style={styleSheet.functionBarContainer}>
            <Pressable onPress={toEmptyClassroomPage} disabled={disabled}>
                <View style={styleSheet.functionBox}>
                    <SvgXml xml={XMLResources.emptyClassroomIcon} width="100%"/>
                    <ScalingNotAllowedText style={styleSheet.functionText}>空教室</ScalingNotAllowedText>
                </View>
            </Pressable>
            <Pressable onPress={toScorePage} disabled={disabled}>
                <View style={styleSheet.functionBox}>
                    <SvgXml xml={XMLResources.scoreIcon} width="100%"/>
                    <ScalingNotAllowedText style={styleSheet.functionText}>查成绩</ScalingNotAllowedText>
                </View>
            </Pressable>
            <Pressable onPress={toTablePage} disabled={disabled}>
                <View style={styleSheet.functionBox}>
                    <SvgXml xml={XMLResources.courseIcon} width="100%"/>
                    <ScalingNotAllowedText style={styleSheet.functionText}>课程表</ScalingNotAllowedText>
                </View>
            </Pressable>
            {/*<View style={styleSheet.functionBox}>*/}
            {/*    <SvgXml xml={XMLResources.emptyScoreIcon} width="100%"/>*/}
            {/*    <ScalingNotAllowedText style={styleSheet.functionText}>多人空课</ScalingNotAllowedText>*/}
            {/*</View>*/}
        </View>
    );
}

const HomeContext = createContext<{choice: number, setChoice: React.Dispatch<React.SetStateAction<number>>}>({choice: 0, setChoice: () => {}});

const MainBoard = () => {
    const user = useQuery<GongUser>('GongUser');

    const winWidth = useWindowDimensions().width;

    const [hasToken, _] = useState(user !== undefined);
    const [choice, setChoice] = useState<number>(0);

    const listAnimatedValue = useSharedValue(0);
    const listAnimatedStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(listAnimatedValue.value, [0, 1], [0, 1]),
            transform: [{translateY: interpolate(listAnimatedValue.value, [0, 1], [30, 0])}]
        }
    })

    const translateX = useSharedValue(-winWidth * 0.12);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}]
        }
    })

    useFocusEffect(useCallback(() => {
        listAnimatedValue.value = withTiming(1, {duration: 300, easing: Easing.sin});

        return () => {
            listAnimatedValue.value = 0
        }
    }, []))

    useEffect(() => {
        if (choice === 0) {
            translateX.value = withTiming(-winWidth * 0.12, {
                duration: 200,
                easing: Easing.ease
            })
        } else if (choice === 1) {
            translateX.value = withTiming(winWidth * 0.12, {
                duration: 200,
                easing: Easing.ease
            })
        }
    }, [choice]);

    return (
        <View style={styleSheet.mainBoardContainer}>
            <HomeContext.Provider value={{choice, setChoice}}>
                <View style={styleSheet.shiftButtonContainer}>
                    <View style={styleSheet.shiftButton}>
                        <ShiftButton id={0} text='课程表' initFocus={true}/>
                    </View>
                    <View style={{height: '100%', width: 2, borderRadius: 1, backgroundColor: '#D9D9D9'}}></View>
                    <View style={styleSheet.shiftButton}>
                        <ShiftButton id={1} text='倒计时'/>
                    </View>
                    <Animated.View style={[animatedStyle, {position: 'absolute', bottom: 8}]}>
                        <LinearGradient
                            colors={[BackgroundColor.primary, BackgroundColor.primaryGradient]} // 定义渐变颜色
                            start={{x: 0, y: 0}} // 渐变开始的位置
                            end={{x: 1, y: 0}} // 渐变结束的位置
                            style={{width: 55, height: 8, borderRadius: 5}} // 渐变容器的样式
                        >

                        </LinearGradient>
                    </Animated.View>
                </View>
            </HomeContext.Provider>
            <Animated.View style={[styleSheet.mainWrapper, listAnimatedStyle]}>
                <View style={{ display: choice === 0 ? 'flex' : 'none' }}>
                    <ClassList hasToken={hasToken}/>
                </View>
                <View style={{ display: choice === 1 ? 'flex' : 'none' }}>
                    <AgendaList hasToken={hasToken}/>
                </View>
            </Animated.View>
        </View>
    );
}

interface ButtonProps {
    text: string;
    initFocus?: boolean;
    id: number;
}

const ShiftButton: React.ComponentType<ButtonProps> = ({id, text = '', initFocus = false}): React.JSX.Element => {
    const {choice, setChoice} = useContext(HomeContext);

    const colorValue = useSharedValue(initFocus ? 1 : 0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(colorValue.value, [0, 1], [FontColor.grey, FontColor.dark])
        }
    })

    const handleClick = () => {
        setChoice(id);
    }

    useEffect(() => {
        if (choice === id && colorValue.value !== 1) {
            colorValue.value = withTiming(1, {
                duration: 200,
                easing: Easing.ease,
            })
        } else {
            colorValue.value = withTiming(0, {
                duration: 200,
                easing: Easing.ease,
            })
        }
    }, [choice])

    useEffect(() => {
        colorValue.value = initFocus ? 1 : 0;
    }, []);

    return (
        <Pressable onPress={handleClick}>
            <View style={styleSheet.shiftBox}>
                <Animated.Text
                    numberOfLines={1}
                    allowFontScaling={false}
                    style={[styleSheet.shiftBoxText, animatedStyle]}
                >
                    {text}
                </Animated.Text>
            </View>
        </Pressable>
    );
}

const styleSheet = StyleSheet.create({
    homeContainer: {
        flex: 1,
    },

    functionBarContainer: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        backgroundColor: BackgroundColor.primary,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },

    functionBox: {
        width: 55,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 15,
    },

    functionText: {
        color: FontColor.light,
        fontSize: 13,
        fontWeight: '600',
        height: 25,
        lineHeight: 25,
        width: '100%',
        textAlign: 'center',
    },

    mainBoardWrapper: {
        paddingTop: 50,
        flex: 1,
    },

    mainBoardContainer: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },

    shiftButtonContainer: {
        width: '60%',
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },

    shiftButton: {
        width: '40%',
        height: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
        zIndex: 100
    },

    shiftBox: {
        position: 'relative',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },

    shiftBoxText: {
        padding: 0,
        width: 50,
        fontSize: 15,
        textAlign: 'center',
    },
    initBox: {
        width: 50,
        height: 5,
        position: 'absolute',
        bottom: 3,
    },
    mainWrapper: {
        width: '100%',
        paddingVertical: 40,
        paddingHorizontal: 10,
    },
    mainContainer: {
        backgroundColor: BackgroundColor.mainLight,
        borderRadius: 20,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default Home;
