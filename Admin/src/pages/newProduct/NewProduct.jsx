import { useState } from "react";
import { Link } from "react-router-dom";
import "./newProduct.css";
import { useDispatch } from "react-redux";
import { addProduct } from "../../redux/apiCalls";
import { BsCheckLg } from "react-icons/bs";

export default function NewProduct() {
  const [inputs, setInputs] = useState({ inStock: true });
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("Grocery"); // Set the default value to "Grocery"
  const [submitted, setSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", inputs.title);
    formData.append("desc", inputs.desc);
    formData.append("price", parseFloat(inputs.price)); // Convert price to a number
    formData.append("quantity", parseFloat(inputs.quantity)); // Convert price to a number
    formData.append("inStock", inputs.inStock);
    formData.append("categories", `${cat}`);

    try {
      // Send the FormData to the server using the addProduct function
      await addProduct(formData, dispatch);
      setSubmitted(true);
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
          {file && (
            <img src={URL.createObjectURL(file)} alt="Product Preview" />
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
          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <select
            name="category"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            style={{ padding: "10px" }}
          >
            <option value="Pooltable" defaultValue>
              Pool Tables
            </option>
            <option value="Chair">Chair</option>
            <option value="Office-Chair">Office Chairs</option>
            <option value="Couch">Couch</option>
            <option value="Desk">Desk</option>
            <option value="Table">Table</option>
            <option value="Bed">Bed</option>
            <option value="Kitchen">Kitchen Cabinets</option>
          </select>
        </div>
        <div className="addProductItem">
          <label>InStock</label>
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
