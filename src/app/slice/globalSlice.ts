import {createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {diffDate} from "../../utils/tableUtils.ts";

interface InitialState {
    date: string,
    totalWeeks: number,
    termID: string,
    currentTime: string,
    isLogin: boolean,
    tokenIsValid: boolean,
}

const initialState: InitialState = {
    date: "",
    totalWeeks: 0,
    termID: "",
    currentTime: (new Date()).toString(),
    isLogin: true,
    tokenIsValid: false,
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setCalendar: (state, action) => {
            state.date = action.payload.start;
            state.termID = action.payload.termID;
            state.totalWeeks = action.payload.weeks;
        },
        setTermID: (state, action) => {
            state.termID = action.payload.termID;
        },
        resetCurrentTime: (state) => {
            state.currentTime = (new Date()).toString();
        },
        loginSuccessful: (state) => {
            state.isLogin = true;
            state.tokenIsValid = true;
        },
        logoutSuccessful: (state) => {
            state.isLogin = false;
            state.tokenIsValid = false;
        }
    },
})

export const selectFirstDate = (state: RootState) => state.global.date;
export const selectTotalWeeks = (state: RootState) => state.global.totalWeeks;
export const selectTerm = (state: RootState) => state.global.termID;
export const selectCurrentTime = (state: RootState) => state.global.currentTime;
export const selectIsLogin = (state: RootState) => state.global.isLogin;
export const selectTokenIsValid = (state: RootState) => state.global.tokenIsValid;

export const selectTheWeek = createSelector(
    [selectFirstDate, selectTotalWeeks, selectCurrentTime],
    (firstDate, totalWeeks, currentTime) => {
        if(firstDate === '' || totalWeeks === 0) return -1;

        const date = new Date(firstDate);
        const diff = diffDate(date, new Date(currentTime));

        if(diff < 0) return 1;
        else if(Math.floor(diff / 7) + 1 <= totalWeeks) return Math.floor(diff / 7) + 1;

        return totalWeeks;
    }
)

export const {setCalendar, setTermID, resetCurrentTime, loginSuccessful, logoutSuccessful} = globalSlice.actions;
export default globalSlice.reducer;
