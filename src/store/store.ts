import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./features/tasksSlice";
import usersReducer from "./features/usersSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type StoreStatusType = "idle" | "loading" | "success" | "failed";
