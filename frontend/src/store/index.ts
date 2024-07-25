import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modal';
import spendingSlice from './spending';

const store = configureStore({
    reducer: { modal: modalSlice.reducer, spending: spendingSlice.reducer }
})

export type RootState = ReturnType<typeof store.getState>

export default store;