import {configureStore} from "@reduxjs/toolkit";
import tableReducer from "./slice/tableSlice.ts"

export const store = configureStore({
    reducer: {
        table: tableReducer
    }
});

export type AppStore = typeof  store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;



