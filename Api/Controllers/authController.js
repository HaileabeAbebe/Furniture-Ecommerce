import User from "../Models/User.js";
import { hashPassword, isPasswordMatch } from "../Utils/hashPassword.js";
import CryptoJS from "crypto-js";
import { generateJWT } from "../Utils/jwtUtils.js";

// REGISTER
export const registerUser = async (req, res) => {
  const {
    username,
    email,
    role,
    profilePicture,
    city,
    subCity,
    district,
    address,
    testimonialImage,
    testimonialApproved,
  } = req.body;

  try {
    // Create a new user with the provided data
    const userData = {
      username,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASSWORD_SECRET
      ).toString(),
      role,
      profilePicture,
      city,
      subCity,
      district,
      address,
      testimonialImage,
      testimonialApproved,
    };

    if (role !== "customer") {
      // Include purchaseLimit for roles other than 'customer'
      userData.purchaseLimit = req.body.purchaseLimit;
    }

    const newUser = await User.create(userData);

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//LOGIN
export const loginUser = async (req, res) => {
  const { username } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    let hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    );
    const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    console.log(orginalPassword, req.body.password);
    if (orginalPassword !== req.body.password) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = generateJWT({ id: user._id, isAdmin: user.isAdmin });

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// import User from "../Models/User.js";
// import CryptoJS from "crypto-js";
// import { generateJWT } from "../Utils/jwtUtils.js";

// //REGISTER
// export const registerUser = async (req, res) => {
//   const { username, email } = req.body;
//   try {
//     const newUser = await User.create({
//       username,
//       email,
//       password: CryptoJS.AES.encrypt(
//         req.body.password,
//         process.env.PASSWORD_SECRET
//       ).toString(),
//     });
//     res.status(201).json(newUser);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// //LOGIN
// export const loginUser = async (req, res) => {
//   const { username } = req.body;
//   try {
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     let hashedPassword = CryptoJS.AES.decrypt(
//       user.password,
//       process.env.PASSWORD_SECRET
//     );
//     const orginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
//     if (orginalPassword !== req.body.password) {
//       return res.status(400).json({ message: "invalid credentials" });
//     }

//     const token = generateJWT({ id: user._id, isAdmin: user.isAdmin });

//     const { password, ...others } = user._doc;

//     res.status(200).json({ ...others, token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
