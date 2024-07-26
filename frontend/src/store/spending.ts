import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { SpendingType } from "../types/spending";

type SpendingState = {
    spendings: SpendingType[];
};

const initialState: SpendingState = {
    spendings: [{
        id: "1",
        name: "Alice",
        amount: 100,
        date: "2021-01-01T00:00:00"
    },
    {
        id: "2",
        name: "Bob",
        amount: 200,
        date: "2021-01-02T00:00:00"
    },
    {
        id: "3",
        name: "Charlie",
        amount: 300,
        date: "2021-01-03T00:00:00"
    },
    {
        id: "4",
        name: "David",
        amount: 400,
        date: "2021-01-04T00:00:00"
    },
    {
        id: "5",
        name: "Eve",
        amount: 500,
        date: "2021-01-05T00:00:00"
    },
    {
        id: "6",
        name: "Frank",
        amount: 600,
        date: "2021-01-06T00:00:00"
    },
    {
        id: "7",
        name: "Grace",
        amount: 700,
        date: "2021-01-07T00:00:00"
    },
    {
        id: "8",
        name: "Heidi",
        amount: 800,
        date: "2021-01-08T00:00:00"
    },
    {
        id: "9",
        name: "Ivan",
        amount: 900,
        date: "2021-01-09T00:00:00"
    },
    {
        id: "10",
        name: "Judy",
        amount: 1000,
        date: "2021-01-10T00:00:00"
    },
    {
        id: "11",
        name: "Kevin",
        amount: 1100,
        date: "2021-01-11T00:00:00"
    },
    {
        id: "12",
        name: "Linda",
        amount: 1200,
        date: "2021-01-12T00:00:00"
    },
    {
        id: "13",
        name: "Michael",
        amount: 1300,
        date: "2021-01-13T00:00:00"
    },
    {
        id: "14",
        name: "Nancy",
        amount: 1400,
        date: "2021-01-14T00:00:00"
    },
    {
        id: "15",
        name: "Oscar",
        amount: 1500,
        date: "2021-01-15T00:00:00"
    }]
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