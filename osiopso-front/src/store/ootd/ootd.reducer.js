import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	ootdCategory: []
}

export const ootd = createSlice({
  name: "ootd",
  initialState,
  reducers: {
    selectOotdCategory(state, action) {
      state.ootdCategory = action.payload;
    },
    resetOotdCategory(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { selectOotdCategory, resetOotdCategory } = ootd.actions;
export default ootd.reducer