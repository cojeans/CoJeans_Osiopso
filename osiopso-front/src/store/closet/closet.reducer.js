import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const action = {
	postCloset: createAsyncThunk("POST/CLOSET", async () => {
		return axios({
      method: "post",
      url: "",
      data: {
        closetName: "Closet Create Test",
        email: "handleSubmit",
        isSelected: "true",
      },
    }).then((response) => response.data);
	})
}

const initialState = {
  closet: {
    closetName: "",
    isOpen: "false",
  },
};

export const closet = createSlice({
	name: 'closet',
	initialState,
	reducers: {
		createCloset(state, action) {
			state.closet.closetName = action.payload;
		}
	}
})

export const { createCloset } = closet.actions;
export default closet.reducer