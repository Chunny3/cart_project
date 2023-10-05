import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductManagement = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [product, setProduct] = useState({
    image: "",
    name: "",
    price: 0,
  });

  const getProductById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`
      );
      console.log(response);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = () => {
    getProductById();
  };

  const handleChange = (e) => {
    setProductId(e.target.value);
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
    console.log(product);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
      alert("更新成功");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <br />
      <div style={{ textAlign: "center" }}>
        <h1>編輯產品</h1>
      </div>
      <br />
      <div style={{width:"350px",margin:"auto"}}>
        <div>
          <label htmlFor="productId" style={{ width: "80px" }}>
            產品ID :{" "}
          </label>
          <input
            type="text"
            id="productId"
            value={productId}
            placeholder="輸入產品id後搜尋"
            onChange={handleChange}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            搜尋
          </button>
        </div>
        <br />
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="image" style={{ width: "80px" }}>
              圖像URL :{" "}
            </label>
            <input
              type="text"
              id="image"
              name="image"
              value={product.image}
              onChange={handleProductChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="name" style={{ width: "80px" }}>
              產品名稱 :{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleProductChange}
            />
          </div>
          <br />
          <div>
            <label htmlFor="price" style={{ width: "80px" }}>
              產品價格 :{" "}
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={product.price}
              onChange={handleProductChange}
            />
          </div>
          <br />
          <button className="btn btn-primary" type="submit">
            更新產品
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductManagement;
