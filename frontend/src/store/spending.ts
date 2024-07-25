import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SpendingType } from "../types/spending";

type SpendingState = {
    spendings: SpendingType[];
};

const initialState: SpendingState = {
    spendings: []
};

const spendingSlice = createSlice({
    name: "spending",
    initialState,
    reducers: {
        setSpend(state, action: PayloadAction<SpendingType[]>) {
            state.spendings = action.payload;
        },
        addSpend(state, action: PayloadAction<SpendingType>) {
            state.spendings.push(action.payload);
        },
        deleteSpend(state, action: PayloadAction<string>) {
            state.spendings = state.spendings.filter((item) => item.id !== action.payload);
        },
        updateSpend(state, action: PayloadAction<SpendingType>) {
            const index = state.spendings.findIndex((item) => item.id === action.payload.id);
            if (index !== -1) {
                state.spendings[index] = action.payload;
            }
        }
    }
});

export const spendingActions = spendingSlice.actions;

export default spendingSlice;