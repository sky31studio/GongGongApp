import {createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import {diffDate} from "../../utils/tableUtils.ts";

interface InitialState {
    date: string,
    termID: string,
    currentTime: string,
    isLogin: boolean,
    tokenIsValid: boolean,
}

const initialState: InitialState = {
    date: "",
    termID: "",
    currentTime: (new Date()).toString(),
    isLogin: true,
    tokenIsValid: false,
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload.start;
            state.termID = action.payload.termID;
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
export const selectTerm = (state: RootState) => state.global.termID;
export const selectCurrentTime = (state: RootState) => state.global.currentTime;
export const selectIsLogin = (state: RootState) => state.global.isLogin;
export const selectTokenIsValid = (state: RootState) => state.global.tokenIsValid;

export const selectTheWeek = createSelector(
    [selectFirstDate, selectCurrentTime],
    (firstDate, currentTime) => {
        if(!firstDate) return -1;

        const date = new Date(firstDate);
        const diff = diffDate(date, new Date(currentTime));

        return Math.floor(diff / 7) + 1;
    }
)

export const {setDate, setTermID, resetCurrentTime, loginSuccessful, logoutSuccessful} = globalSlice.actions;
export default globalSlice.reducer;
