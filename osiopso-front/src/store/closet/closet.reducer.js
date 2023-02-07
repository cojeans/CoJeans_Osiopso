import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closet: {
    name: "",
    isSelected: false,
  },
};

export const closet = createSlice({
  name: "closet",
  initialState,
  reducers: {
    createCloset(state, action) {
      state.closet = action.payload;
    },
    resetCloset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { createCloset, resetCloset } = closet.actions;
export default closet.reducer