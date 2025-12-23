 import { createSlice } from "@reduxjs/toolkit";

const reqSlice = createSlice({
  name: "reqrecived",
  initialState: null,

  reducers: {
    addreq: (state, action) => {
      return action.payload;
    },

    removereq: () => {
      return null;
    },
  },
});

export const { addreq, removereq } = reqSlice.actions;
export default reqSlice.reducer;
