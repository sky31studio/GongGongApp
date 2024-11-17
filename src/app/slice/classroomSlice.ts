import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {dealClassroomData} from "../../utils/classroomUtils.ts";
import {RootState} from "../store.ts";

/**
 * 楼内教室信息，如 name: 逸夫楼, status: [true, false, false, true, true]
 */
export interface ClassroomInfo {
    name: string;
    status: boolean[];
}

/**
 * 存储今明两天的空教室数据
 */
interface InitialState {
    today: {
        name: string;
        classroom: ClassroomInfo[]
    }[];
    tomorrow: {
        name: string;
        classroom: ClassroomInfo[]
    }[];
}

const initialState: InitialState = {
    today: [],
    tomorrow: []
};

/**
 * 获取今天的空教室数据
 */
export const getTodayEmptyClassroomStatus = createAsyncThunk('classroom/getTodayEmptyClassroomStatus', async (token: string) => {
    const todayData = await Resources.getTodayClassroomStatus(token);
    return dealClassroomData(todayData);
})

/**
 * 获取明天的空教室数据
 */
export const getTomorrowEmptyClassroomStatus = createAsyncThunk('classroom/getTomorrowEmptyClassroomStatus', async (token: string) => {
    const tomorrowData = await Resources.getTomorrowClassroomStatus(token);

    return dealClassroomData(tomorrowData);
})

const classroomSlice = createSlice({
    name: 'emptyClassroom',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodayEmptyClassroomStatus.fulfilled, (state, action) => {
                state.today = action.payload;
            })
            .addCase(getTomorrowEmptyClassroomStatus.fulfilled, (state, action) => {
                state.tomorrow = action.payload;
            })
    }
})

export const selectTodayClassroomStatus = (state: RootState) => state.classroom.today;
export const selectTomorrowClassroomStatus = (state: RootState) => state.classroom.tomorrow;

export default classroomSlice.reducer;
