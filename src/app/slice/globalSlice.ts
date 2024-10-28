import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

interface InitialState {
    date: string,
    termID: string,
}

const initialState = {
    date: "",
    termID: "",
}

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload.date;
        },
        setTermID: (state, action) => {
            state.termID = action.payload.termID;
        }
    }
})

export const selectFirstDate = (state: RootState) => state.global.date;
export const selectTerm = (state: RootState) => state.global.termID;

export default globalSlice.reducer;