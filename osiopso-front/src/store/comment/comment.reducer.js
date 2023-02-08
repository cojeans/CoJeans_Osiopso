import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    comment: {

    }
}

export const comment = createSlice({
    name:'comment',
    initialState,
    reducers: {
        createComment(state, action) {
            state.comment = action.payload
        }
    }
})