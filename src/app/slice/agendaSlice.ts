import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";
import {dealExams, generateID} from "../../utils/agendaUtils.ts";

export const fetchExamData = createAsyncThunk('exam/fetchExamData', async () => {
    const data = await Resources.getExam();
    return dealExams(data);
})

export interface Agenda {
    id: string,
    name: string,
    text: string,
    startTime: string,
    endTime: string,
    location: string,
    types: number[],
}

/**
 * 内部分为考试和自定义两类
 */
interface InitialState {
    examList: Agenda[],
    selfList: Agenda[],
    showAddBoard: boolean,
}

const initialState: InitialState = {
    examList: [],
    selfList: [],
    showAddBoard: false,
}

const agendaSlice = createSlice({
    name: 'exam',
    initialState,
    reducers: {
        addExam: (state, action: { payload: Agenda, type: any }) => {
            const id = action.payload.id;
            // 检查该项是否已经存在
            for (let exam of state.examList) {
                if (exam.id === id) {
                    return;
                }
            }

            state.examList.push(action.payload);
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
            const id = generateID(action.payload.name, action.payload.startTime, action.payload.endTime);
            // 检查该项是否已经存在
            for (let exam of state.selfList) {
                // @ts-ignore
                if (exam.id === id) {
                    return;
                }
            }

            // @ts-ignore
            state.selfList.push({id: id, ...action.payload});
        },

        showAddBoard: (state) => {
            state.showAddBoard = true;
        },

        hideAddBoard: (state) => {
            state.showAddBoard = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamData.fulfilled, (state, action) => {
                for (let exam of action.payload) {
                    agendaSlice.caseReducers.addExam(state, {payload: exam, type: 'exam/addExam'});
                }
            })
    },
})

// exam和self的selector
export const selectExamList = (state: RootState) => state.exam.examList;
export const selectSelfList = (state: RootState) => state.exam.selfList;
export const selectShowAddBoard = (state: RootState) => state.exam.showAddBoard;

// 返回exam+self的总表(已排序)
export const selectAgendaList = createSelector(
    [selectExamList, selectSelfList],
    (examList, selfList) => {
        const res = examList.slice();
        res.concat(selfList);

        return res;
    }
);

// 返回exam中只有考试标签的列表
export const selectOnlyExamList = createSelector(
    [selectExamList, selectSelfList],
    (examList) => {
        const res = examList.slice();

        for (let i = 0; i < res.length; i++) {
            let isExam = false;
            for (let type of res[i].types) {
                if (type === 0) {
                    isExam = true;
                    break;
                }
            }

            if (!isExam) {
                res.splice(i, 1);
                i--;
            }
        }

        return res;
    }
);

export const selectExamLength = (state: RootState) => state.exam.examList.length;

export const {showAddBoard, hideAddBoard} = agendaSlice.actions;
export default agendaSlice.reducer;


