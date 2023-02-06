import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closet: {
    closetName: "",
    isSelected: false,
    email: "testId@gmail.com",
  },
};

export const closet = createSlice({
	name: 'closet',
	initialState,
	reducers: {
		createCloset(state, action) {
			state.closet = action.payload
		}
	}
})

export const { createCloset } = closet.actions;
export default closet.reducer