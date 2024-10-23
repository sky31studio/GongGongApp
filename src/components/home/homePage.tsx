import React, {createContext, useContext, useEffect, useState} from "react";
import {Animated, Pressable, StyleSheet, Text, View} from "react-native";
import {SvgXml} from "react-native-svg";
import LinearGradient from "react-native-linear-gradient";
import {useAppDispatch} from "../../app/hooks.ts";
import {BackgroundColor, FontColor} from "../../config/globalStyleSheetConfig.ts";
import {addOnValueChangedListener, getToken} from "../../storage.ts";
import {AgendaList} from "./agenda/agendaList.tsx";
import ClassList from "./course/classList.tsx";
import {fetchTable} from "../../app/slice/scheduleSlice.ts";

export interface NavigationProps {
    navigation: {
        navigate: (name: string, params?: object) => void;
        goBack: () => void;
    };
}

const HomePage = ({ navigation }: NavigationProps) => {
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchTable());
    }, []);

    const functionBar = () => <FunctionBar navigation={navigation} />;
    const marinBoard = () => <MainBoard />;

    return (
      <View style={styleSheet.homeContainer}>
          <View style={{width: '100%', height: '18%'}}>
              {functionBar()}
          </View>
        <View style={styleSheet.mainBoardWrapper}>
            {marinBoard()}
        </View>
      </View>
    );
}

const emptyClassroomXML = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_223_8348)">
<path d="M13 11C13 8.23858 15.2386 6 18 6H26C28.7614 6 31 8.23858 31 11V37H13V11Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M31 37V22H32C34.7614 22 37 24.2386 37 27V34C37 35.6569 35.6569 37 34 37H31Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M13 37V17C10.2386 17 8 19.2386 8 22V34C8 35.6569 9.34315 37 11 37H13Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.2778 15.7778L23.8889 15.7778" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M17.2778 22.8889L23.8889 22.8889" stroke="white" stroke-width="2" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_223_8348">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>

`;
const gradeXML = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_223_8355)">
<path d="M12 10C12 8.34315 13.3431 7 15 7H29C30.6569 7 32 8.34315 32 10V18C32 23.5228 27.5228 28 22 28C16.4772 28 12 23.5228 12 18V10Z" stroke="white" stroke-width="2"/>
<path d="M22 27V33" stroke="white" stroke-width="2"/>
<path d="M11.2857 13H7C7.35714 16 8.85714 22 12 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M32.7143 13H37C36.6429 16 35.1429 22 32 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<mask id="path-5-inside-1_223_8355" fill="white">
<path d="M12 35C12 33.3431 13.3431 32 15 32H29C30.6569 32 32 33.3431 32 35V37C32 37.5523 31.5523 38 31 38H13C12.4477 38 12 37.5523 12 37V35Z"/>
</mask>
<path d="M12 35C12 33.3431 13.3431 32 15 32H29C30.6569 32 32 33.3431 32 35V37C32 37.5523 31.5523 38 31 38H13C12.4477 38 12 37.5523 12 37V35Z" stroke="white" stroke-width="4" mask="url(#path-5-inside-1_223_8355)"/>
</g>
<defs>
<clipPath id="clip0_223_8355">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>

`;
const classXML = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_223_8362)">
<rect x="7" y="8.77783" width="30" height="28.2222" rx="5" stroke="white" stroke-width="2"/>
<path d="M7.77783 17.5555H36.2223" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M14.8889 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M29.1111 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M18.4445 25.6445L21.9461 29.1112L27.3333 23.7778" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_223_8362">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>

`;
const emptyClassXML = `
<svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_236_108)">
<rect x="7" y="8.77783" width="30" height="28.2222" rx="5" stroke="white" stroke-width="2"/>
<path d="M7.7778 17.5555H36.2222" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M14.8889 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M29.1111 6V8.66667" stroke="white" stroke-width="2" stroke-linecap="round"/>
<path d="M18.4445 25.6445L21.9461 29.1112L27.3333 23.7778" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_236_108">
<rect width="44" height="44" fill="white"/>
</clipPath>
</defs>
</svg>

`;

const FunctionBar: React.ComponentType<NavigationProps> = ({ navigation }) => {
    const toTablePage = () => {
        navigation.navigate("TablePage");
    }

    return (
      <View style={styleSheet.functionBarContainer}>
        <View style={styleSheet.functionBox}>
            <SvgXml xml={emptyClassroomXML} width="100%" />
            <Text style={styleSheet.functionText}>空教室</Text>
        </View>
          <View style={styleSheet.functionBox}>
              <SvgXml xml={gradeXML} width="100%" />
              <Text style={styleSheet.functionText}>查成绩</Text>
          </View>
          <Pressable onPress={toTablePage}>
              <View style={styleSheet.functionBox}>
                  <SvgXml xml={classXML} width="100%" />
                  <Text style={styleSheet.functionText}>课程表</Text>
              </View>
          </Pressable>
          <View style={styleSheet.functionBox}>
              <SvgXml xml={emptyClassXML} width="100%" />
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
    shiftChoice: (value: number) => {}
});

const MainBoard = () => {
    const classTableButton = <ShiftButton id={0} text='课程表' initFocus={true} />;
    const countdownButton = <ShiftButton id={1} text='倒计时' />;

    const [hasToken, setHasToken] = useState(getToken() !== '');

    const [choice, setChoice] = useState(0);
    const handleChoice = (value: number) => {
        setChoice(value);
    }

    useEffect(() => {
        const listener = addOnValueChangedListener((changedKey) => {
            if(changedKey === 'token') {
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
                </View>
            </HomeContext.Provider>
            <View style={styleSheet.mainWrapper}>
                {choice === 0 ? <ClassList hasToken={hasToken} /> : <AgendaList hasToken={hasToken} />}
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
    const [focused, setFocused] = useState(initFocus);
    const [focusAnimate] = useState(new Animated.Value(focused ? 1 : 0));

    const opacity = focusAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1]
    });

    const translateY = focusAnimate.interpolate({
        inputRange: [0, 1],
        outputRange: [10, 0],
    })

    const handleClick = () => {
        Animated.timing(focusAnimate, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
        shiftChoice(id);
        setFocused(true);
    }

    useEffect(() => {
        if(choice !== id) {
            Animated.timing(focusAnimate, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
            setFocused(false);
        }
    }, [choice])

    return (
        <Pressable onPress={handleClick} >
            <View style={styleSheet.shiftBox}>
                <Text numberOfLines={1} style={[styleSheet.shiftBoxText, {color: focused ? '#000' : '#999999'}]}>{text}</Text>
                <Animated.View style={[styleSheet.initBox, {opacity: opacity, transform: [{translateY: translateY}]}]}>
                    <LinearGradient
                        colors={[BackgroundColor.primary, '#FF9999']}
                        style={{flex: 1, borderRadius: 3}}
                    ></LinearGradient>
                </Animated.View>
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
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 8,
    },

    shiftButton: {
        width: '40%',
        height: '100%',
        paddingHorizontal: 15,
        alignItems: 'center',
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
