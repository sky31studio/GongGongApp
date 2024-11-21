/**
 * weekDay映射
 */
export enum CNWeekDay {
    "星期天" = 0,
    "星期一" = 1,
    "星期二" = 2,
    "星期三" = 3,
    "星期四" = 4,
    "星期五" = 5,
    "星期六" = 6,
}

export enum ENWeekDay {
    "SUN." = 0,
    "MON.",
    "TUE.",
    "WED.",
    "THU.",
    "FRID.",
    "SAT."
}

/**
 * agenda类型，没有则为自己添加的
 */
export enum AgendaType {
    "考试" = 0,
    "考查",
}

export enum ScheduleWeekDay {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
}

export enum ENToCNWeekDay {
    'Monday' = "周一",
    'Tuesday' = "周二",
    'Wednesday' = "周三",
    'Thursday' = "周四",
    'Friday' = "周五",
    'Saturday' = "周六",
    'Sunday' = "周日"
}

export enum Term {
    "大一上" = 1,
    "大一下",
    "大二上",
    "大二下",
    "大三上",
    "大三下",
    "大四上",
    "大四下",
}

export enum ResourceCode {
    LocalFailed,
    RemoteFailed,
    PermissionDenied,
    Successful,
}
