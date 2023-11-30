import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    registeredUser: "",
    isRegistering: false,
    registrationError: null,
    user: null,
    isFetching: false,
    isLoggedIn: false,
    error: null,
  },
  reducers: {
    registerationStart: () => {},
    registrationSuccess: (state, action) => {
      console.log("inside redux" + action.payload);
      state.registeredUser = action.payload;
    },
    registrationFailed: (state, action) => {
      state.registrationError = action.payload;
    },
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isLoggedIn = true;
      state.isFetching = false;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.isLoggedIn = false;
      state.isFetching = false;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  registerationStart,
  registrationSuccess,
  registrationFailed,
} = userSlice.actions;
export default userSlice.reducer;
