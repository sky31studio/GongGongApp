import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";
import {dealScore, SingleScoreList} from "../../utils/scoreUtils.ts";

// TODO: 需要统一移动到overview字段中
interface initialState {
    scoreList: SingleScoreList[];
    minorScoreList: SingleScoreList[];
    overview: {
        compulsoryOverview: {
            gpa: number;
            classRank: number;
            majorRank: number;
            averageScore: number;
        },
        wholeOverview: {
            gpa: number;
            classRank: number;
            majorRank: number;
            averageScore: number;
        },
        minorOverview: {
            averageScore: number;
            totalCredit: number;
            credit: number;
            gpa: number;
        }
    };
}

const initialState: initialState = {
    scoreList: [],
    minorScoreList: [],
    overview: {
        compulsoryOverview: {
            gpa: -1,
            classRank: -1,
            majorRank: -1,
            averageScore: -1,
        },
        wholeOverview: {
            gpa: -1,
            classRank: -1,
            majorRank: -1,
            averageScore: -1,
        },
        minorOverview: {
            averageScore: -1,
            totalCredit: -1,
            credit: -1,
            gpa: -1,
        }
    }
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
            state.overview.wholeOverview.gpa = action.payload.gpa || -1;
            state.overview.wholeOverview.classRank = action.payload.class_rank || -1;
            state.overview.wholeOverview.majorRank = action.payload.major_rank || -1;
            state.overview.wholeOverview.averageScore = action.payload.average_score || -1;
        },

        setCompulsoryScoreOverview: (state, action) => {
            state.overview.compulsoryOverview.gpa = action.payload.gpa || -1;
            state.overview.compulsoryOverview.classRank = action.payload.class_rank || -1;
            state.overview.compulsoryOverview.majorRank = action.payload.major_rank || -1;
            state.overview.compulsoryOverview.averageScore = action.payload.average_score || -1;
        },

        setMinorScoreOverview: (state, action) => {
            state.overview.minorOverview.averageScore = Number(action.payload.minorAverageScore) || -1;
            state.overview.minorOverview.totalCredit = Number(action.payload.totalCredit[0]) || -1;
            state.overview.minorOverview.credit = Number(action.payload.totalCredit[1]) || -1;
            state.overview.minorOverview.gpa = Number(action.payload.minorGpa) || -1;
        },

        initMinorScoreList: (state, action) => {
            state.minorScoreList = dealScore(action.payload);
        },

        initScoreList: (state, action) => {
            state.scoreList = dealScore(action.payload);
        },

        clearScore: (state) => {
            state.overview = {
                compulsoryOverview: {
                    gpa: -1,
                    classRank: -1,
                    majorRank: -1,
                    averageScore: -1,
                },
                wholeOverview: {
                    gpa: -1,
                    classRank: -1,
                    majorRank: -1,
                    averageScore: -1,
                },
                minorOverview: {
                    averageScore: -1,
                    totalCredit: -1,
                    credit: -1,
                    gpa: -1,
                }
            }
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

export const selectScoreList = (state: RootState) => state.score.scoreList;
export const selectMinorScoreList = (state: RootState) => state.score.minorScoreList;
export const selectOverview = (state: RootState) => state.score.overview;

export const {
    setScoreOverview,
    setCompulsoryScoreOverview,
    initScoreList,
    clearScore,
    setMinorScoreOverview,
    initMinorScoreList
}  = scoreSlice.actions;

export default scoreSlice.reducer;
