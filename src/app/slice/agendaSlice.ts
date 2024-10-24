import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";
import {generateID} from "../../utils/agendaUtils.ts";

export const fetchExamData = createAsyncThunk('exam/fetchExamData', async () => {
    const data = await Resources.getExam();
    return data;
})

export interface Agenda {
    id: string,
    name: string,
    text?: string,
    time: number[],
    location: string,
    types: number[],
}

const agendaSlice = createSlice({
    name: 'exam',
    initialState: {
        examList: [{id: '123', name: 'Test', time: [2024, 10, 12, 12, 0, 4], location: '逸夫楼412', types: [0]}],
        selfList: [],
    },
    reducers: {
        addExam: (state, action) => {
            const id = generateID(action.payload.name, action.payload.time);
            // 检查该项是否已经存在
            for (let exam of state.examList) {
                if (exam.id === id) {
                    return;
                }
            }

            state.examList.push({id: id, ...action.payload});
            state.examList.sort(compare);
        },

        removeExam: (state, action) => {
            for (let exam of state.examList) {
                if (exam.id === action.payload) {
                    state.examList.splice(state.examList.indexOf(exam), 1);
                    return;
                }
            }
        },

        addSelfExam: (state, action) => {
            const id = generateID(action.payload.name, action.payload.time);
            // 检查该项是否已经存在
            for (let exam of state.selfList) {
                // @ts-ignore
                if (exam.id === id) {
                    return;
                }
            }

            // @ts-ignore
            state.selfList.push({id: id, ...action.payload});
            state.selfList.sort(compare);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamData.fulfilled, (state, action) => {

            })
    },
})

// Agenda的比较函数，因为存在没有时间的Agenda，需要特殊判断
const compare = (a: Agenda, b: Agenda) => {
    const at = a.time;
    const bt = b.time;

    if (at === undefined) {
        return -1;
    }

    if (bt === undefined) {
        return 1;
    }

    return at[0] - bt[0] || at[1] - bt[1] || at[2] - bt[2] || at[3] - bt[3] || at[4] - bt[4];
}

// exam和self的selector
export const selectExamList = (state: RootState) => state.exam.examList;
export const selectSelfList = (state: RootState) => state.exam.selfList;

// 返回exam+self的总表(已排序)
export const selectAgendaList = createSelector(
    [selectExamList, selectSelfList],
    (examList, selfList) => {
        const res = examList.slice();
        res.concat(selfList);
        res.sort(compare);

        return res;
    }
)
// 返回exam列表(已排序)
export const selectOnlyExamList = createSelector(
    [selectExamList],
    (examList) => {
        const res = examList.slice();
        res.sort(compare);

        return res;
    }
)

export default agendaSlice.reducer;


