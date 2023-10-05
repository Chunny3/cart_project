import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updateCart } from "./CartService";

const UpdateProduct = () => {
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();
  const { cartId } = useParams();

  const upCart = (e) => {
    e.preventDefault();
    const newcart = { cartId, quantity };

    if (quantity > 0) {
      updateCart(cartId, newcart)
        .then((response) => {
          console.log(newcart);
          navigate("/cart");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("沒有數量，請輸入數量!");
    }
  };

  return (
    <div>
      <br />
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            Update Product
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

                <button className="btn btn-success" onClick={(e) => upCart(e)}>
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
export default UpdateProduct;
