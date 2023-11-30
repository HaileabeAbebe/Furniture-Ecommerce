import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { BsCheckLg } from "react-icons/bs";
import "./Product.css";

export default function NewProduct() {
  const [inputs, setInputs] = useState({ inStock: true });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // New state variable for the preview image
  const [cat, setCat] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);

    // Create a URL for the selected file to use in the image preview
    const url = URL.createObjectURL(e.target.files[0]);
    setPreview(url); // Update the preview image
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", inputs.title);
    formData.append("desc", inputs.desc);
    formData.append("price", parseFloat(inputs.price)); // Convert price to a number
    formData.append("inStock", inputs.inStock);
    formData.append("categories", cat.join(","));

    try {
      // Send the FormData to the server using the addProduct function
      await addProduct(formData, dispatch);
      setSubmitted(true);
      URL.revokeObjectURL(preview); // Revoke the data URL to free up memory
    } catch (error) {
      console.error("Error adding product: ", error);
    }
  };

  // Display a success message after form submission
  if (submitted) {
    return (
      <div className="newProduct">
        <h1 className="addProductTitle">New Product</h1>
        <div className="successMessage">
          Product added successfully <BsCheckLg fill="green" />
        </div>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
    );
  }

  // Display the form if not submitted
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm" encType="multipart/form-data">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={handleImageChange} />
          {preview && (
            <img src={preview} alt="Preview" style={{ width: "100px" }} />
          )}
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input
            name="title"
            type="text"
            placeholder="Apple Airpods"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <input
            name="desc"
            type="text"
            placeholder="description..."
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="jeans,skirts" onChange={handleCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock" id="inStock" onChange={handleChange}>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">
          Create
        </button>
      </form>
    </div>
  );
}
