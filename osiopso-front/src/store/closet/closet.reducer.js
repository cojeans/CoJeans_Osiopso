import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  closet: {
    name: "",
    isSelected: false,
  },

  closetList: []
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
    uploadClosetList(state, action) {
      state.closetList = action.payload;
    }
  },
});

export const { createCloset, resetCloset, uploadClosetList } = closet.actions;
export default closet.reducer