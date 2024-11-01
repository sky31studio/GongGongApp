import {Platform} from "react-native";

export const userDirectory = Platform.select({
    ios: 'path/to/ios/user/directory',
    android: 'path/to/android/user/directory',
});

export const toCNNumber = (num: number): string => {
    const chineseNumbers = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    const units = ['', '十', '百', '千'];
    const sections = ['', '万', '亿', '万亿'];
    let strNum = num.toString();
    let result = '';

    // 处理每个位上的数字
    for (let i = 0; i < strNum.length; i++) {
        const digit = parseInt(strNum[i], 10);
        const sectionIndex = (strNum.length - 1 - i) % 4;
        const unitIndex = Math.floor((strNum.length - 1 - i) / 4);

        if (digit === 0) {
            // 零的特殊处理
            if (i === 0 || strNum[i - 1] !== '0') {
                result = chineseNumbers[digit] + result;
            }
        } else {
            result = chineseNumbers[digit] + units[sectionIndex] + result;
        }

        // 处理万、亿等单位
        if (sectionIndex === 0 && unitIndex > 0) {
            result = sections[unitIndex] + result;
        }
    }

    // 去掉末尾的零
    while (result.endsWith('零')) {
        result = result.slice(0, -1);
    }

    // 去掉末尾的零的单位
    if (result.endsWith('零')) {
        result = result.slice(0, -1);
    }

    return result;
}