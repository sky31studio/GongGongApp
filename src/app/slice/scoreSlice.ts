import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {fetchTable} from "./scheduleSlice.ts";
import {RootState} from "../store.ts";

interface initialState {
    gpa: number;
    classRank: number;
    majorRank: number;
    averageScore: number;
}

const initialState: initialState = {
    gpa: -1,
    classRank: -1,
    majorRank: -1,
    averageScore: -1,
}

export const getScoreOverview = createAsyncThunk('score/getScore', async () => {
    const originData = await Resources.getScoreOverview();

    return {
        gpa: originData.gpa,
        classRank: originData.class_rank,
        majorRank: originData.major_rank,
        averageScore: originData.average_score,
    }
})

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setAll: (state, action) => {
            state.gpa = action.payload.gpa;
            state.classRank = action.payload.classRank;
            state.majorRank = action.payload.majorRank;
            state.averageScore = action.payload.averageScore;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTable.fulfilled, (state, action) => {
                scoreSlice.caseReducers.setAll(state, action);
            })
    }
})

export const selectAverageScore = (state: RootState) => state.score.averageScore;
export const selectGpa = (state: RootState) => state.score.gpa;
export const selectClassRank = (state: RootState) => state.score.classRank;
export const selectMajorRank = (state: RootState) => state.score.majorRank;

export default scoreSlice.reducer;