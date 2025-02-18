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

export enum CNWeekDayShort {
    "周日" = 0,
    "周一" = 1,
    "周二" = 2,
    "周三" = 3,
    "周四" = 4,
    "周五" = 5,
    "周六" = 6,
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
    "大五上",
    "大五下",
    "大六上",
    "大六下",
    "大七上",
    "大七下",
    "大八上",
    "大八下",
    "大九上",
    "大九下",
    "大十上",
    "大十下",
}

export enum ResourceCode {
    LocalFailed,
    PermissionDenied,
    Successful = 200,
    DataExpired = 203,
    InvalidToken = 401,
    NotFound = 404,
    AccountLocked = 423,
    SYSTimeout = 503,
    Timeout = 504,
}

export enum LoginCode {
    Successful = 200,
    Uninitialized = 409,
    SYSTimeout = 503,
    Timeout = 504,
}
