import { styled } from "styled-components";
import Product from "./Product";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Container = styled.div`
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2.5em;
  text-align: center;
  color: #333;
  margin: 20px 0;
  width: 100%;
`;

// eslint-disable-next-line react/prop-types, no-unused-vars
const Products = ({ cat, filters, sort, isHomePage }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      let res;
      try {
        if (cat) {
          res = await axios.get(
            `http://localhost:5000/api/products?category=${cat}`
          );
        } else {
          res = await axios.get("http://localhost:5000/api/products");
        }
        setProducts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        products.filter((product) => {
          if (filters) {
            return Object.entries(filters).every(([key, value]) =>
              product[key].includes(value)
            );
          }
          // If filters is undefined or null, return true to include all products
          return true;
        })
      );
  }, [cat, filters, sort, products]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);
  useEffect(() => {
    if (sort === "newest") {
      setProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setProducts((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setProducts((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {isHomePage && <Title>Latest Products</Title>}
      {cat
        ? filteredProducts.slice(0, isHomePage ? 8 : undefined).map((item) => (
            <Link to={`/product/${item._id}`} key={item._id}>
              <Product item={item} />
            </Link>
          ))
        : products.slice(0, isHomePage ? 8 : undefined).map((item) => (
            <Link to={`/product/${item._id}`} key={item._id}>
              <Product item={item} />
            </Link>
          ))}
    </Container>
  );
};

export default Products;
