import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "store/slices/accountSlice";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});
