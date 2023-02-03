import { createSlice } from '@reduxjs/toolkit';


export const user = createSlice({
    name: "user",
    initialState: { value: {name: "", email: "", password: ""}},
    reducers: {
        login: (state, action) => {
            state.value = action.payload
        },
    },
});

export const { login } = user.actions;
export default user.reducer;
