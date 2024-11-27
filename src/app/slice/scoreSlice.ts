import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";
import {dealScore, SingleScoreList} from "../../utils/scoreUtils.ts";

interface initialState {
    gpa: number;
    classRank: number;
    majorRank: number;
    averageScore: number;
    scoreList: SingleScoreList[];
}

const initialState: initialState = {
    gpa: -1,
    classRank: -1,
    majorRank: -1,
    averageScore: -1,
    scoreList: [],
}

export const getScoreOverview = createAsyncThunk('score/getScore', async (token: string) => {
    const response = await Resources.getScoreOverview(token);

    return {
        gpa: response.data.gpa,
        classRank: response.data.class_rank,
        majorRank: response.data.major_rank,
        averageScore: response.data.average_score,
    }
})

const scoreSlice = createSlice({
    name: 'score',
    initialState,
    reducers: {
        setScoreOverview: (state, action) => {
            state.gpa = action.payload.gpa || -1;
            state.classRank = action.payload.class_rank || -1;
            state.majorRank = action.payload.major_rank || -1;
            state.averageScore = action.payload.average_score || -1;
        },

        initScoreList: (state, action) => {
            state.scoreList = dealScore(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getScoreOverview.fulfilled, (state, action: {payload: any, type: any}) => {
                scoreSlice.caseReducers.setScoreOverview(state, {
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
export const selectScoreList = (state: RootState) => state.score.scoreList;

export const {setScoreOverview, initScoreList}  = scoreSlice.actions;

export default scoreSlice.reducer;
