import {
  getUsersFailure,
  getUsersStart,
  getUsersSucess,
  loginFailure,
  loginStart,
  loginSuccess,
} from "./userRedux";
import { publicRequest, userRequest } from "../requestMethods";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";

import {
  getReportsStart,
  getReportsSuccess,
  getReportsFailure,
  deleteReportStart,
  deleteReportSuccess,
  deleteReportFailure,
} from "./reportRedux";

// USER LOGIN
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure(err));
  }
};

// GET USERS
export const getUsers = async (dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await publicRequest.get("/users");
    dispatch(getUsersSucess(res.data));
  } catch (err) {
    dispatch(getUsersFailure(err));
  }
};

//ADD PRODUCT
export const addProduct = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
    return res.data; // Return the response data
  } catch (err) {
    dispatch(addProductFailure(err));
  }
};

// GET PRODUCTS
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure(err));
  }
};

//UPDATE PRODUCT
export const updateProduct = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // update
    const res = await userRequest.put(`/products/${id}`, product);
    setTimeout(() => {
      console.log("before api", res.data);
    }, 2000);
    dispatch(updateProductSuccess(res.data));
    console.log("after api", res.data);
  } catch (err) {
    dispatch(updateProductFailure(err));
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess());
  } catch (err) {
    dispatch(deleteProductFailure(err));
  }
};

// GET TRANSACTIONS
export const getDistributionReport = async (dispatch) => {
  dispatch(getReportsStart());
  try {
    const res = await publicRequest.get("distribution-report/");
    dispatch(getReportsSuccess(res.data));
  } catch (err) {
    dispatch(getReportsFailure(err));
  }
};
// DELETE TRANSACTIONS
export const deleteDistributionReport = async (id, dispatch) => {
  dispatch(deleteReportStart());
  try {
    const res = await userRequest.delete(`distribution-report/${id}`);
    dispatch(deleteReportSuccess());
  } catch (err) {
    dispatch(deleteReportFailure(err));
  }
};
