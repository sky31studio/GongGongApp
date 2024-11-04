import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import Resources from "../../basic/Resources.ts";
import {diffDate} from "../../utils/tableUtils.ts";

interface InitialState {
    date: string,
    termID: string,
    bottomTabVisibility: boolean,
    currentTime: string,
}

const initialState: InitialState = {
    date: "",
    termID: "",
    bottomTabVisibility: true,
    currentTime: (new Date()).toString(),
}

export const getFirstDate = createAsyncThunk('exam/getFirstDate', async () => {
    return await Resources.getFirstDate();
})

const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        setDate: (state, action) => {
            state.date = action.payload.date;
        },
        setTermID: (state, action) => {
            state.termID = action.payload.termID;
        },
        setBottomTabVisibility: (state, action) => {
            state.bottomTabVisibility = action.payload;
        },
        resetCurrentTime: (state) => {
            state.currentTime = (new Date()).toString();
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFirstDate.fulfilled, (state, action) => {
                state.date = action.payload.start;
                state.termID = action.payload.term_id;
            })
    }
})

export const selectFirstDate = (state: RootState) => state.global.date;
export const selectTerm = (state: RootState) => state.global.termID;
export const selectBottomTabVisibility = (state: RootState) => state.global.bottomTabVisibility;
export const selectCurrentTime = (state: RootState) => state.global.currentTime;

export const selectTheWeek = createSelector(
    [selectFirstDate, selectCurrentTime],
    (firstDate, currentTime) => {
        if(!firstDate) return -1;

        const date = new Date(firstDate);
        const diff = diffDate(date, new Date(currentTime));

        return Math.floor(diff / 7) + 1;
    }
)

export const {setDate, setTermID, setBottomTabVisibility, resetCurrentTime} = globalSlice.actions;
export default globalSlice.reducer;
