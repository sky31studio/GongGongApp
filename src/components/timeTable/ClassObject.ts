/**
 * 课程单元格
 */
export interface ClassObject {
    name?: string | undefined;
    teacher?: string;
    classroom?: string;
    color?: string;
    weeks?: string;
    weekDay?: number;
    periodStart?: number;
    period: number;
    isEmpty: boolean;
}
