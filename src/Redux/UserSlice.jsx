import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState:"",  // better than {}

  reducers: {
    addUser: (state, action) => {
      return action.payload;
    },
    
    addfeed: (state, action) => {
      return action.payload;
    },
    removeUser: () => {
      return null;
    },
  },
});

export const { addUser, removeUser,addfeed } = userSlice.actions;
export default userSlice.reducer;
