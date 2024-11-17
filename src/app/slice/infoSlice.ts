import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";

export const getInfo = createAsyncThunk('info/getInfo', async (token: string) => {
    const originalData = await Resources.getInfo(token);

    return {
        studentID: originalData.student_id || '',
        name: originalData.name || '',
        major: originalData.major || '',
    }
})

interface InitialState {
    studentID: string;
    name: string;
    major: string;
}

const initialState: InitialState = {
    studentID: "",
    name: "",
    major: "",
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getInfo.fulfilled, (state, action) => {
                state.studentID = action.payload.studentID;
                state.name = action.payload.name;
                state.major = action.payload.major;
            })
    }
})

export const selectStudentID = (state: RootState) => state.info.studentID;
export const selectStudentMajor = (state: RootState) => state.info.major;
export const selectStudentName = (state: RootState) => state.info.name;

export default infoSlice.reducer;
