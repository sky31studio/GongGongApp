import {TimePlace} from "../../models/timePlace";

/**
 * 课程类
 */
export default class Course {
    public name: string;
    public teacher: string;
    public classroom: string;
    public placeInfo: TimePlace;

    constructor(name: string, teacher: string, classroom: string, placeInfo: TimePlace) {
        this.name = name;
        this.teacher = teacher;
        this.classroom = classroom;
        this.placeInfo = placeInfo;
    }

    public getPlace(): TimePlace {
        return this.placeInfo;
    }

    public getWeekString(): string {
        const start: number[] = this.getWeekStart();
        const end: number[] = this.getWeekEnd();
        let res: string = '';

        for(let i = 0; i < start.length; i++) {
            res += start[i] + '-' + end[i] + ',';
        }

        return res.slice(0, -1);
    }

    /**
     * 获取周次终止点的数组
     */
    public getWeekEnd(): number[] {
        return this.placeInfo.weekInfo.map((item) => {
            return item.weekEnd;
        })
    }
    /**
     * 获取周次起始点的数组
     */
    public getWeekStart(): number[] {
        return this.placeInfo.weekInfo.map((item) => {
            return item.weekStart;
        })
    }
    /**
     * 获取课程终止点的数组
     */
    public getPeriodEnd() {
        return this.getPeriodStart() + this.placeInfo.periodDuration;
    }
    /**
     * 获取课程起始点的数组
     */
    public getPeriodStart() {
        return this.placeInfo.periodStart;
    }

    public getName(): string {
        return this.name;
    }

    public getTeacher(): string {
        return this.teacher;
    }

    public getClassroom(): string {
        return this.classroom;
    }

    public getPeriodDuration(): number {
        return this.placeInfo.periodDuration;
    }

    public getDay(): string {
        return this.placeInfo.day;
    }

}
