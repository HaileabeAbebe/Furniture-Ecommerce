import mongoose from "mongoose";

const CartSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        price: { type: Number },
        image: { type: String },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    totalPrice: { type: Number, default: 0 },
    status: { type: String, default: "active" }, // other status values might be 'checked-out', 'abandoned' etc.
  },
  { timestamps: true }
);
export default mongoose.model("Cart", CartSchema);

// import mongoose from "mongoose";

// const CartSchema = new mongoose.Schema(
//   {
//     userId: { type: String, require: true },
//     products: [
//       {
//         productId: { type: String },
//         quantity: {
//           type: Number,
//           default: 1,
//         },
//       },
//     ],
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Cart", CartSchema);
