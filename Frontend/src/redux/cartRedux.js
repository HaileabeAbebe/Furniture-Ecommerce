import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
    },
    removeProduct: (state, action) => {
      const productIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      );

      if (productIndex !== -1) {
        const removedProduct = state.products[productIndex];
        state.products.splice(productIndex, 1);
        state.quantity -= removedProduct.quantity;
        state.total -= removedProduct.price * removedProduct.quantity;
      }
    },
  },
});

export const { addProduct, removeProduct } = cartSlice.actions;
export default cartSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     products: [],
//     total: 0,
//     status: "idle", // add a status field to handle loading states
//     error: null, // add an error field to handle any errors
//   },
//   reducers: {
//     createCartStart: (state) => {
//       state.status = "loading";
//     },
//     createCartSuccess: (state, action) => {
//       state.status = "idle";
//       state.products = action.payload.products;
//       state.total = action.payload.total;
//     },
//     createCartFailure: (state, action) => {
//       state.status = "idle";
//       state.error = action.payload;
//     },
//     updateCartStart: (state) => {
//       state.status = "loading";
//     },
//     updateCartSuccess: (state, action) => {
//       state.status = "idle";
//       state.products = action.payload.products;
//       state.total = action.payload.total;
//     },
//     updateCartFailure: (state, action) => {
//       state.status = "idle";
//       state.error = action.payload;
//     },
//     getUserCartStart: (state) => {
//       state.status = "loading";
//     },
//     getUserCartSuccess: (state, action) => {
//       state.status = "idle";
//       state.products = action.payload.products;
//       state.total = action.payload.total;
//     },
//     getUserCartFailure: (state, action) => {
//       state.status = "idle";
//       state.error = action.payload;
//     },
//     getCartByIdStart: (state) => {
//       state.status = "loading";
//     },
//     getCartByIdSuccess: (state, action) => {
//       state.status = "idle";
//       state.products = action.payload.products;
//       state.total = action.payload.total;
//     },
//     getCartByIdFailure: (state, action) => {
//       state.status = "idle";
//       state.error = action.payload;
//     },
//     getAllCartsStart: (state) => {
//       state.status = "loading";
//     },
//     getAllCartsSuccess: (state, action) => {
//       // assuming the payload is an array of carts
//       // you might want to handle this differently depending on your needs
//       state.status = "idle";
//       // replace the current cart with the first one in the array
//       if (action.payload.length > 0) {
//         const firstCartInArray = action.payload[0];
//         state.products = firstCartInArray.products;
//         state.total = firstCartInArray.total;
//       }
//     },
//     getAllCartsFailure: (state, action) => {
//       state.status = "idle";
//       state.error = action.payload;
//     },
//     deleteCartStart: (state) => {
//       state.status = "loading";
//     },
//     deleteCartSuccess: (state) => {
//       // assuming you want to clear the cart on successful deletion
//       // you might want to handle this differently depending on your needs
//       state.status = "idle";
//       state.products = [];
//       state.total = 0;
//     },
//     deleteCartFailure: (state, action) => {
//       state.status = "idle";
//       state.error = action.payload;
//     },
//     updateProductQuantity: (state, action) => {
//       const { productId, type } = action.payload;
//       const productIndex = state.products.findIndex(
//         (product) => product._id === productId
//       );
//       if (productIndex !== -1) {
//         const product = state.products[productIndex];
//         if (type === "dec") {
//           product.quantity > 1 && product.quantity--;
//         } else {
//           product.quantity++;
//         }
//         state.total += product.price * (type === "dec" ? -1 : 1);
//       }
//     },
//   },
// });

// export const {
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
//   updateProductQuantity,
// } = cartSlice.actions;

// export default cartSlice.reducer;

// // import { createSlice } from "@reduxjs/toolkit";

// // const cartSlice = createSlice({
// //   name: "cart",
// //   initialState: {
// //     products: [],
// //     quantity: 0,
// //     total: 0,
// //   },
// //   reducers: {
// //     addProduct: (state, action) => {
// //       state.quantity += 1;
// //       state.products.push(action.payload);
// //       state.total += action.payload.price * state.quantity;
// //     },
// //     removeProduct: (state, action) => {
// //       const index = state.products.findIndex(
// //         (product) => product.id === action.payload.id
// //       );
// //       if (index !== -1) {
// //         const product = state.products[index];
// //         state.quantity -= 1;
// //         state.products.splice(index, 1);
// //         state.total -= product.price;
// //       }
// //     },
// //   },
// // });

// // export const { addProduct, removeProduct } = cartSlice.actions;
// // export default cartSlice.reducer;
