import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  contentId: null,
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
    },
    setModalContent: (state, action) => {
      state.contentId = action.payload;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice;
