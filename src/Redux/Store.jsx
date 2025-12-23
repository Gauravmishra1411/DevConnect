import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice";
import FeedSlice from "./FeedSlice"
export const store = configureStore({
  reducer: {
    user: userSlice,
    feed:FeedSlice
    
  }
});
