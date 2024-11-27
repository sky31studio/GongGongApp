
// 正则表达式匹配被**包裹的加粗部分
import {StyleSheet, Text} from "react-native";

let regexBold = /\*\*(.*?)\*\*/g;
let regex = /(\*\*.*?\*\*)|([^*]+)/g;

export const handleStrongText = (content: string) => {
    const res = [];

    while(true) {
        const result = regex.exec(content);

        if(result === null) {
            regexBold.lastIndex = 0;
            break;
        }

        if(result[1]) {
            const boldResult = regexBold.exec(content);
            res.push(<Text style={ss.bold}>{boldResult ? boldResult[1] : '*'}</Text>);
        }

        if(result[2]) {
            res.push(<Text style={ss.normal}>{result[2]}</Text>);
        }
    }

    return res;
}

const ss = StyleSheet.create({
    bold: {
        fontWeight: 'bold',
    },

    normal: {
        fontWeight: '200',
    }
})
