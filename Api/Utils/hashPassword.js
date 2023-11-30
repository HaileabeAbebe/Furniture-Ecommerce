import CryptoJS from "crypto-js";
import dotenv from "dotenv";

dotenv.config();

// Helper function to hash the password using CryptoJS
export const hashPassword = (password) => {
  return CryptoJS.AES.encrypt(password, process.env.PASSWORD_SECRET).toString();
};

// Helper function to check if the provided password matches the hashed password
export const isPasswordMatch = (inputPassword, hashedPassword) => {
  const decryptedPassword = CryptoJS.AES.decrypt(
    hashedPassword,
    process.env.PASSWORD_SECRET
  ).toString(CryptoJS.enc.Utf8);
  return inputPassword === decryptedPassword;
};
