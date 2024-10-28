import TimeTableConfig from "../config/TimeTableConfig.ts";
import {ScheduleWeekDay} from "./enum.ts";
import Course, {
    getPeriodDuration,
    getPeriodEnd,
    getPeriodStart,
    getWeekEnd,
    getWeekStart,
    getWeekString
} from "../components/timeTable/course.ts";
import {ClassObject} from "../components/timeTable/ClassObject.ts";

/**
 * 将接口返回的数据转换为Course对象数组
 * @param data 接口数据
 * @return Course[]
 */
export function dealTable(data: any[]): Course[] {
    const courses: Course[] = [];

    data.forEach((course, index) => {
        const model: Course = {
            name: course.name,
            teacher: course.teacher,
            classroom: course.classroom,
            placeInfo: {
                periodStart: course.start_time,
                periodDuration: course.duration,
                day: course.day,
                weekInfo: convertToWeekInfo(course.weeks),
            }
        }
        courses.push(model);
    })

    return courses;
}

/**
 * 转换表示周次区间的字符串为标记有起始和终止的数组
 * @param str 表示周次区间的字符串
 */
export function convertToWeekInfo(str: string): { weekStart: number, weekEnd: number }[] {
    const weekInterval = str.split(',');
    const res: { weekStart: number, weekEnd: number }[] = [];

    weekInterval.forEach((interval) => {
        const tmp = interval.split('-');

        res.push({
            weekStart: parseInt(tmp[0]),
            weekEnd: parseInt(tmp[1])
        })
    })
    return res;
}

export function getTimeByPeriod(periodStart: number, periodEnd: number) {
    const timeInterval = TimeTableConfig.getTimeInterval(new Date());

    return {
        start: timeInterval[periodStart - 1].start,
        end: timeInterval[periodEnd - 1].end
    };
}

/**
 * 获取需要在classComponent中显示的课程列表
 * @param table 表格数据
 * @param week 周次
 * @param weekDay 周几
 * @return Course[] Course列表
 */
export const getCoursesByWeekAndWeekDay = (table: Record<string, Course[]>, week: number, weekDay: number) => {

    const res: any[] = [];
    const list = table[ScheduleWeekDay[weekDay]];

    list.forEach((course, index) => {
        const start = getWeekStart(course);
        const end = getWeekEnd(course);
        const periodStart = getPeriodStart(course);
        const periodEnd = getPeriodEnd(course);

        for (let i = 0; i < start.length; i++) {
            if (start[i] <= week && end[i] >= week) {
                res.push({
                    name: course.name,
                    teacher: course.teacher,
                    classroom: course.classroom,
                    periodStart: periodStart,
                    periodEnd: periodEnd,
                    time: getTimeByPeriod(periodStart, periodEnd),
                });
            }
        }
    })

    return res;
}

/**
 * 向Schedule组件提供某周某天的课程列表
 * @param table 表格数据
 * @param weekNumber 周次
 * @param weekDay 周几
 * @return: classObject[]
 */
export const getClassList = (table: Record<string, Course[]>, weekNumber: number, weekDay: number): ClassObject[] => {
    const list: ClassObject[] = [];

    let index = 1;
    for (const course of table[ScheduleWeekDay[weekDay]]) {
        const start = getWeekStart(course);
        const end = getWeekEnd(course);
        for (let i = 0; i < start.length; i++) {
            if (start[i] <= weekNumber && end[i] >= weekNumber) {
                const periodStart = getPeriodStart(course);
                if (periodStart > index) {
                    list.push({
                        period: periodStart - index,
                        isEmpty: true,
                    })

                    index += (periodStart - index);
                }

                list.push({
                    name: course.name,
                    teacher: course.teacher,
                    classroom: course.classroom,
                    weeks: getWeekString(course),
                    period: getPeriodDuration(course),
                    isEmpty: false,
                });

                index += getPeriodDuration(course);
            }
        }
    }

    // 判断最后一节为空的情况
    if (index <= 11) {
        list.push({
            period: 11 - index + 1,
            isEmpty: true,
        })
    }
    return list;
}

/**
 * 获取对应周次的课程列表
 * @param table 表格数据
 * @param week 周次
 * @return ClassObject[][] 用于在Schedule渲染的列表
 */
export const getAllCoursesByWeek = (table: Record<string, Course[]>, week: number): ClassObject[][] => {
    const res: ClassObject[][] = [];
    for (let i = 1; i < 7; i++) {
        res.push(getClassList(table, week, i));
    }

    return res;
}
