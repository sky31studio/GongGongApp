import {configureStore} from "@reduxjs/toolkit";
import tableReducer from "./slice/tableSlice.ts"
import agendaReducer from "./slice/agendaSlice.ts"

export const store = configureStore({
    reducer: {
        table: tableReducer,
        exam: agendaReducer,
    }
});

export type AppStore = typeof  store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



