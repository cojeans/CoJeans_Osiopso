import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploadImg: "https://pixlr.com/images/index/remove-bg.webp",
};

export const clothes = createSlice({
	name: 'clothes',
	initialState,
	reducers: {
		upload(state, action) {
			state.uploadImg = action.payload;
		}
	}
})

export const { upload } = clothes.actions;
export default clothes.reducer