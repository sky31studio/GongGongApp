import Course from "./course";

/**
 * 课程单元格
 */
export interface ClassObject {
    name?: string | undefined;
    teacher?: string;
    classroom?: string;
    weeks?: string;
    period: number;
    isEmpty: boolean;
}

enum WeekDays {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

export default class Table {
    // key-weekDay, value-位于该weekDay的课程列表
    table: Record<string, Course[]> = {};

    constructor() {
        for(let i = 1; i <= 7; i++) {
            this.table[WeekDays[i]] = [];
        }
    }

    /**
     * 初始化课程表格，将课程入到对应的weekDay
     * @param courses 课程数组
     */
    public initTable(courses: Course[]) {
        this.cleanTable();
        courses.forEach((course) => {
            this.addClass(course.getDay(), course);
        })
        // 排序以便在Schedule组件中渲染
        this.updateAll();
    }

    private cleanTable() {
        for(let i = 1; i <= 7; i++) {
            this.table[WeekDays[i]] = [];
        }
    }

    /**
     * 向Schedule组件提供某周某天的课程列表
     * @param weekNumber 周次
     * @param weekDay 周几
     * @return: classObject[]
     */
    getClassList(weekNumber: number, weekDay: number): ClassObject[] {
        const list: ClassObject[] = [];
        let index = 1;
        for(const course of this.table[WeekDays[weekDay]]) {
            const start = course.getWeekStart();
            const end = course.getWeekEnd();
            for(let i = 0; i < start.length; i++) {
                if(start[i] <= weekNumber && end[i] >= weekNumber) {
                    const periodStart = course.getPeriodStart();
                    if(periodStart > index) {
                        list.push({
                            period: periodStart - index,
                            isEmpty: true,
                        })

                        index += (periodStart - index);
                    }

                    list.push({
                        name: course.getName(),
                        teacher: course.getTeacher(),
                        classroom: course.getClassroom(),
                        weeks: course.getWeekString(),
                        period: course.getPeriodDuration(),
                        isEmpty: false,
                    });

                    index += (course.getPeriodDuration());
                }
            }
        }

        // 判断最后一节为空的情况
        if(index <= 11) {
            list.push({
                period: 11 - index + 1,
                isEmpty: true,
            })
        }
        return list;
    }
    /**
     * 检查提供给Schedule的课程单元格列表的长度是否为11
     * @param classList 课程单元格列表
     */
    public check(classList: ClassObject[]): boolean {
        let count = 0;
        for(const item of classList) {
            count += item.period;
        }

        return count === 11;
    }

    /**
     * 添加课程到对应weekDay的列表中
     * @param weekday 周几
     * @param course 课程
     */
    private addClass(weekday: string, course: Course) {
        this.table[weekday].push(course);
    }
    /**
     * 对所有weekDay排序
     */
    private updateAll() {
        for(let i = 1; i <= 7; i++) {
            this.update(WeekDays[i]);
        }
    }

    /**
     * 根据起始时间对课程进行升序排序
     * @param weekDay 周几
     */
    private update(weekDay: string) {
        this.table[weekDay].sort((a, b) => {
            return a.getPeriodStart() - b.getPeriodStart();
        })
    }

    /**
     * 获取weekDay和其对应的课程列表
     */
    public getAllCourses() {
        return Object.entries(this.table);
    }
}
