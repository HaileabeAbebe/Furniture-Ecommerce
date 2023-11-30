import { createSlice } from "@reduxjs/toolkit";

export const distributionReportSlice = createSlice({
  name: "report",
  initialState: {
    reports: [],
    isFetching: false,
    error: null,
  },
  reducers: {
    // GET ALL
    getReportsStart: (state) => {
      state.isFetching = true;
    },
    getReportsSuccess: (state, action) => {
      state.isFetching = false;
      state.reports = action.payload;
    },
    getReportsFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload; // Store the error object
    },
    // DELETE
    deleteReportStart: (state) => {
      state.isFetching = true;
    },
    deleteReportSuccess: (state, action) => {
      state.isFetching = false;
      state.reports = state.reports.filter(
        (report) => report._id !== action.payload
      );
    },
    deleteReportFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // UPDATE
    updateReportStart: (state) => {
      state.isFetching = true;
    },
    updateReportSuccess: (state, action) => {
      state.isFetching = false;
      const updatedReports = state.reports.map((report) =>
        report._id === action.payload.id ? action.payload.report : report
      );
      state.reports = updatedReports;
    },
    updateReportFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    // ADD
    addReportStart: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    addReportSuccess: (state, action) => {
      state.isFetching = false;
      state.reports.push(action.payload);
    },
    addReportFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  getReportsStart,
  getReportsSuccess,
  getReportsFailure,
  deleteReportStart,
  deleteReportSuccess,
  deleteReportFailure,
  updateReportStart,
  updateReportSuccess,
  updateReportFailure,
  addReportStart,
  addReportSuccess,
  addReportFailure,
} = distributionReportSlice.actions;

export default distributionReportSlice.reducer;
