import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  user: null,
  pendingEmail: null, // 🆕 for tracking OTP verification email
};

// Slice definition
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    clearAuthUser: (state) => {
      state.user = null;
    },
    setPendingEmail: (state, action) => {
      state.pendingEmail = action.payload;
    },
    clearPendingEmail: (state) => {
      state.pendingEmail = null;
    },
  },
});

// Export actions and reducer
export const {
  setAuthUser,
  clearAuthUser,
  setPendingEmail,
  clearPendingEmail,
} = authSlice.actions;

export default authSlice.reducer;
