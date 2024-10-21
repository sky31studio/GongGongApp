import {StyleSheet, Text, View} from "react-native";
import CircularProcess from "./circularProcess";
import React, {useEffect, useState} from "react";
import {useAppSelector} from "../../../app/hooks.ts";
import {selectTable} from "../../../app/slice/tableSlice.ts";
import {SvgXml} from "react-native-svg";
import {BackgroundColor, FontColor} from "../../../config/globalStyleSheetConfig.ts";


const locationXml = `
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_324_3658)">
<path d="M7 3.33337C7 5.66671 4 7.66671 4 7.66671C4 7.66671 1 5.66671 1 3.33337C1 2.53772 1.31607 1.77466 1.87868 1.21205C2.44129 0.649445 3.20435 0.333374 4 0.333374C4.79565 0.333374 5.55871 0.649445 6.12132 1.21205C6.68393 1.77466 7 2.53772 7 3.33337Z" stroke="#B7B7B7" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 4.33337C4.55228 4.33337 5 3.88566 5 3.33337C5 2.78109 4.55228 2.33337 4 2.33337C3.44772 2.33337 3 2.78109 3 3.33337C3 3.88566 3.44772 4.33337 4 4.33337Z" stroke="#B7B7B7" stroke-width="0.666667" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_324_3658">
<rect width="8" height="8" fill="white"/>
</clipPath>
</defs>
</svg>
`;

const timeXml = `
<svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_324_19674)">
<path d="M4.00013 7.33329C5.84108 7.33329 7.33346 5.84091 7.33346 3.99996C7.33346 2.15901 5.84108 0.666626 4.00013 0.666626C2.15918 0.666626 0.666798 2.15901 0.666798 3.99996C0.666798 5.84091 2.15918 7.33329 4.00013 7.33329Z" stroke="#B7B7B7" stroke-width="0.67" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M4 2V4L5.33333 4.66667" stroke="#B7B7B7" stroke-width="0.67" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_324_19674">
<rect width="8" height="8" fill="white"/>
</clipPath>
</defs>
</svg>
`

const tagText = ['已结束', '上课中', '即将上课', ''];
const tagColor = ['#EEEEEE', '#8FB5FB', '#FFAA69', '#'];
const tagFontColor = ['#A6A6A6', '#FFFFFF', '#FFFFFF', '#']

const ClassComponent = () => {
    const table = useAppSelector(selectTable);
    const courses = table.getCoursesByWeekDay(6, 1);

    const  [lastTime, setLastTime] = useState(new Date());
    const intervalId = setInterval(() => {
        setLastTime(new Date());
    }, 8000);

    useEffect(() => {
        return () => {
            clearInterval(intervalId);
        }
    })

    let classTimeline;
    classTimeline = courses.map((course, index) => {
        // 课程状态标签 0--已结束 1--上课中 2--即将上课 3--未开始
        let isDeprecated = 2;

        // 东八区 +8h
        const currentHour = (lastTime.getHours() + 8) % 24;
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

        if(current > end) {
            isDeprecated = 0;
        }
        else if(current < start) {
            isDeprecated = start - current > 30 ? 3 : 2;
        }
        else {
            isDeprecated = 1;
        }

        const tag = (
            <View style={{display: 'flex', justifyContent: 'center', height: '100%', backgroundColor: tagColor[isDeprecated], borderRadius: 20}}>
                <Text style={[styleSheet.tagText, {color: tagFontColor[isDeprecated]}]}>{tagText[isDeprecated]}</Text>
            </View>
        )

        return (
            <View style={styleSheet.courseContainer}>
                <View style={styleSheet.periodContainer}>
                    <Text style={styleSheet.periodText}>{course.periodStart < 10 ? `0${course.periodStart}` : `${course.periodStart}`}</Text>
                    <View style={styleSheet.periodLine}></View>
                    <Text style={styleSheet.periodText}>{course.periodEnd < 10 ? `0${course.periodEnd}` : `${course.periodEnd}`}</Text>
                </View>
                <View style={styleSheet.classInfoContainer}>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={[styleSheet.className, isDeprecated >= 1 ? styleSheet.notDeprecated : styleSheet.deprecated]}>{course.name}</Text>
                    <View style={styleSheet.classroomContainer}>
                        <SvgXml xml={locationXml} width={9} height={9} />
                        <Text style={styleSheet.classroom}>{course.classroom}</Text>
                    </View>
                </View>
                <View style={styleSheet.timeInfoContainer}>
                    <View style={styleSheet.tagWrapper}>
                        {isDeprecated !== 3 && tag}
                    </View>
                    <View style={styleSheet.timeContainer}>
                        <SvgXml xml={timeXml} width={9} height={9} />
                        <Text style={styleSheet.timeInfo}>{course.time.start}</Text>
                        <View style={{width: 8, height: 1, backgroundColor: '#A6A6A6', marginHorizontal: 2}}></View>
                        <Text style={styleSheet.timeInfo}>{course.time.end}</Text>
                    </View>
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
        color: BackgroundColor.secondary,
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
        color: FontColor.grey,
    },

    courseContainer: {
        width: '100%',
        height: 75,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        paddingVertical: 7,
        paddingHorizontal: 25,
        borderTopWidth: 1,
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
        maxWidth: 140,
        fontSize: 14,
        fontWeight: '600',
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
