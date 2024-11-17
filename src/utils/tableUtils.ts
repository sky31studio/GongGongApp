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
import {CourseColor} from "../config/globalStyleSheetConfig.ts";

/**
 * 将接口返回的数据转换为Course对象数组
 * @param data 接口数据
 * @return Course[]
 */
export function dealTable(data: any[]): Course[] {
    if (data.length === 0) {
        return [];
    }

    const courses: Course[] = [];
    let colorMap: Record<string, string> = {};
    let index = Math.abs(stringHashcode(data[0].name)) % 7;

    data.forEach((course) => {
        if (!(course.name in colorMap)) {
            colorMap[course.name] = CourseColor[index];
        }

        const model: Course = {
            name: course.name,
            teacher: course.teacher,
            classroom: course.classroom,
            color: colorMap[course.name],
            placeInfo: {
                periodStart: course.start_time,
                periodDuration: course.duration,
                day: course.day,
                weekInfo: convertToWeekInfo(course.weeks),
            }
        }
        courses.push(model);
        index = (index + 1) % 7;
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

    list.forEach((course) => {
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
                const periodStart = getPeriodStart(course)
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
                    color: course.color,
                    weeks: getWeekString(course),
                    weekDay: weekDay,
                    periodStart: periodStart,
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
    for (let i = 1; i <= 7; i++) {
        res.push(getClassList(table, week, i));
    }

    return res;
}

export const getCourseCount = (table: Record<string, Course[]>, week: number, weekDay: number) => {
    let ans = 0;
    for(let course of table[ScheduleWeekDay[weekDay]]) {
        const start = getWeekStart(course);
        const end = getWeekEnd(course);
        for (let i = 0; i < start.length; i++) {
            if (start[i] <= week && end[i] >= week) {
                ans++;
            }
        }
    }

    return ans;
}

export const diffDate = (earlier: Date, later: Date) => {
    return Math.floor((later.getTime() - earlier.getTime()) / (1000 * 3600 * 24));
}

export const stringHashcode = (str: string) => {
    let hash = 0;
    if (str.length === 0) return hash;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}
