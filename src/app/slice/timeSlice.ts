import {createSlice} from "@reduxjs/toolkit";


const initState = {
    lastTime: new Date(),
}

export const timeSlice = createSlice({
    name: 'lastTime',
    initialState: initState,
    reducers: {

    }
})