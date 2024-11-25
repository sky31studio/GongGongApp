import {Pressable, StyleSheet, Text, TextInput, View} from "react-native";
import {useRef, useState} from "react";
import {FontSize} from "../../../config/globalStyleSheetConfig.ts";


const MyTextInput = ({placeholder, initText = '', editable = true, sendData, multiline = false, height = 34, alignCenter = true}: {
    placeholder: string,
    editable?: boolean,
    initText?: string,
    sendData: any,
    multiline?: boolean,
    height?: number,
    alignCenter?: boolean
}) => {
    const textInputRef = useRef<TextInput>(null);
    const [content, setContent] = useState<string>(initText);
    const [isEmpty, setIsEmpty] = useState<boolean>(initText === '');

    const handleChange = (value: string) => {
        setContent(value);
        sendData(value);
    }

    const handleBlur = () => {
        if (content === '') {
            setIsEmpty(true);
            return;
        }
    }

    const handleFocus = () => {
        setIsEmpty(false);
    }

    const focusToTextInput = () => {
        // @ts-ignore
        textInputRef.current.focus();
    }

    return (
        <View style={[ss.myTextInputContainer, {height: height}]}>
            {isEmpty && (
                <Pressable style={{position: 'absolute', left: 5, height: '100%', width: '100%', zIndex: 20}}
                           onPress={focusToTextInput}>
                    <Text style={{position: 'absolute', lineHeight: 34, color: '#ffcad1'}}>{placeholder}</Text>
                </Pressable>
            )}
            <View style={{position: 'absolute', height: '100%', width: '100%', backgroundColor: '#fff7f8'}}></View>
            <TextInput value={content} editable={editable} textAlignVertical={alignCenter ? 'center' : 'top'} multiline={multiline} ref={textInputRef}
                       style={ss.myTextInput} onChangeText={handleChange} onBlur={handleBlur} onFocus={handleFocus}/>
        </View>
    )
}

const ss = StyleSheet.create({
    myTextInputContainer: {
        width: '100%',
        position: 'relative',
        borderRadius: 5,
        overflow: 'hidden',
    },

    myTextInput: {
        height: '100%',
        borderRadius: 5,
        fontSize: FontSize.m,
        paddingVertical: 4,
        paddingLeft: 6,
        margin: 0,
        borderWidth: 0,
    }
})

export default MyTextInput;
