import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import customersSlice from "./customers";

const store = configureStore({
  reducer: {
    customers: customersSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
