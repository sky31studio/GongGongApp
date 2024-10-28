import sha256 from 'crypto-js/sha256'
import {Agenda} from "../app/slice/agendaSlice.ts";

/**
 * type数组内是否存在置顶type
 * @param types 标签数组
 */
export const containPinToTop = (types: number[]) => {
    for (let i of types) {
        if (i === 1) {
            return true;
        }
    }
    return false;
}

export const generateID = (name: string, startTime: string, endTime: string) => {
    const input = startTime + ':' + endTime + ' ' + name;

    return sha256(input).toString();
}

export const dealExams = (data: any[]) => {
    const res: Agenda[] = [];

    let index = 0;
    for (let exam of data) {
        let id = generateID(exam.name, exam.start_time, exam.end_time);

        res.push({
            id: id,
            name: exam.name,
            text: exam.text || '',
            startTime: exam.start_time,
            endTime: exam.end_time,
            location: exam.location,
            types: [exam.type === '考试' ? 0 : 1],
        })
    }

    return res;
}

export const convertDateToString = (startDate: Date, endDate: Date) => {
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();
    const startHour = startDate.getHours();
    const startMinute = startDate.getMinutes();
    const endHour = endDate.getHours();
    const endMinute = endDate.getMinutes();

    return `${startYear}/${transTo2Digits(startMonth)}/${transTo2Digits(startDay)} ${transTo2Digits(startHour)}:${transTo2Digits(startMinute)}-${transTo2Digits(endHour)}:${transTo2Digits(endMinute)}`;
}

export const transTo2Digits = (num: number) => {
    return num < 10 ? `0${num}` : num.toString();
}