// store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import requestsReducer from "./requestsSlice";

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
