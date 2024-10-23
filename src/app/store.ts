import {configureStore} from "@reduxjs/toolkit";
import agendaReducer from "./slice/agendaSlice.ts"
import scheduleReducer from "./slice/scheduleSlice.ts"

export const store = configureStore({
    reducer: {
        exam: agendaReducer,
        schedule: scheduleReducer
    }
});

export type AppStore = typeof  store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



