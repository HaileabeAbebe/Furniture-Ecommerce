import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
    currentUser: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.currentUser = null;
    },
    getUsersStart: (state, action) => {
      state.isFetching = true;
      state.error = action.payload;
    },

    getUsersSucess: (state, action) => {
      state.isFetching = false;
      state.users = action.payload;
    },

    getUsersFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  getUsersStart,
  getUsersSucess,
  getUsersFailure,
} = userSlice.actions;
export default userSlice.reducer;
