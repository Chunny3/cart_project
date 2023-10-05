import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllProduct();
  }, []);

  const getAllProduct = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/products`);
      console.log(response);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const editProduct = () => {
    navigate("/products/edit");
  };

  const removeProduct = (id) => {
    deleteProduct(id);
    alert("刪除成功");
    window.location.reload();
  };
  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <br />
      <div style={{ textAlign: "center" }}>
        <h1>產品列表</h1>
      </div>
      <br />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>圖像</th>
            <th>產品名稱</th>
            <th>價格</th>
            <th>移除</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ width: "30%" }}>
                <img src={product.image} alt={product.name} width="150px" />
              </td>
              <td style={{ width: "30%" }}>{product.name}</td>
              <td style={{ width: "20%" }}>{product.price}</td>
              <td style={{ width: "20%" }}>
                <button
                  className="btn btn-danger"
                  onClick={() => removeProduct(product.id)}
                >
                  移除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <br/><br/>
        <button className="btn btn-primary" onClick={() => editProduct()}>
          編輯產品
        </button>
      </table>
    </div>
  );
};

export default ProductList;
