import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("username", action.payload.username);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("username");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
