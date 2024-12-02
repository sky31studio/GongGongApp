import {StyleSheet, useWindowDimensions, View} from "react-native";
import CircularProcess from "./circularProcess";
import React, {useMemo, useState} from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor, FontFamily, FontSize} from "../../../config/globalStyleSheetConfig.ts";
import XMLResources from "../../../basic/XMLResources.ts";
import {ENWeekDay} from "../../../utils/enum.ts";
import {getCoursesByWeekAndWeekDay} from "../../../utils/tableUtils.ts";
import {selectTable} from "../../../app/slice/scheduleSlice.ts";
import {selectTheWeek} from "../../../app/slice/globalSlice.ts";
import ScalingNotAllowedText from "../../global/ScalingNotAllowedText.tsx";

const tagText = ['已结束', '上课中', '即将上课', ''];
const tagColor = [BackgroundColor.grey, BackgroundColor.iconPrimaryBackground, BackgroundColor.tertiary, '#'];
const tagFontColor = ['#A6A6A6', '#FFFFFF', '#FFFFFF', '#'];

const ClassComponent = () => {
    const winWidth = useWindowDimensions().width;
    const table = useAppSelector(selectTable);
    const currentWeek = useAppSelector(selectTheWeek);
    const [lastTime, _] = useState(new Date());
    const weekDay = useMemo(() => lastTime.getDay(), [lastTime]);
    const month = useMemo(() => lastTime.getMonth() + 1, [lastTime]);
    const day = useMemo(() => lastTime.getDate(), [lastTime]);

    let courses: any[] = useMemo(() => getCoursesByWeekAndWeekDay(table, currentWeek, weekDay === 0 ? 7 : weekDay), [table, currentWeek, weekDay]);
    let done = useMemo(() => {
        for (let i = 0; i < courses.length; i++) {

            const currentHour = lastTime.getHours();
            const currentMinute = lastTime.getMinutes();
            const current = currentHour * 60 + currentMinute;

            let startTime = courses[i].time.start.split(':');
            startTime[0] = parseInt(startTime[0]);
            startTime[1] = parseInt(startTime[1]);
            const start = startTime[0] * 60 + startTime[1];

            let endTime = courses[i].time.end.split(':');
            endTime[0] = parseInt(endTime[0]);
            endTime[1] = parseInt(endTime[1]);
            const end = endTime[0] * 60 + endTime[1];

            if (current < start) {
                return i;
            }

            if (current > start && current < end) {
                return i;
            }
        }
        return courses.length;
    }, [lastTime, courses]);


    let classTimeline;
    classTimeline = courses.map((course, index) => {
        // 课程状态标签 0--已结束 1--上课中 2--即将上课 3--未开始
        let isDeprecated;

        const currentHour = lastTime.getHours();
        const currentMinute = lastTime.getMinutes();
        const current = currentHour * 60 + currentMinute;

        let startTime = course.time.start.split(':');
        startTime[0] = parseInt(startTime[0]);
        startTime[1] = parseInt(startTime[1]);
        const start = startTime[0] * 60 + startTime[1];

        let endTime = course.time.end.split(':');
        endTime[0] = parseInt(endTime[0]);
        endTime[1] = parseInt(endTime[1]);
        const end = endTime[0] * 60 + endTime[1];

        if (current > end) {
            isDeprecated = 0;
        } else if (current < start) {
            isDeprecated = start - current > 30 ? 3 : 2;
        } else {
            isDeprecated = 1;
        }

        const tag = (
            <View style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: tagColor[isDeprecated],
                borderRadius: 20
            }}>
                <ScalingNotAllowedText
                    style={[styleSheet.tagText, {color: tagFontColor[isDeprecated]}]}>{tagText[isDeprecated]}</ScalingNotAllowedText>
            </View>
        )

        return (
            <View style={styleSheet.courseContainer} key={index}>
                <View style={styleSheet.periodContainer}>
                    <ScalingNotAllowedText
                        style={styleSheet.periodText}>{course.periodStart < 10 ? `0${course.periodStart}` : `${course.periodStart}`}</ScalingNotAllowedText>
                    <View style={styleSheet.periodLine}></View>
                    <ScalingNotAllowedText
                        style={styleSheet.periodText}>{course.periodEnd < 10 ? `0${course.periodEnd}` : `${course.periodEnd}`}</ScalingNotAllowedText>
                </View>
                <View style={styleSheet.classInfoContainer}>
                    <ScalingNotAllowedText numberOfLines={1} ellipsizeMode="tail"
                                           style={[styleSheet.className, isDeprecated >= 1 ? styleSheet.notDeprecated : styleSheet.deprecated, {maxWidth: winWidth * .4}]}>{course.name}</ScalingNotAllowedText>
                    <View style={styleSheet.classroomContainer}>
                        <SvgXml xml={XMLResources.location} width={9} height={9}/>
                        <ScalingNotAllowedText style={styleSheet.classroom}>{course.classroom}</ScalingNotAllowedText>
                    </View>
                </View>
                <View style={styleSheet.timeInfoContainer}>
                    <View style={styleSheet.tagWrapper}>
                        {isDeprecated !== 3 && tag}
                    </View>
                    <View style={styleSheet.timeContainer}>
                        <SvgXml xml={XMLResources.clock} width={9} height={9}/>
                        <ScalingNotAllowedText style={styleSheet.timeInfo}>{course.time.start}</ScalingNotAllowedText>
                        <View style={{width: 8, height: 1, backgroundColor: '#A6A6A6', marginHorizontal: 2}}></View>
                        <ScalingNotAllowedText style={styleSheet.timeInfo}>{course.time.end}</ScalingNotAllowedText>
                    </View>
                </View>
            </View>
        )
    })

    // 今日无课
    let noClass;
    noClass = (
        <View
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                marginTop: 20
            }}
        >
            <SvgXml xml={XMLResources.noCourse} width={191} height={128}/>
            <ScalingNotAllowedText style={{
                textAlign: 'center',
                color: FontColor.grey,
                marginVertical: 10
            }}>今天没有课哟~</ScalingNotAllowedText>
        </View>
    )

    const circleProcess = useMemo(() => <CircularProcess done={done} todo={courses.length}/>, [done, courses.length]);

    return (
        <View style={styleSheet.classContainer}>
            <View style={styleSheet.statusContainer}>
                <View style={styleSheet.circle}>
                    {circleProcess}
                </View>
                <View style={styleSheet.weekDay}>
                    <ScalingNotAllowedText style={styleSheet.weekDayText}>{ENWeekDay[weekDay]}</ScalingNotAllowedText>
                    <ScalingNotAllowedText style={{color: FontColor.dark}}>今日共{courses.length}节课</ScalingNotAllowedText>
                </View>
                <View style={styleSheet.date}>
                    <ScalingNotAllowedText style={{color: FontColor.dark}}>{lastTime.getFullYear()}/{month < 10 ? `0${month}` : month}/{day < 10 ? `0${day}` : day}</ScalingNotAllowedText>
                    <ScalingNotAllowedText
                        style={styleSheet.weekText}>第{currentWeek === -1 ? '---' : currentWeek}周</ScalingNotAllowedText>
                </View>
            </View>
            <View style={styleSheet.timelineContainer}>
                {courses.length !== 0 ? classTimeline : noClass}
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
        color: BackgroundColor.secondary,
        fontWeight: '900',
        fontFamily: FontFamily.main
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
        color: FontColor.grey,
        fontFamily: FontFamily.main,
    },

    courseContainer: {
        width: '100%',
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 7,
        paddingHorizontal: 25,
        borderTopWidth: .8,
        borderTopColor: '#EEEEEE',
    },

    periodContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    periodLine: {
        width: 1,
        height: 14,
        backgroundColor: FontColor.grey,
    },

    periodText: {
        fontSize: 16,
        fontWeight: '400',
        color: FontColor.grey,
    },

    classInfoContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 35,
    },

    className: {
        fontSize: FontSize.m,
        fontWeight: '800',
    },

    notDeprecated: {
        color: FontColor.dark,
    },

    deprecated: {
        color: FontColor.grey,
    },

    classroomContainer: {
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    classroom: {
        lineHeight: 12,
        marginLeft: 4,
        fontSize: 9,
        color: FontColor.grey,
    },

    timeInfoContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    tagWrapper: {
        height: 36,
        paddingVertical: 8,
    },

    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },

    timeInfo: {
        fontSize: 12,
        color: FontColor.grey,
        marginHorizontal: 2,
    },

    tagText: {
        fontSize: 10,
        paddingHorizontal: 10,
    }
})

export default ClassComponent;
