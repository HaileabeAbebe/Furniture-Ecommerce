import User from "../Models/User.js";
import { hashPassword, isPasswordMatch } from "../Utils/hashPassword.js";

// GET ALL USERS
export const getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    return res.send(users);
  } catch (error) {
    res.status(500).json("An error occurred while fetching users");
  }
};

// GET USER BY ID
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user)
      return res
        .status(404)
        .send({ error: `User with ID: ${req.params.id} not found` });
    res.send({ data: user });
  } catch (error) {
    res.status(500).send({
      error: `An error occurred while fetching the user with ID: ${req.params.id}`,
    });
  }
};

// UPDATE USER
export const updateUser = async (req, res) => {
  const userId = req.params.id;
  const updatedData = req.body;

  try {
    // If the password has changed, encrypt the new password
    if (updatedData.password)
      updatedData.password = hashPassword(updatedData.password);

    // Get the current user data
    const currentUser = await User.findById(userId);

    // Check if purchaseLimit is being updated and if currentUser is not an admin
    if (updatedData.purchaseLimit && currentUser.role !== "admin") {
      return res
        .status(403)
        .json({ message: "Only admins can update purchase limit" });
    }

    // Update the user and make sure to only update the fields that are changed
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    throw new Error("User not updated");
  }
};

// DELETE USER
export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted!");
  } catch (error) {
    throw new Error(error);
  }
};

// GET USER STATISTICS
export const getUserStatistics = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ "I can't find the error": err });
  }
};

// import CryptoJS from "crypto-js";
// import User from "../Models/User.js";
// import { hashPassword } from "../Utils/hashPassword.js";

// //GET ALL USERS
// export const getUsers = async (req, res) => {
//   const query = req.query.new;
//   try {
//     const users = query
//       ? await User.find().sort({ _id: -1 }).limit(5)
//       : await User.find();
//     return res.send(users);
//   } catch (error) {
//     res.status(500).json("An error occured while fetching users");
//   }
// };

// export const getUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user)
//       return res
//         .status(404)
//         .send({ error: `User with ID: ${req.params.id} not found` });
//     res.send({ data: user });
//   } catch (error) {
//     res.status(500).send({
//       error: `An error occurred while fetching the user with ID: ${req.params.id}`,
//     });
//   }
// };

// export const updateUser = async (req, res) => {
//   const userId = req.params.id;
//   const updatedData = req.body;

//   try {
//     //if password changed encrypt the new password
//     if (updatedData.password)
//       updatedData.password = hashPassword(updatedData.password);

//     //update the user and make sure to only update the field that is changed
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { $set: updatedData },
//       {
//         new: true,
//       }
//     );
//     res.status(200).json(updatedUser);
//   } catch (error) {
//     throw new Error("user not updated");
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     const deletedUser = await User.findByIdAndDelete(req.params.id);
//     res.status(200).json("user has been deleted!");
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const getUserStatistics = async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

//   try {
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ "i can't find the error ": err });
//   }
// };
