import Cart from "../Models/Cart.js";

// CREATE CART
export const createCart = async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.body.userId });

    if (existingCart)
      return res
        .status(400)
        .json({ message: "A cart already exist for this user" });

    //Create new cart
    const newCart = await Cart.create(req.body);
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

//UPDATE CART
export const updateCart = async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// DELETE CART
export const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Successfully deleted!");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET ALL CART
export const getAllCarts = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while retrieving the carts" });
  }
};

// GET ONE CART
export const getCartById = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartId);
    if (!cart)
      return res.status(404).json({ message: "No cart found with this ID" });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// GET USER CART
export const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart)
      return res.status(404).json({ message: "No cart for this user" });
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json(
        { message: "An error occurred while retrieving the user's cart" } +
          error.message
      );
  }
};
