import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	
  uploadImg: "https://pixlr.com/images/index/remove-bg.webp",
  isGallery : false,
  clothesTag: {
	category: null,
	url: null,
	closets:null,
	colors:null,
	seasons:null,
	tags:null,
  }
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
		},
		createTag(state, action){
			state.clothesTag = action.payload;
		},
		resetTag(state) {
			Object.assign(state.clothesTag, initialState.clothesTag);
		},

	}
})

export const { upload, checkLocal, createTag, resetTag } = clothes.actions;
export default clothes.reducer;