import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice/todoSlice";
const rootReducer = {
  todo: todoReducer,
};
export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});
export const dispatch = store.dispatch;
