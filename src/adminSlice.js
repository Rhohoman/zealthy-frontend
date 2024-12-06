import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  page2Components: ["aboutMe"], 
  page3Components: ["address", "birthday"],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setPage2Components: (state, action) => {
      state.page2Components = action.payload;
    },
    setPage3Components: (state, action) => {
      state.page3Components = action.payload;
    },
  },
});

export const {
  setPage2Components,
  setPage3Components,
  resetPageComponents,
  addComponentToPage,
} = adminSlice.actions;

export const adminReducer = adminSlice.reducer;
