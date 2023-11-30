import { publicRequest } from "../requestMethod";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerationStart,
  registrationSuccess,
  registrationFailed,
} from "../redux/userRedux";
// import {
//   createCartStart,
//   createCartSuccess,
//   createCartFailure,
//   updateCartStart,
//   updateCartSuccess,
//   updateCartFailure,
//   getUserCartStart,
//   getUserCartSuccess,
//   getUserCartFailure,
//   getCartByIdStart,
//   getCartByIdSuccess,
//   getCartByIdFailure,
//   getAllCartsStart,
//   getAllCartsSuccess,
//   getAllCartsFailure,
//   deleteCartStart,
//   deleteCartSuccess,
//   deleteCartFailure,
// } from "./cartRedux";

export const register = async (dispatch, user) => {
  try {
    dispatch(registerationStart());
    const res = await publicRequest.post("/auth/register", user);
    dispatch(registrationSuccess(res.data));
  } catch (error) {
    dispatch(registrationFailed(error.message));
  }
};
export const login = async (dispatch, user) => {
  try {
    dispatch(loginStart());
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

// CREATE CART
// export const createCart = async (dispatch, userId) => {
//   try {
//     dispatch(createCartStart());

//     // Check if a cart already exists for the user
//     console.log(userId);
//     const existingCartRes = await userRequest.get(`/cart/user/${userId}`);

//     if (existingCartRes.data) {
//       // If a cart exists, return it
//       dispatch(createCartSuccess(existingCartRes.data));
//     } else {
//       // If no cart exists, create a new one
//       const newCartRes = await userRequest.post("/cart", { userId });
//       dispatch(createCartSuccess(newCartRes.data));
//     }
//   } catch (error) {
//     dispatch(createCartFailure(error.message));
//   }
// };

// // UPDATE CART
// export const updateCart = async (dispatch, cartId, updatedCart) => {
//   try {
//     dispatch(updateCartStart());

//     // Update the cart
//     const res = await userRequest.put(`/cart/${cartId}`, updatedCart);

//     dispatch(updateCartSuccess(res.data));
//   } catch (error) {
//     dispatch(updateCartFailure(error.message));
//   }
// };

// export const getUserCart = async (dispatch, userId) => {
//   try {
//     dispatch(getUserCartStart());
//     const res = await userRequest.get(`/cart/user/${userId}`);
//     dispatch(getUserCartSuccess(res.data));
//   } catch (error) {
//     dispatch(getUserCartFailure(error.message));
//   }
// };

// export const getCartById = async (dispatch, cartId) => {
//   try {
//     dispatch(getCartByIdStart());
//     const res = await userRequest.get(`/cart/${cartId}`);
//     dispatch(getCartByIdSuccess(res.data));
//   } catch (error) {
//     dispatch(getCartByIdFailure(error.message));
//   }
// };

// export const getAllCarts = async (dispatch) => {
//   try {
//     dispatch(getAllCartsStart());
//     const res = await userRequest.get("/cart");
//     dispatch(getAllCartsSuccess(res.data));
//   } catch (error) {
//     dispatch(getAllCartsFailure(error.message));
//   }
// };

// export const deleteCart = async (dispatch, cartId) => {
//   try {
//     dispatch(deleteCartStart());
//     await userRequest.delete(`/cart/${cartId}`);
//     dispatch(deleteCartSuccess(cartId));
//   } catch (error) {
//     dispatch(deleteCartFailure(error.message));
//   }
// };
