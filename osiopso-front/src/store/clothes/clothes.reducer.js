import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	
  uploadImg: "https://pixlr.com/images/index/remove-bg.webp",
  isGallery : false,
};

export const clothes = createSlice({
	name: 'clothes',
	initialState,
	reducers: {
		upload(state, action) {
			state.uploadImg = action.payload;
		},
		checkLocal(state, action) {
			state.isGallery = action.payload;
		}
	}
})

export const { upload, checkLocal } = clothes.actions;
export default clothes.reducer;