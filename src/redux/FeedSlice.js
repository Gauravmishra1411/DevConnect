import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState:null,  // better than {}

  reducers: {
     
    
    addFeed: (state, action) => {
      return action.payload;
    },
    removeFeed: () => {
      return null;
    },
  },
});

export const { removeFeed,addFeed } = feedSlice.actions;
export default feedSlice.reducer;