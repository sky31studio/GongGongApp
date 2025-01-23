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
    showedAgenda: any,
    selfChangedCount: number,
    examChangedCount: number,
}

const initialState: InitialState = {
    examList: [],
    selfList: [],
    showAddBoard: false,
    showedAgenda: null,
    selfChangedCount: 0,
    examChangedCount: 0,
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

        // AddBoard更新Agenda
        updateSelf: (state, action) => {
            for(let i = 0; i < state.selfList.length; i++) {
                if(state.selfList[i].id === action.payload.id) {
                    state.selfList[i] = action.payload;
                    return;
                }
            }
        },

        // AddBoard添加Agenda
        addSelf: (state, action) => {
            const id = generateID(action.payload.name, action.payload.startTime, action.payload.endTime);
            // 检查该项是否已经存在
            for (let exam of state.selfList) {
                // @ts-ignore
                if (exam.id === id) {
                    return;
                }
            }

            action.payload.id = id;
            state.selfList.push({...action.payload});
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

        setShowedAgenda: (state, action) => {
            state.showedAgenda = action.payload;
        },

        initExam: (state, action) => {
            const processedData = dealExams(action.payload);
            state.examList = processedData
                .filter((exam: any) => {
                    if(exam.startTime !== '') {
                        const currentTime = new Date(Date.now());
                        const date = new Date(exam.startTime);

                        if(currentTime.getTime() > date.getTime()) return false;
                    }

                    return true;
                })
                .map((exam: any) => {
                    const id = generateID(exam.name, exam.startTime, exam.endTime);

                    return {
                        id: id,
                        isCustom: false,
                        isOnTop: false,
                        ...exam
                    }
                })
            state.examList.sort(compare);
        },

        updateExamAgendaList: (state, action) => {
            let processedData = dealExams(action.payload);
            processedData = processedData.filter((exam: any) => {
                if(exam.startTime !== '') {
                    const currentTime = new Date(Date.now());
                    const date = new Date(exam.startTime);

                    if(currentTime.getTime() > date.getTime()) return false;
                }

                return true;
            })

            processedData.forEach((exam: any) => {
                const id = generateID(exam.name, exam.startTime, exam.endTime);
                for(let existExam of state.examList) {
                    if(existExam.id === id) {
                        return;
                    }
                }

                state.examList.push({
                    id: id,
                    isCustom: false,
                    isOnTop: false,
                    ...exam
                })
            });

            state.examList.sort(compare);
        },

        writeExamAgendaList: (state, action) => {
            state.examList = action.payload;
        },

        writeSelfAgendaList: (state, action) => {
            state.selfList = action.payload;
        },

        // 修改次数自增
        selfChangedCountIncrement: (state) => {
            state.selfChangedCount += 1;
        },

        examChangedCountIncrement: (state) => {
            state.examChangedCount += 1;
        },

        agendaResetAll: (state) => {
            state.examChangedCount = 0;
            state.examList = [];
        },
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
export const selectShowedAgenda = (state: RootState) => state.exam.showedAgenda;
export const selectSelfChangedCount = (state: RootState) => state.exam.selfChangedCount;
export const selectExamChangedCount = (state: RootState) => state.exam.examChangedCount;

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

        return right - left + 1;
    }
)

// 返回exam中只有考试标签的列表
export const selectOnlyExamList = createSelector(
    [selectExamList, selectSelfList],
    (examList, selfList) => {
        let res = examList.slice().concat(selfList);
        res.sort(compare);

        for (let i = 0; i < res.length; i++) {
            if (res[i].type !== 0) {
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
    updateSelf,
    addSelf,
    removeSelf,
    addExamToTop,
    removeExamFromTop,
    addSelfToTop,
    removeSelfFromTop,
    initExam,
    setShowedAgenda,
    writeExamAgendaList,
    writeSelfAgendaList,
    selfChangedCountIncrement,
    examChangedCountIncrement,
    agendaResetAll,
    updateExamAgendaList
} = agendaSlice.actions;
export default agendaSlice.reducer;


