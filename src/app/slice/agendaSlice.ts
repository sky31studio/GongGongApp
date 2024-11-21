import {createAsyncThunk, createSelector, createSlice} from "@reduxjs/toolkit";
import Resources from "../../basic/Resources.ts";
import {RootState} from "../store.ts";
import {dealExams, generateID} from "../../utils/agendaUtils.ts";
import {selectCurrentTime} from "./globalSlice.ts";

export const fetchExamData = createAsyncThunk('exam/fetchExamData', async (token: string) => {
    const response = await Resources.getExam(token);
    return response.data;
})

export interface Agenda {
    id: string,
    name: string,
    text: string,
    startTime: string,
    endTime: string,
    location: string,
    type?: number,
    isCustom: boolean,
    isOnTop: boolean,
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
        // addExam: (state, action: { payload: Agenda, type: any }) => {
        //     const id = action.payload.id;
        //     // 检查该项是否已经存在
        //     for (let exam of state.examList) {
        //         if (exam.id === id) {
        //             return;
        //         }
        //     }
        //
        //     state.examList.push(action.payload);
        //     state.examList.sort(compare);
        // },
        // removeExam: (state, action) => {
        //     for (let exam of state.examList) {
        //         if (exam.id === action.payload) {
        //             state.examList.splice(state.examList.indexOf(exam), 1);
        //             return;
        //         }
        //     }
        // },
        addSelf: (state, action) => {
            const id = generateID(action.payload.name, action.payload.startTime, action.payload.endTime);
            // 检查该项是否已经存在
            for (let exam of state.selfList) {
                // @ts-ignore
                if (exam.id === id) {
                    return;
                }
            }

            state.selfList.push({id: id, ...action.payload});
            state.selfList.sort(compare);
        },

        removeSelf: (state, action) => {
            for(let self of state.selfList) {
                if(self.id === action.payload) {
                    state.selfList.splice(state.selfList.indexOf(self), 1);
                    return;
                }
            }
        },

        addExamToTop: (state, action) => {
            for (let exam of state.examList) {
                if (exam.id === action.payload) {
                    exam.isOnTop = true;
                    state.examList.sort(compare);
                    return;
                }
            }
        },

        removeExamFromTop: (state, action) => {
            for (let exam of state.examList) {
                if (exam.id === action.payload) {
                    exam.isOnTop = false;
                    state.examList.sort(compare);
                    return;
                }
            }
        },

        addSelfToTop: (state, action) => {
            for (let self of state.selfList) {
                if (self.id === action.payload) {
                    self.isOnTop = true;
                    state.selfList.sort(compare);
                    return;
                }
            }
        },

        removeSelfFromTop: (state, action) => {
            for (let self of state.selfList) {
                if (self.id === action.payload) {
                    self.isOnTop = false;
                    state.selfList.sort(compare);
                    return;
                }
            }
        },

        showAddBoard: (state) => {
            state.showAddBoard = true;
        },

        hideAddBoard: (state) => {
            state.showAddBoard = false;
        },

        initExam: (state, action) => {
            const processedData = dealExams(action.payload);
            state.examList = processedData.map((exam: any) => {
                const id = generateID(exam.name, exam.startTime, exam.endTime);
                return {
                    id: id,
                    isCustom: false,
                    isOnTop: false,
                    ...exam
                }
            })
            state.examList.sort(compare);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchExamData.fulfilled, (state, action) => {
                agendaSlice.caseReducers.initExam(state, action.payload)
            })
    },
})

const compare = (a: Agenda, b: Agenda): number => {
    let aIsTop = a.isOnTop;
    let bIsTop = b.isOnTop;

    if (b.startTime === '' || aIsTop && !bIsTop) {
        return -1;
    }

    if (a.startTime === '' || !aIsTop && bIsTop) {
        return 1;
    }

    const aStartTime = new Date(a.startTime);
    const bStartTime = new Date(b.startTime);

    return aStartTime.getTime() - bStartTime.getTime();
}

// exam和self的selector
export const selectExamList = (state: RootState) => state.exam.examList;
export const selectSelfList = (state: RootState) => state.exam.selfList;
export const selectShowAddBoard = (state: RootState) => state.exam.showAddBoard;
export const selectExamLength = (state: RootState) => state.exam.examList.length;

// 返回exam+self的总表(已排序)
export const selectAgendaList = createSelector(
    [selectExamList, selectSelfList],
    (examList, selfList) => {
        let res = examList.slice();
        res = res.concat(selfList);

        res.sort(compare);
        return res;
    }
);

export const selectCurrentAgendaNumber = createSelector(
    [selectExamList, selectSelfList, selectCurrentTime],
    (examList, selfList, currentTime) => {
        let list = examList.slice();
        list = list.concat(selfList);
        list.sort(compare);

        let left = 0, right = list.length - 1;
        for(let i = 0; i < list.length; i++) {
            if (new Date(list[i].startTime) > new Date(currentTime)) {
                left = i;
                break;
            }
        }

        for(let i = list.length - 1; i >= 0; i--) {
            if(list[i].startTime !== '') {
                right = i;
                break;
            }
        }

        return right - left + 1;
    }
)

// 返回exam中只有考试标签的列表
export const selectOnlyExamList = createSelector(
    [selectExamList, selectSelfList],
    (examList) => {
        const res = examList.slice();

        for (let i = 0; i < res.length; i++) {
            if (res[i].isCustom) {
                res.splice(i, 1);
                i--;
            }
        }

        return res;
    }
);


export const {
    showAddBoard,
    hideAddBoard,
    addSelf,
    removeSelf,
    addExamToTop,
    removeExamFromTop,
    addSelfToTop,
    removeSelfFromTop,
    initExam,
} = agendaSlice.actions;
export default agendaSlice.reducer;


