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

export const generateID = (name: string, time: Date) => {
    const input = time.toString() + ':' + name;

    return sha256(input).toString();
}

export const dealExams = (data: any[]) => {
    const res: Agenda[] = [];

    console.log(data);
    for (let exam of data) {
        let id = generateID(exam.name, exam.start_time);

        res.push({
            id: id,
            name: exam.name,
            text: exam.text || '',
            startTime: convertTimeToArray(exam.start_time),
            endTime: convertTimeToArray(exam.end_time),
            location: exam.location,
            types: [exam.type === '考试' ? 0 : 1],
        })
    }

    return res;
}

/**
 * 将字符串形式的时间转为[year, month, day, minute, second]形式的数组
 * @param timeStr 字符串形式的时间
 */
const convertTimeToArray = (timeStr: string) => {
    const res: number[] = [];
    let [left, right] = timeStr.split(' ');

    let [year, month, day] = left.split('-');
    res.push(Number(year), Number(month), Number(day));

    let [hour, minute] = right.split(':');
    res.push(Number(hour), Number(minute));

    let date = new Date(Number(year), Number(month) - 1, Number(day));
    res.push(date.getDay());

    return res;
}