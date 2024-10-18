import {StyleSheet, Text, View} from "react-native";
import CircularProcess from "./circularProcess";
import React from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectTable} from "../../../app/slice/tableSlice.ts";


const ClassComponent = () => {
    const table = useAppSelector(selectTable);
    const courses = table.getCoursesByWeekDay(6, 1);

    let classTimeline;
    classTimeline = courses.map((course, index) => {
        return (
            <View style={styleSheet.courseContainer}>
                <View style={styleSheet.periodContainer}>
                    <Text style={styleSheet.periodText}>{course.periodStart < 10 ? `0${course.periodStart}` : `${course.periodStart}`}</Text>
                    <View style={styleSheet.periodLine}></View>
                    <Text style={styleSheet.periodText}>{course.periodEnd < 10 ? `0${course.periodEnd}` : `${course.periodEnd}`}</Text>
                </View>
            </View>
        )
    })

    return (
        <View style={styleSheet.classContainer}>
            <View style={styleSheet.statusContainer}>
                <View style={styleSheet.circle}>
                    <CircularProcess done={1} todo={4} />
                </View>
                <View style={styleSheet.weekDay}>
                    <Text style={styleSheet.weekDayText}>MON.</Text>
                    <Text>今日共{4}节课</Text>
                </View>
                <View style={styleSheet.date}>
                    <Text>2024/10/17</Text>
                    <Text style={styleSheet.weekText}>第十七周</Text>
                </View>
            </View>
            <View style={styleSheet.timelineContainer}>
                {classTimeline}
            </View>
        </View>
    );
}

const styleSheet = StyleSheet.create({
    classContainer: {
        width: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
    },

    statusContainer: {
        width: '100%',
        display: 'flex',
        height: 70,
        flexDirection: 'row',
    },

    timelineContainer: {
        width: '100%',
    },

    circle: {
        height: '100%',
        width: 70,
    },

    weekDay: {
        height: '100%',
        marginLeft: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    weekDayText: {
        fontSize: 18,
        color: '#FF6C87',
        fontWeight: '900',
    },

    date: {
        flex: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 10,
    },

    weekText: {
        fontSize: 14,
        fontWeight: '700',
        color: '#A6A6A6',
    },

    courseContainer: {
        width: '100%',
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 5,
        paddingHorizontal: 25,
        borderTopWidth: 1,
        borderTopColor: '#EEEEEE',
    },

    periodContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    periodLine: {
        width: 1,
        height: 14,
        backgroundColor: '#A6A6A6',
    },

    periodText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#A6A6A6',
    }
})

export default ClassComponent;
