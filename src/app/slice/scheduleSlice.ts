import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {ScheduleWeekDay} from "../../utils/enum.ts";
import {RootState} from "../store.ts";
import Course, {getPeriodStart, getWeekDay} from "../../components/timeTable/course.ts";
import Resources from "../../basic/Resources.ts";
import {dealTable, getCourseCount} from "../../utils/tableUtils.ts";
import {selectCurrentTime, selectTheWeek} from "./globalSlice.ts";

export const fetchTable = createAsyncThunk('schedule/fetchTable', async (token: string) => {
    const response = await Resources.getClassData(token);
    return dealTable(response.data);
})

/*
*  课程的时间信息
* */
interface TimePosition {
    weekDay: number;
    periodStart: number;
    periodEnd: number;
}

interface ScheduleState {
    table: Record<string, Course[]>;
    modalTimePosition: TimePosition | null;
    modalVisible: boolean;
    modalLocked: boolean;
}

const initialState: ScheduleState = {
    table: {
        'Monday': [],
        'Tuesday': [],
        'Wednesday': [],
        'Thursday': [],
        'Friday': [],
        'Saturday': [],
        'Sunday': []
    },
    modalTimePosition: null,
    modalVisible: false,
    modalLocked: false,
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        initTable: (state, action) => {
            state.table = {
                'Monday': [],
                'Tuesday': [],
                'Wednesday': [],
                'Thursday': [],
                'Friday': [],
                'Saturday': [],
                'Sunday': []
            };
            for (let course of dealTable(action.payload)) {
                const weekDay: string = getWeekDay(course);
                state.table[weekDay].push(course);
            }

            for (let i = 1; i <= 7; i++) {
                state.table[ScheduleWeekDay[i]].sort((a, b) => {
                    return getPeriodStart(a) - getPeriodStart(b);
                })
            }
        },

        setModalTimePosition: (state, action: { payload: TimePosition }) => {
            state.modalTimePosition = action.payload;
        },
        showModal: (state) => {
            state.modalVisible = true;
        },
        hideModal: (state) => {
            state.modalVisible = false;
        },
        lockModal: (state) => {
            state.modalLocked = true;
        },
        unlockModal: (state) => {
            state.modalLocked = false;
        },

        resetSchedule: (state) => {
            state.table = {
                'Monday': [],
                'Tuesday': [],
                'Wednesday': [],
                'Thursday': [],
                'Friday': [],
                'Saturday': [],
                'Sunday': []
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.fulfilled, (state, action) => {
                scheduleSlice.caseReducers.initTable(state, action);
            })
    }
})

export const selectTable = (state: RootState) => state.schedule.table;
export const selectModalTimePosition = (state: RootState) => state.schedule.modalTimePosition;
export const selectModalVisible = (state: RootState) => state.schedule.modalVisible;
export const selectModalLocked = (state: RootState) => state.schedule.modalLocked;

export const selectCurrentCourseNumber = createSelector(
    [selectTable, selectCurrentTime, selectTheWeek],
    (table, currentTime, theWeek) => {
        const weekDay = (new Date(currentTime)).getDay();

        return getCourseCount(table, theWeek, weekDay === 0 ? 7 : weekDay);
    }
)

export const selectCurrentTimeCourses = createSelector(
    [selectTable, selectModalTimePosition],
    (table, timePosition) => {
        let res: Course[] = [];
        if(timePosition) {
            const courseList = table[ScheduleWeekDay[timePosition.weekDay]];
            const periodStart = timePosition.periodStart;
            const periodEnd = timePosition.periodEnd;
            res = courseList.filter(course => {
                const start = course.placeInfo.periodStart;
                const end = start + course.placeInfo.periodDuration - 1;
                return !(start > periodEnd || end < periodStart);
            })
        }

        return res;
    }
)

export const {
    initTable,
    setModalTimePosition,
    showModal,
    hideModal,
    lockModal,
    unlockModal,
    resetSchedule,
} = scheduleSlice.actions;
export default scheduleSlice.reducer;
