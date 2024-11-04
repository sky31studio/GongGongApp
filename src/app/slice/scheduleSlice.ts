import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {ScheduleWeekDay} from "../../utils/enum.ts";
import {RootState} from "../store.ts";
import Course, {getPeriodStart, getWeekDay} from "../../components/timeTable/course.ts";
import Resources from "../../basic/Resources.ts";
import {dealTable, getAllCoursesByWeek, getCourseCount} from "../../utils/tableUtils.ts";
import {selectCurrentTime, selectTheWeek} from "./globalSlice.ts";

export const fetchTable = createAsyncThunk('schedule/fetchTable', async () => {
    const originData: any[] = await Resources.fetchClassData();
    return dealTable(originData);
})

interface ScheduleState {
    table: Record<string, Course[]>;
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
    }
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        cleanTable: (state, action: { payload: any[] | undefined, type: any }) => {
            state.table = {
                'Monday': [],
                'Tuesday': [],
                'Wednesday': [],
                'Thursday': [],
                'Friday': [],
                'Saturday': [],
                'Sunday': []
            };
        },
        addSchedules: (state, action: { payload: Course[], type: any }) => {
            for (let course of action.payload) {
                const weekDay: string = getWeekDay(course);
                state.table[weekDay].push(course);
            }

            for (let i = 1; i <= 7; i++) {
                state.table[ScheduleWeekDay[i]].sort((a, b) => {
                    return getPeriodStart(a) - getPeriodStart(b);
                })
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.fulfilled, (state, action) => {
                scheduleSlice.caseReducers.cleanTable(state, {payload: action.payload, type: 'schedule/cleanTable'});
                scheduleSlice.caseReducers.addSchedules(state, {
                    payload: action.payload,
                    type: 'schedule/addSchedules'
                });
            })
    }
})

export const selectTable = (state: RootState) => state.schedule.table;

export const selectCurrentCourseNumber = createSelector(
    [selectTable, selectCurrentTime, selectTheWeek],
    (table, currentTime, theWeek) => {
        const weekDay = (new Date(currentTime)).getDay();

        return getCourseCount(table, theWeek, weekDay === 0 ? 7 : weekDay);
    }
)

export const {cleanTable, addSchedules} = scheduleSlice.actions;
export default scheduleSlice.reducer;
