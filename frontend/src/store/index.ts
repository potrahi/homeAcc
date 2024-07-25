import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modal';
import spendingSlice from './spending';
import balanceSlice from './balance';

const store = configureStore({
    reducer: {
        modal: modalSlice.reducer,
        spending: spendingSlice.reducer,
        balance: balanceSlice.reducer
    }
})

export type RootState = ReturnType<typeof store.getState>

export default store;