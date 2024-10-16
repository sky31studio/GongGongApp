import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {ClassObject} from "./table";

interface ClassBoxProps {
    color?: string,
    course: ClassObject,
}
/**
 * Schedule组件中的课程单元格
 * @param color 课程单元格的背景颜色
 * @param course 课程信息来源
 */
let ClassBox: React.ComponentType<ClassBoxProps>;
ClassBox = ({course, color = '#1cb128'}) => {
    const {name, classroom} = course;

    return (
        <View style={{...styleSheet.boxContainer, backgroundColor: color}}>
            <View style={styleSheet.classBoxTextWrapper}>
                <Text style={styleSheet.classBoxText}>{name}</Text>
            </View>
            <View style={{...styleSheet.classBoxTextWrapper, position: 'absolute', bottom: 5}}>
                <Text style={styleSheet.classBoxText}>{classroom}</Text>
            </View>
        </View>
    );
};

const styleSheet = StyleSheet.create({
    boxContainer: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
        position: 'relative',
    },

    classBoxTextWrapper: {
        width: '100%',
        paddingRight: 3,
        paddingLeft: 3,
        paddingTop: 3,
        paddingBottom: 3,
    },

    classBoxText: {
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: 'white',
        fontWeight: '600',
        fontSize: 10,
        lineHeight: 14,
    }
});

export default ClassBox;