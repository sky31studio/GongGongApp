import React, {useState} from "react";
import {
    Animated as Ani,
    Keyboard,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View
} from "react-native";
import Animated, {
    Easing,
    ReduceMotion,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSequence,
    withTiming
} from "react-native-reanimated";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor, FontSize} from "../../config/globalStyleSheetConfig.ts";
import Resources from "../../basic/Resources.ts";
import XMLResources from "../../basic/XMLResources.ts";
import {useAppDispatch} from "../../app/hooks.ts";
import {loginSuccessful} from "../../app/slice/globalSlice.ts";
import {NavigationProps} from "../home/homePage.tsx";
import {useRealm} from "@realm/react";

/**
 * 登录主界面
 */
const LoginPage = ({navigation}: NavigationProps): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const realm = useRealm();
    let handleUsername, handlePassword, handleLogin;
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alertText, setAlertText] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const top = useSharedValue(-10);
    const animatedAlert = useAnimatedStyle(() => ({
        top: top.value
    }));

    // alert下弹上拉动画
    const alertAnimation = () => {
        top.value = withSequence(
            withTiming(30, {
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                reduceMotion: ReduceMotion.System,
            }),
            withDelay(3000, withTiming(-10, {
                duration: 1000,
                easing: Easing.inOut(Easing.quad),
                reduceMotion: ReduceMotion.System,
            }, () => runOnJS(setShowAlert)(false))), // runOnJS一定要的
        )
    }

    handleUsername = (data: string) => {
        setUsername(data);
    }
    handlePassword = (data: string) => {
        setPassword(data);
    }
    handleLogin = async () => {
        if (password === '') {
            setAlertText('请输入密码');
            setShowAlert(true);
            alertAnimation();
        } else {
            const res = await Resources.login(username, password);
            if (res.code === 0) {
                setAlertText(res.message);
                setShowAlert(true);
                alertAnimation();
                return;
            }
            console.log('creating newUser');
            realm.write(() => {
                realm.create('GongUser', {
                    token: res.token,
                })
            })
            console.log('newUser is created!');

            dispatch(loginSuccessful());
        }
    }

    const idInput = <MyInput initText="请输入你的学号" onSendDataToParent={handleUsername}/>
    const pwdInput = <MyInput initText="请输入教务系统密码" onSendDataToParent={handlePassword} visibleProp={true}/>

    // 屏幕上方alert块
    const alertModule = (
        <Animated.View style={[styleSheet.alertContainer, animatedAlert]}>
            <SvgXml xml={XMLResources.alert} width={16} height={16}/>
            <Text style={{color: FontColor.light, fontSize: FontSize.s}}>{alertText}</Text>
        </Animated.View>
    )

    const buttonSection = <ButtonSection handleLogin={handleLogin} navigation={navigation}/>

    const keyboardDismiss = () => {
        Keyboard.dismiss();
    }

    return (
        <TouchableWithoutFeedback onPress={keyboardDismiss}>
            <View style={styleSheet.loginContainer}>
                {showAlert && alertModule}
                <View style={styleSheet.logoWrapper}>
                    <SvgXml xml={XMLResources.logo} width="100%"/>
                </View>
                <View style={styleSheet.inputWrapper}>
                    <View style={styleSheet.inputContainer}>
                        {idInput}
                        {pwdInput}
                    </View>
                </View>
                <View style={styleSheet.buttonWrapper}>
                    {buttonSection}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styleSheet = StyleSheet.create({
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    loginContainer: {
        width: '100%',
        height: '100%',
        paddingTop: '30%',
    },

    logoWrapper: {
        width: '100%',
        paddingHorizontal: 'auto',
    },

    inputWrapper: {
        paddingTop: '10%',
        width: '100%',
    },

    buttonWrapper: {
        paddingTop: '15%',
        width: '100%',
        position: 'relative',
    },

    alertContainer: {
        position: 'absolute',
        width: '100%',
        height: 30,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BackgroundColor.primary,
    }
});

const inputStyleSheet = StyleSheet.create({
    inputBox: {
        width: '60%',
        height: 75,
        paddingVertical: 25,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
    },

    loginInput: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
        padding: 0,
        marginLeft: 10,
        flex: 1,
        color: '#000',
        fontSize: 15,
        letterSpacing: 1,
    },

    hideSvgContainer: {
        width: 16,
        height: '100%',
        right: 0,
        justifyContent: 'center',
    },
})

interface InputProps {
    initText: string,
    visibleProp?: boolean,
    onSendDataToParent: any,
}

const MyInput: React.ComponentType<InputProps> = ({initText = 'text', visibleProp = false, onSendDataToParent}) => {
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(!visibleProp);
    const [changedColor] = useState(new Ani.Value(0));

    const backgroundColor = changedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#b3b3b3', BackgroundColor.primary],
    })

    const handleFocus = () => {
        if (text === '') {
            Ani.timing(changedColor, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }

        setFocused(true);
    }

    const handleBlur = () => {
        if (text === '') {
            Ani.timing(changedColor, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setFocused(false);
        }
    }

    const handleChange = (value: string) => {
        setText(value);
        onSendDataToParent(value);
    }

    const shiftVisibility = () => {
        setVisible(!visible);
    }

    const initTextView = (
        <View style={{position: 'absolute', height: '100%', left: 13, top: 25}}>
            <Text style={{color: '#b3b3b3', fontSize: 15}}>{initText}</Text>
        </View>
    );

    return (
        <View style={inputStyleSheet.inputBox}>
            {!focused && initTextView}
            <Ani.View
                style={{
                    backgroundColor: backgroundColor,
                    height: '100%',
                    width: 3,
                    borderRadius: 5,
                }}
            ></Ani.View>
            <TextInput secureTextEntry={!visible} onFocus={handleFocus} onBlur={handleBlur} onChangeText={handleChange}
                       style={inputStyleSheet.loginInput} value={text}/>
            {visibleProp &&
                <Pressable onPress={shiftVisibility}>
                    <View style={inputStyleSheet.hideSvgContainer}>
                        <SvgXml xml={visible ? XMLResources.passwordShow : XMLResources.passwordHide} width="100%"/>
                    </View>
                </Pressable>
            }
        </View>
    );
}

const ButtonSection = ({handleLogin, navigation}: { handleLogin: any, navigation: any}) => {
    const [disabled, setDisabled] = useState<boolean>(false);
    const onLogin = async () => {
        setDisabled(true);
        await handleLogin();
        setDisabled(false);
    }

    return (
        <View style={buttonStyleSheet.buttonContainer}>
            <View style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
                <Text style={buttonStyleSheet.introText}>登录代表你已同意</Text>
                <Pressable onPress={() => navigation.navigate('UserAgreementPage')}>
                    <Text style={[buttonStyleSheet.introText, buttonStyleSheet.infoText]}>用户协议</Text>
                </Pressable>
                <Text style={buttonStyleSheet.introText}>和</Text>
                <Pressable onPress={() => navigation.navigate('PrivacyPolicyPage')}>
                    <Text style={[buttonStyleSheet.introText, buttonStyleSheet.infoText]}>隐私条款</Text>
                </Pressable>
            </View>
            <Pressable style={buttonStyleSheet.loginButton} onPress={onLogin} disabled={disabled}>
                <Text style={{color: '#fff', fontWeight: '600', fontSize: 15}}>登录</Text>
            </Pressable>
        </View>
    )
}

const buttonStyleSheet = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

    introText: {
        letterSpacing: 1,
        fontSize: 12,
        color: '#b3b3b3',
    },

    infoText: {
        color: '#8bb0f4'
    },

    loginButton: {
        marginTop: 10,
        width: '60%',
        height: 45,
        borderRadius: 25,
        backgroundColor: BackgroundColor.primary,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default LoginPage;
