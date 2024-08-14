import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SpendingType } from "../types/spending";

interface ModalState {
  isOpen: boolean;
  contentId: string | null;
  payload: SpendingType | null;
}

const initialState: ModalState = {
  isOpen: false,
  contentId: null,
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
      state.contentId = null;
      state.payload = null;
    },
    setModalContent: (state, action: PayloadAction<string | null>) => {
      state.contentId = action.payload;
    },
    setModalPayload: (state, action: PayloadAction<SpendingType | null>) => {
      state.payload = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
