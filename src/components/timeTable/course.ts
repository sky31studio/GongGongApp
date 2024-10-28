import {TimePlace} from "../../models/timePlace";

export default interface Course {
    name: string;
    teacher: string;
    classroom: string;
    placeInfo: TimePlace;
}

export const getWeekString = (course: Course): string => {
    const start: number[] = getWeekStart(course);
    const end: number[] = getWeekEnd(course);
    let res: string = '';

    for (let i = 0; i < start.length; i++) {
        res += start[i] + '-' + end[i] + ',';
    }

    return res.slice(0, -1);
}

export const getWeekEnd = (course: Course): number[] => {
    return course.placeInfo.weekInfo.map((item) => {
        return item.weekEnd;
    })
}

export const getWeekStart = (course: Course): number[] => {
    return course.placeInfo.weekInfo.map((item) => {
        return item.weekStart;
    })
}

export const getPeriodEnd = (course: Course) => {
    return getPeriodStart(course) + course.placeInfo.periodDuration - 1;
}

export const getPeriodStart = (course: Course): number => {
    return course.placeInfo.periodStart;
}

export const getPeriodDuration = (course: Course): number => {
    return course.placeInfo.periodDuration;
}

export const getWeekDay = (course: Course) => {
    return course.placeInfo.day;
}
