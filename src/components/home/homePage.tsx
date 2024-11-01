import React, {createContext, useContext, useEffect, useMemo, useState} from "react";
import {BackHandler, Pressable, StyleSheet, Text, ToastAndroid, useWindowDimensions, View} from "react-native";
import {SvgXml} from "react-native-svg";
import {useAppDispatch} from "../../app/hooks.ts";
import {BackgroundColor, FontColor} from "../../config/globalStyleSheetConfig.ts";
import {addOnValueChangedListener, getToken} from "../../storage.ts";
import {AgendaList} from "./agenda/agendaList.tsx";
import ClassList from "./course/classList.tsx";
import {fetchTable} from "../../app/slice/scheduleSlice.ts";
import {fetchExamData} from "../../app/slice/agendaSlice.ts";
import XMLResources from "../../basic/XMLResources.ts";
import Animated, {
    Easing,
    interpolateColor,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import LinearGradient from "react-native-linear-gradient";
import {getFirstDate} from "../../app/slice/globalSlice.ts";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import EmptyClassroomPage from "../emptyClassroom/EmptyClassroomPage.tsx";
import {TablePage} from "../timeTable/tablePage.tsx";
import ScorePage from "../score/ScorePage.tsx";
import {getScoreOverview} from "../../app/slice/scoreSlice.ts";

export interface NavigationProps {
    navigation: {
        navigate: (name: string, params?: object) => void;
        goBack: () => void;
    };
}

const HomePage = () => {
    const Stack = createNativeStackNavigator();
    const dispatch = useAppDispatch();
    const [lastPressed, setLastPressed] = useState<number | null>(null)

    // 登录成功，一次性请求全部数据
    useEffect(() => {
        dispatch(fetchTable());
        dispatch(fetchExamData());
        dispatch(getFirstDate());
        dispatch(getScoreOverview());

        let backPressListener = BackHandler.addEventListener('hardwareBackPress', () => {
            const now = Date.now();
            if (lastPressed && now - lastPressed < 2000) {
                BackHandler.exitApp();
            } else {
                ToastAndroid.showWithGravity('再返回一次退出应用', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
                setLastPressed(now);
            }

            return false;
        })

        return () => {
            backPressListener.remove();
        }

    }, []);

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="EmptyClassroomPage" component={EmptyClassroomPage}/>
            <Stack.Screen name="TablePage" component={TablePage}/>
            <Stack.Screen name="ScorePage" component={ScorePage}/>
        </Stack.Navigator>
    );
}

const Home = ({navigation}: NavigationProps) => {
    const functionBar = () => <FunctionBar navigation={navigation}/>;
    const marinBoard = () => <MainBoard/>;

    return (
        <View style={styleSheet.homeContainer}>
            <View style={{width: '100%', height: '18%'}}>
                {functionBar()}
            </View>
            <View style={styleSheet.mainBoardWrapper}>
                {marinBoard()}
            </View>
        </View>
    )
}

const FunctionBar: React.ComponentType<NavigationProps> = ({navigation}) => {
    const toEmptyClassroomPage = () => {
        navigation.navigate("EmptyClassroomPage");
    }

    const toTablePage = () => {
        navigation.navigate("TablePage");
    }

    const toScorePage = () => {
        navigation.navigate("ScorePage");
    }

    return (
        <View style={styleSheet.functionBarContainer}>
            <Pressable onPress={toEmptyClassroomPage}>
                <View style={styleSheet.functionBox}>
                    <SvgXml xml={XMLResources.emptyClassroomIcon} width="100%"/>
                    <Text style={styleSheet.functionText}>空教室</Text>
                </View>
            </Pressable>
            <Pressable onPress={toScorePage}>
                <View style={styleSheet.functionBox}>
                    <SvgXml xml={XMLResources.scoreIcon} width="100%"/>
                    <Text style={styleSheet.functionText}>查成绩</Text>
                </View>
            </Pressable>
            <Pressable onPress={toTablePage}>
                <View style={styleSheet.functionBox}>
                    <SvgXml xml={XMLResources.courseIcon} width="100%"/>
                    <Text style={styleSheet.functionText}>课程表</Text>
                </View>
            </Pressable>
            <View style={styleSheet.functionBox}>
                <SvgXml xml={XMLResources.emptyScoreIcon} width="100%"/>
                <Text style={styleSheet.functionText}>多人空课</Text>
            </View>
        </View>
    );
}

interface HomeContextType {
    choice: number;
    shiftChoice: (value: number) => void;
}

const HomeContext = createContext<HomeContextType>({
    choice: 0,
    shiftChoice: () => {
    }
});

const MainBoard = () => {
    const classTableButton = <ShiftButton id={0} text='课程表' initFocus={true}/>;
    const countdownButton = <ShiftButton id={1} text='倒计时'/>;

    const [hasToken, setHasToken] = useState(getToken() !== '');
    const [choice, setChoice] = useState<number>(0);
    const winWidth = useWindowDimensions().width;

    const classList = useMemo(() => <ClassList hasToken={hasToken}/>, [hasToken]);
    const agendaList = useMemo(() => <AgendaList hasToken={hasToken}/>, [hasToken]);

    const translateX = useSharedValue(-winWidth * 0.12);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{translateX: translateX.value}]
        }
    })

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

    const handleChoice = (value: number) => {
        setChoice(value);
    }

    useEffect(() => {
        const listener = addOnValueChangedListener((changedKey) => {
            if (changedKey === 'token') {
                const newValue = getToken();
                setHasToken(newValue !== '');
            }
        });

        return () => {
            listener.remove();
        }
    }, []);

    return (
        <View style={styleSheet.mainBoardContainer}>
            <HomeContext.Provider value={{choice, shiftChoice: handleChoice}}>
                <View style={styleSheet.shiftButtonContainer}>
                    <View style={styleSheet.shiftButton}>
                        {classTableButton}
                    </View>
                    <View style={{height: '100%', width: 2, borderRadius: 1, backgroundColor: '#D9D9D9'}}></View>
                    <View style={styleSheet.shiftButton}>
                        {countdownButton}
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
            <View style={styleSheet.mainWrapper}>
                {choice === 0 ? classList : agendaList}
            </View>
        </View>
    );
}

interface ButtonProps {
    text: string;
    initFocus?: boolean;
    id: number;
}

const ShiftButton: React.ComponentType<ButtonProps> = ({id, text = '', initFocus = false}): React.JSX.Element => {
    const {choice, shiftChoice}: HomeContextType = useContext(HomeContext);

    const colorValue = useSharedValue(initFocus ? 1 : 0);
    const animatedStyle = useAnimatedStyle(() => {
        return {
            color: interpolateColor(colorValue.value, [0, 1], [FontColor.grey, FontColor.dark])
        }
    })

    const handleClick = () => {
        shiftChoice(id);
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

    return (
        <Pressable onPress={handleClick}>
            <View style={styleSheet.shiftBox}>
                <Animated.Text numberOfLines={1}
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
        width: '100%',
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
        width: '100%',
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
        zIndex: 10,
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

export default HomePage;
