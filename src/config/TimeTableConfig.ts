
class TimeTableConfig {
    public static config = new TimeTableConfig();

    constructor() {}

    /**
     * 判断给定日期是夏令时还是冬令时
     * @param date 给定日期
     */
    static getTimeInterval(date: Date) {
        const month = date.getMonth() + 1;

        let timeInterval;
        if(month < 5 || month > 9) {
            timeInterval = [
                {
                    "start": "08:00",
                    "end": "08:45"
                },
                {
                    "start": "08:55",
                    "end": "09:40"
                },
                {
                    "start": "10:10",
                    "end": "10:55"
                },
                {
                    "start": "11:05",
                    "end": "11:50"
                },
                {
                    "start": "14:00",
                    "end": "14:45"
                },
                {
                    "start": "14:55",
                    "end": "15:40"
                },
                {
                    "start": "16:10",
                    "end": "16:55"
                },
                {
                    "start": "17:05",
                    "end": "17:50"
                },
                {
                    "start": "19:00",
                    "end": "19:45"
                },
                {
                    "start": "19:55",
                    "end": "20:40"
                },
                {
                    "start": "20:50",
                    "end": "21:35"
                },
            ]
        }
        else {
            timeInterval = [
                {
                    "start": "08:00",
                    "end": "08:45"
                },
                {
                    "start": "08:55",
                    "end": "09:40"
                },
                {
                    "start": "10:10",
                    "end": "10:55"
                },
                {
                    "start": "11:05",
                    "end": "11:50"
                },
                {
                    "start": "14:30",
                    "end": "14:15"
                },
                {
                    "start": "14:25",
                    "end": "15:10"
                },
                {
                    "start": "15:40",
                    "end": "16:25"
                },
                {
                    "start": "16:35",
                    "end": "17:20"
                },
                {
                    "start": "19:30",
                    "end": "20:15"
                },
                {
                    "start": "20:25",
                    "end": "21:10"
                },
                {
                    "start": "21:20",
                    "end": "22:05"
                },
            ]
        }
        return timeInterval;
    }
}

export default TimeTableConfig;

