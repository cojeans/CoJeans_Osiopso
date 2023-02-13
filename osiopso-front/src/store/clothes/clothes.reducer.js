import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	
  uploadImg: "https://pixlr.com/images/index/remove-bg.webp",
  isGallery : false,
  //   clothesTag: [],
  AutoTag: {
	category: '',
	colors:[]
  },
  
  clothesTag: {
	category: '',
	url: '',
	closets:[],
	colors:[],
	seasons:[],
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
		createAutoTag(state, action){
			state.AutoTag = action.payload;
		},
		createTag(state, action){
			state.clothesTag = action.payload;
		},
		resetTag(state) {
			Object.assign(state.clothesTag, initialState.clothesTag);
		},

	}
})

export const { upload, checkLocal, createAutoTag, createTag, resetTag } = clothes.actions;
export default clothes.reducer;