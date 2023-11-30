import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { router as authRoute } from "./Routes/auth.js";
import { router as userRoute } from "./Routes/user.js";
import { router as productRoute } from "./Routes/product.js";
import { router as cartRoute } from "./Routes/cart.js";
import { router as orderRoute } from "./Routes/order.js";
import { router as stripeRoute } from "./Routes/stripe.js";
import { router as distributionReport } from "./Routes/distribution.js";
import cors from "cors";
import morgan from "morgan";

dotenv.config();
const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.LOCAL_MONGO_URI)
  .then(() => console.log("DB Connection Successful"))
  .catch((err) => console.log(err.message));

app.use(cors());
app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/orders", orderRoute);
app.use("/api/carts", cartRoute);
app.use("/api/checkout", stripeRoute);
app.use("/api/distribution-report", distributionReport);
app.use((err, req, res, next) => res.status(401).json({ error: err.message }));
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${PORT}`);
});
