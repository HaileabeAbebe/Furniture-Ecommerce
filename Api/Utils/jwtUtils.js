import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Function to create a new JWT
export const generateJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "3d" });
};

// Function to verify a JWT
export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
