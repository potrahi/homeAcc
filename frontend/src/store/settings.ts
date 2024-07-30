import { createSlice } from "@reduxjs/toolkit";

type SettingsState = {
  currency: string;
  monthlyBudget: number;
};

const initialState: SettingsState = {
  currency: "CZK",
  monthlyBudget: 0,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setCurrency(state, action) {
      state.currency = action.payload;
    },
    setMonthlyBudget(state, action) {
      state.monthlyBudget = action.payload;
    },
  },
});

export const settingsActions = settingsSlice.actions;

export default settingsSlice;
