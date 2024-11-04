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
        gpa: originData.gpa || -1,
        classRank: originData.class_rank || -1,
        majorRank: originData.major_rank || -1,
        averageScore: originData.average_score || -1,
    }
})

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setAll: (state, action) => {
            console.log(action.payload)
            state.gpa = action.payload.gpa;
            state.classRank = action.payload.classRank;
            state.majorRank = action.payload.majorRank;
            state.averageScore = action.payload.averageScore;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScoreOverview.fulfilled, (state, action: {payload: any, type: any}) => {
                scoreSlice.caseReducers.setAll(state, {
                    payload: action.payload,
                    type: action.type
                });
            })
    }
})

export const selectAverageScore = (state: RootState) => state.score.averageScore;
export const selectGpa = (state: RootState) => state.score.gpa;
export const selectClassRank = (state: RootState) => state.score.classRank;
export const selectMajorRank = (state: RootState) => state.score.majorRank;

export default scoreSlice.reducer;
