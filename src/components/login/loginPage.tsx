import React, {useEffect, useState} from "react";
import {Animated, Keyboard, Pressable, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";
import {SvgXml} from "react-native-svg";


const svgXML = `
<svg width="180" height="94" viewBox="0 0 180 94" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
<rect width="180" height="94" fill="url(#pattern0_25_16079)"/>
<defs>
<pattern id="pattern0_25_16079" patternContentUnits="objectBoundingBox" width="1" height="1">
<use xlink:href="#image0_25_16079" transform="matrix(0.00101402 0 0 0.00194175 -0.0359115 0)"/>
</pattern>
<image id="image0_25_16079" width="1057" height="515" xlink:href="data:image/png;base64,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"/>
</defs>
</svg>

`
const hideSvgXML = `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_25_16073)">
<path d="M9.41329 9.41343C9.23019 9.60993 9.00939 9.76754 8.76406 9.87685C8.51873 9.98616 8.25389 10.0449 7.98535 10.0497C7.71681 10.0544 7.45007 10.005 7.20103 9.90443C6.952 9.80384 6.72577 9.65412 6.53586 9.4642C6.34594 9.27428 6.19622 9.04806 6.09563 8.79902C5.99504 8.54999 5.94564 8.28325 5.95038 8.0147C5.95512 7.74616 6.0139 7.48133 6.12321 7.236C6.23252 6.99067 6.39013 6.76986 6.58663 6.58677M11.96 11.9601C10.8204 12.8288 9.4327 13.31 7.99996 13.3334C3.33329 13.3334 0.666626 8.0001 0.666626 8.0001C1.49589 6.4547 2.64605 5.1045 4.03996 4.0401L11.96 11.9601ZM6.59996 2.82676C7.05885 2.71935 7.52867 2.66566 7.99996 2.66676C12.6666 2.66676 15.3333 8.0001 15.3333 8.0001C14.9286 8.75717 14.446 9.46992 13.8933 10.1268L6.59996 2.82676Z" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M0.666626 0.666748L15.3333 15.3334" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_25_16073">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>

    `
const showSvgXML = `
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_25_16099)">
<path d="M0.666687 8.00008C0.666687 8.00008 3.33335 2.66675 8.00002 2.66675C12.6667 2.66675 15.3334 8.00008 15.3334 8.00008C15.3334 8.00008 12.6667 13.3334 8.00002 13.3334C3.33335 13.3334 0.666687 8.00008 0.666687 8.00008Z" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z" stroke="#B7B7B7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_25_16099">
<rect width="16" height="16" fill="white"/>
</clipPath>
</defs>
</svg>
`

export default function LoginPage(): React.JSX.Element {

    const inputSection = <InputSection/>
    const buttonSection = <ButtonSection/>


    const keyboardDismiss = () => {
        Keyboard.dismiss();
    }

    useEffect(() => {
        const handleFocus = () => {

        }
    }, []);

    return (
        <TouchableWithoutFeedback onPress={keyboardDismiss}>
            <View style={styleSheet.loginContainer}>
                <View style={styleSheet.logoWrapper}>
                    <SvgXml xml={svgXML} width="100%"/>
                </View>
                <View style={styleSheet.inputWrapper}>
                    {inputSection}
                </View>
                <View style={styleSheet.buttonWrapper}>
                    {buttonSection}
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

function InputSection(): React.JSX.Element {
    const idInput = <MyInput initText="请输入你的学号"/>
    const pwdInput = <MyInput initText="请输入教务系统密码" visibleProp={true}/>

    return (
        <View style={inputStyleSheet.inputContainer}>
            {idInput}
            {pwdInput}
        </View>
    );
}

const inputStyleSheet = StyleSheet.create({
    inputContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },

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
}

const MyInput: React.ComponentType<InputProps> = ({initText = 'text', visibleProp = false}) => {
    const [text, setText] = useState('');
    const [focused, setFocused] = useState(false);
    const [visible, setVisible] = useState(!visibleProp);
    const [changedColor] = useState(new Animated.Value(0));

    const backgroundColor = changedColor.interpolate({
        inputRange: [0, 1],
        outputRange: ['#b3b3b3', '#FF6275'],
    })

    const handleFocus = () => {
        if (text === '') {
            Animated.timing(changedColor, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }

        setFocused(true);
    }

    const handleBlur = () => {
        if (text === '') {
            Animated.timing(changedColor, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
            setFocused(false);
        }
    }

    const handleChange = (value: string) => {
        setText(value);
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
            <Animated.View
                style={{
                    backgroundColor: backgroundColor,
                    height: '100%',
                    width: 3,
                    borderRadius: 5,
                }}
            ></Animated.View>
            <TextInput secureTextEntry={!visible} onFocus={handleFocus} onBlur={handleBlur} onChangeText={handleChange}
                       style={inputStyleSheet.loginInput} value={text}/>
            {visibleProp &&
                <Pressable onPress={shiftVisibility}>
                    <View style={inputStyleSheet.hideSvgContainer}>
                        <SvgXml xml={visible ? showSvgXML : hideSvgXML} width="100%"/>
                    </View>
                </Pressable>
            }
        </View>
    );
}

const ButtonSection = () => {

    return (
        <View style={buttonStyleSheet.buttonContainer}>
            <View style={{display: 'flex', flexDirection: 'row', marginVertical: 10}}>
                <Text style={buttonStyleSheet.introText}>登录代表你已同意</Text>
                <Text style={[buttonStyleSheet.introText, buttonStyleSheet.infoText]}>用户协议</Text>
                <Text style={buttonStyleSheet.introText}>和</Text>
                <Text style={[buttonStyleSheet.introText, buttonStyleSheet.infoText]}>隐私条款</Text>
            </View>
            <View style={buttonStyleSheet.loginButton}>
                <Text style={{color: '#fff', fontWeight: '600', fontSize: 15}}>登录</Text>
            </View>
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
        backgroundColor: '#FF6275',
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const styleSheet = StyleSheet.create({
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
});
