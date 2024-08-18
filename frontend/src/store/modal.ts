import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpendingType } from "../types/spending";

type ModalState = {
  isOpen: boolean;
  payload: SpendingType | null;
};

const initialState: ModalState = {
  isOpen: false,
  payload: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.payload = null;
    },
    setModalPayload: (state, action: PayloadAction<SpendingType>) => {
      state.payload = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
