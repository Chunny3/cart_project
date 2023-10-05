import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createCart } from "./CartService";

const AddProductComponent = () => {
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const uid = sessionStorage.getItem("userId");

  useEffect(() => {
    if (id == 1) {
      setUserId(uid);
      setName("Apple");
      setPrice("20");
    } else if (id == 2) {
      setUserId(uid);
      setName("Lemon");
      setPrice("40");
    } else if (id == 3) {
      setUserId(uid);
      setName("Grape");
      setPrice("30");
    }
  }, [id]);

  const addCart = (e) => {
    e.preventDefault();
    const cart = { userId, id, name, price, quantity };

    createCart(id, cart)
      .then((response) => {
        console.log(cart);
        navigate("/cart");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            Add Product
            <div className="card-body">
              <form>
                <div className="form-group mb-2">
                  <label className="form-label"> 數量 :</label>
                  <input
                    type="text"
                    placeholder="Enter product number"
                    name="quantity"
                    className="form-control"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  ></input>
                </div>

                <button className="btn btn-success" onClick={(e) => addCart(e)}>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddProductComponent;
