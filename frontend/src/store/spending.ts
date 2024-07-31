import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SpendingType } from "../types/spending";

type SpendingState = {
  spendings: SpendingType[];
};

const initialState: SpendingState = {
  spendings: [],
};

const spendingSlice = createSlice({
  name: "spending",
  initialState,
  reducers: {
    setSpendings(state, action: PayloadAction<SpendingType[]>) {
      state.spendings = action.payload;
    },
    addSpendings(state, action: PayloadAction<SpendingType>) {
      state.spendings.push(action.payload);
    },
    deleteSpendings(state, action: PayloadAction<string>) {
      state.spendings = state.spendings.filter(
        (item) => item.id !== action.payload
      );
    },
    updateSpendings(state, action: PayloadAction<SpendingType>) {
      const index = state.spendings.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.spendings[index] = action.payload;
      }
    },
  },
});

export const spendingActions = spendingSlice.actions;

export default spendingSlice;
