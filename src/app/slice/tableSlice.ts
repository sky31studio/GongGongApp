import Table from "../../components/timeTable/table.ts";
import {createAsyncThunk, createSelector, createSelectorCreator, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import Course from "../../components/timeTable/course.ts";
import {dealTable} from "../../utils/tableUtils.ts";
import {RootState} from "../store.ts";
import {useDispatch} from "react-redux";

const initialState = {
    table: new Table(), //TODO: 不应该把无法序列化的对象作为状态存入
    status: 'idle',
}

/**
 * 异步获取课程表数据，并转为Course[]
 */
export const fetchTableData = createAsyncThunk('table/fetchTableData', async () => {
    const data = await Resources.fetchClassData();
    return dealTable(data);
})

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        initTable: (state, action) => {
            state.table = new Table(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTableData.fulfilled, (state, action) => {
                state.status = 'idle';
                state.table = new Table(action.payload);
            })
            .addCase(fetchTableData.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTableData.rejected, (state, action) => {
                state.status = 'failed';
            })
    }
})

export const selectTable = (state: RootState) => state.table.table;

export const { initTable } = tableSlice.actions;
export default tableSlice.reducer;
