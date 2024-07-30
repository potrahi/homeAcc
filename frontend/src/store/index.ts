import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modal";
import spendingSlice from "./spending";
import settingsSlice from "./settings";
import authSlice from "./auth";

const store = configureStore({
  reducer: {
    modal: modalSlice.reducer,
    spending: spendingSlice.reducer,
    settings: settingsSlice.reducer,
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
