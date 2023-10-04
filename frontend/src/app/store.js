import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../features/authSlice";
import gedungReducer from "../features/gedungSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    gedung: gedungReducer
  },
});
