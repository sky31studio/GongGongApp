import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";
import {dealScore, SingleScoreList} from "../../utils/scoreUtils.ts";

interface initialState {
    gpa: number;
    minorGpa: number;
    classRank: number;
    majorRank: number;
    averageScore: number;
    minorAverageScore: number;
    minorTotalCredit: number;
    minorCredit: number;
    scoreList: SingleScoreList[];
    minorScoreList: SingleScoreList[];
}

const initialState: initialState = {
    gpa: -1,
    minorGpa: -1,
    classRank: -1,
    majorRank: -1,
    averageScore: -1,
    minorAverageScore: -1,
    scoreList: [],
    minorScoreList: [],
    minorTotalCredit: 0,
    minorCredit: 0,
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

        setMinorScoreOverview: (state, action) => {
            state.minorTotalCredit = Number(action.payload.totalCredit[0]) || -1;
            state.minorCredit = Number(action.payload.totalCredit[1]) || -1;
            state.minorGpa = Number(action.payload.minorGpa) || -1;
            state.minorAverageScore = Number(action.payload.minorAverageScore) || -1;
        },

        initMinorScoreList: (state, action) => {
            state.minorScoreList = dealScore(action.payload);
        },

        initScoreList: (state, action) => {
            state.scoreList = dealScore(action.payload);
        },

        clearScore: (state) => {
            state.gpa = -1;
            state.classRank = -1;
            state.majorRank = -1;
            state.averageScore = -1;
            state.minorTotalCredit = -1;
            state.minorCredit = -1;
            state.scoreList = [];
            state.minorScoreList = [];
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
export const selectMinorScoreList = (state: RootState) => state.score.minorScoreList;
export const selectMinorTotalCredit = (state: RootState) => state.score.minorTotalCredit;
export const selectMinorCredit = (state: RootState) => state.score.minorCredit;
export const selectMinorGpa = (state: RootState) => state.score.minorGpa;
export const selectMinorAverageScore = (state: RootState) => state.score.minorAverageScore;

export const {
    setScoreOverview,
    initScoreList,
    clearScore,
    setMinorScoreOverview,
    initMinorScoreList
}  = scoreSlice.actions;

export default scoreSlice.reducer;
