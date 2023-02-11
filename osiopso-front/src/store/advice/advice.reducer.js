import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    advice: {

    }
}

export const advice = createSlice({
    name:'advice',
    initialState,
    reducers: {
        createAdvice(state, action) {
            state.advice = action.payload
        }
    }
})