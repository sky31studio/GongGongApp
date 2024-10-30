import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";
import Resources from "../../basic/Resources.ts";
import {diffDate} from "../../utils/tableUtils.ts";

interface InitialState {
    date: string,
    termID: string,
    bottomTabVisibility: boolean,
}

const initialState: InitialState = {
    date: "",
    termID: "",
    bottomTabVisibility: true,
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

export const selectTheWeek = createSelector(
    [selectFirstDate],
    (firstDate) => {
        const date = new Date(firstDate);
        const now = new Date();
        const diff = diffDate(date, now);

        return Math.floor(diff / 7) + 1;
    }
)

export const {setDate, setTermID, setBottomTabVisibility} = globalSlice.actions;
export default globalSlice.reducer;