import Product from "../Models/Product.js";

export const addProduct = async (req, res) => {
  try {
    // Convert "price" to a number and "inStock" to a boolean
    const price = parseFloat(req.body.price);
    const inStock = req.body.inStock === "true";

    const picturePath = req.file?.path?.replace(/\\/g, "/") || "";
    req.body.img = picturePath;
    req.body.price = price; // Set the converted price
    req.body.inStock = inStock; // Set the converted inStock

    const newProduct = new Product(req.body);
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};

// GET PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    throw new Error(error);
  }
};

//GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  const getLatestQuery = req.query.new;
  const getCategoryQuery = req.query.category;
  try {
    let products;
    if (getLatestQuery) {
      products = await Product.find().sort({ createdAt: -1 }).limit(2);
    } else if (getCategoryQuery) {
      products = await Product.find({
        categories: {
          $in: [getCategoryQuery],
        },
      });
    } else products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json("error product cann't be fetched!");
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updateData = req.body;

    // Check if a new image file is being uploaded
    if (req.file) {
      // If a new file is uploaded, update the 'img' field with the new filename
      updateData.img = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: updateData,
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//DELETE
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (error) {
    throw new Error(error);
  }
};
