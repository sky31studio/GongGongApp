import React, {useMemo} from "react";
import {StyleSheet, Text, View} from "react-native";
import ClassBox from "./classBox";
import TimeTableConfig from "../../config/TimeTableConfig";
import {getAllCoursesByWeek} from "../../utils/tableUtils.ts";
import {useAppSelector} from "../../app/hooks.ts";
import {selectTable} from "../../app/slice/scheduleSlice.ts";
import {selectFirstDate} from "../../app/slice/globalSlice.ts";
import {transTo2Digits} from "../../utils/agendaUtils.ts";
import Animated from "react-native-reanimated";
import {FontSize} from "../../config/globalStyleSheetConfig.ts";

const weekdayCNName = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];

export default function Schedule({week}: { week: number }): React.JSX.Element {
    const date = useAppSelector(selectFirstDate);
    const firstDate = useMemo(() => {
        if (date !== '') {
            const tmpDate = new Date(date);

            tmpDate.setDate(tmpDate.getDate() + (week - 1) * 7);
            return tmpDate;
        }

        return '';
    }, [date, week]);

    const currentMonth = useMemo(() => {
        if (firstDate !== '') {
            return firstDate.getMonth() + 1;
        }

        return '--';
    }, [firstDate])

    let timeInterval;
    timeInterval = TimeTableConfig.getTimeInterval(new Date());
    // 左侧时间表
    let timeListWithGap = timeInterval.reduce((acc: React.JSX.Element[], item, index) => {
        let ss;

        // 防止上边界和gapItem重合
        if (index % 4 === 0) {
            ss = {...styleSheet.timeItem, "borderTopWidth": 0};
        } else {
            ss = styleSheet.timeItem;
        }

        const view = (
            <View style={ss} key={index}>
                <Text style={styleSheet.tItemBoldText}>{index + 1}</Text>
                <Text style={styleSheet.tItemSlimText}>{item.start}</Text>
                <Text style={styleSheet.tItemSlimText}>{item.end}</Text>
            </View>
        );

        if (index % 4 === 3) {
            acc.push(view, <View style={styleSheet.timeGap}/>);
        } else {
            acc.push(view);
        }

        return acc;
    }, []);

    // 左上角表示月份的单元格
    const monthItem = (
        <View style={styleSheet.monthItem}>
            <Text style={styleSheet.monthText}>{currentMonth}</Text>
            <Text style={styleSheet.monthText}>月</Text>
        </View>
    );
    timeListWithGap = [monthItem, ...timeListWithGap];

    const table = useAppSelector(selectTable);
    const courses = useMemo(() => getAllCoursesByWeek(table, week), [table, week]);

    const classList = () => {
        return courses.map((item, index) => {
            let showText = '--';
            if (firstDate !== '') {
                const showDate = new Date(firstDate);
                showDate.setDate(showDate.getDate() + index);

                showText = `${transTo2Digits(showDate.getMonth() + 1)}-${transTo2Digits(showDate.getDate())}`;
            }

            const weekDayItem = (
                <View style={styleSheet.weekdayItemWrapper}>
                    <View style={styleSheet.weekdayItem}>
                        <Text style={styleSheet.wItemBoldText}>{weekdayCNName[index]}</Text>
                        <Text
                            style={styleSheet.wItemSlimText}>{showText}</Text>
                    </View>
                </View>
            );

            let flag = 1;
            const classItemList = item.reduce((acc: React.JSX.Element[], item, index) => {
                const space = 4 - (flag - 1) % 4;
                if (space <= item.period) {
                    const view = (
                        <View key={index} style={{...styleSheet.classItem, flex: space}}>
                            <View style={{width: '100%', height: '100%', padding: 3}}>
                                {item.isEmpty ? '' : <ClassBox course={item}/>}
                            </View>
                        </View>
                    );

                    acc.push(view);

                    let remainPeriod = item.period - space;
                    while (remainPeriod >= 4) {
                        const secView = (
                            <View style={{...styleSheet.classItem, flex: 4}}>
                                <View style={{width: '100%', height: '100%', padding: 3}}>
                                    {item.isEmpty ? '' : <ClassBox course={item}/>}
                                </View>
                            </View>
                        );

                        acc.push(<View style={styleSheet.classGap}/>, secView);
                        remainPeriod -= 4;
                    }

                    if (remainPeriod !== 0) {
                        const secView = (
                            <View style={{...styleSheet.classItem, flex: remainPeriod}}>
                                <View style={{width: '100%', height: '100%', padding: 3}}>
                                    {item.isEmpty ? '' : <ClassBox course={item}/>}
                                </View>
                            </View>
                        );

                        acc.push(<View style={styleSheet.classGap}/>, secView);
                    } else {
                        acc.push(<View style={styleSheet.classGap}/>);
                    }

                } else {
                    const view = (
                        <View style={{...styleSheet.classItem, flex: item.period}}>
                            <View style={{width: '100%', height: '100%', padding: 3}}>
                                {item.isEmpty ? '' : <ClassBox course={item}/>}
                            </View>

                        </View>
                    );

                    acc.push(view);
                }

                flag += item.period;

                return acc;
            }, []);

            return (
                <View key={index} style={styleSheet.weekdayContainer}>
                    {weekDayItem}
                    {classItemList.map((item) => (
                        item
                    ))}
                </View>
            )
        });
    }

    return (
        <Animated.View style={styleSheet.scheduleContainer}>
            <View style={styleSheet.timeContainer}>
                {timeListWithGap.map((item) => (
                    item
                ))}
            </View>
            {classList()}
        </Animated.View>
    );
}

const styleSheet = StyleSheet.create({
    scheduleContainer: {
        width: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'row'
    },

    timeContainer: {
        width: 33,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#eee',
    },

    tItemBoldText: {
        width: '100%',
        height: 25,
        textAlign: 'center',
        lineHeight: 30,
        fontWeight: '600',
        paddingBottom: 4,
        color: '#000',
    },

    tItemSlimText: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 11,
        color: '#8f8f8f',
    },

    monthItem: {
        width: '100%',
        flex: 1,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    monthText: {
        width: '100%',
        textAlign: 'center',
        textAlignVertical: 'center',
        color: '#000',
        fontWeight: 'bold',
    },

    timeItem: {
        flex: 1,
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fff',
        borderStyle: 'solid',
        borderTopWidth: .5,
        borderTopColor: '#eee',
    },

    timeGap: {
        height: 7,
        width: '100%',
        backgroundColor: '#eee',
    },

    weekdayContainer: {
        backgroundColor: '#fafafa',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
    },

    weekdayItemWrapper: {
        backgroundColor: '#fff',
        width: '100%',
        flex: 1,
    },

    weekdayItem: {
        flex: 1,
        margin: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },

    wItemBoldText: {
        width: '100%',
        fontWeight: 'bold',
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    wItemSlimText: {
        width: '100%',
        fontWeight: '200',
        textAlign: 'center',
        fontSize: FontSize.s,
        textAlignVertical: 'center',
    },

    classItem: {
        width: '100%',
        // backgroundColor: '#fff',
    },

    classGap: {
        height: 7,
        width: '100%',
        backgroundColor: '#fafafa',
    }
});
