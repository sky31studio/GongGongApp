import Course from "../components/timeTable/course.ts";
import TimeTableConfig from "../config/TimeTableConfig.ts";

/**
 * 将接口返回的数据转换为Course对象数组
 * @param data 接口数据
 * @return Course[]
 */
export function dealTable(data: any[]): Course[] {
    const courses: Course[] = [];

    data.forEach((course, index) => {
        const model = new Course(course.name, course.teacher, course.classroom, {
            periodStart: course.start_time,
            periodDuration: course.duration,
            day: course.day,
            weekInfo: convertToWeekInfo(course.weeks),
        })

        courses.push(model);
    })

    return courses;
}

/**
 * 转换表示周次区间的字符串为标记有起始和终止的数组
 * @param str 表示周次区间的字符串
 */
export function convertToWeekInfo(str: string): {weekStart:number, weekEnd:number}[] {
    const weekInterval = str.split(',');
    const res: {weekStart:number, weekEnd:number}[] = [];

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

    return `${timeInterval[periodStart - 1].start}-${timeInterval[periodEnd - 1].end}`;
}