import { createSlice } from "@reduxjs/toolkit";

type BalanceState = {
    balance: number;
};

const initialState: BalanceState = {
    balance: 0,
};

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        setBalance(state, action) {
            state.balance = action.payload;
        },
        addBalance(state, action) {
            state.balance += action.payload;
        },
        subtractBalance(state, action) {
            state.balance -= action.payload;
        }
    },
});

export const balanceActions = balanceSlice.actions;

export default balanceSlice;