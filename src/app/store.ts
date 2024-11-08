import {configureStore} from "@reduxjs/toolkit";
import agendaReducer from "./slice/agendaSlice.ts"
import scheduleReducer from "./slice/scheduleSlice.ts"
import globalReducer from "./slice/globalSlice.ts"
import scoreReducer from "./slice/scoreSlice.ts"
import infoReducer from "./slice/infoSlice.ts"

export const store = configureStore({
    reducer: {
        exam: agendaReducer,
        schedule: scheduleReducer,
        global: globalReducer,
        score: scoreReducer,
        info: infoReducer,
    }
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



