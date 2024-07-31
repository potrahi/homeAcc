import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: string | null;
  isAuthenticated: boolean;
  user_id?: number;
};

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ user: string }>) {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
    setUserId(state, action: PayloadAction<{ user_id: string }>) {
      state.user_id = parseInt(action.payload.user_id);
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
