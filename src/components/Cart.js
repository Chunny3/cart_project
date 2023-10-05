import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  listCarts,
  deleteCart,
  createBuy,
  deleteAllCart,
  updateCart,
  deleteAllBuy,
  listBuys,
} from "./CartService";
import Title from "./Title";


const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [checkbox, setCheckbox] = useState("");
  const [total, setTotal] = useState(0);
  const [buys, setBuys] = useState([]);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("userId");

  useEffect(() => {
    getAllCarts();
  }, []);

  const getAllCarts = () => {
    listCarts(uid)
      .then((response) => {
        setCarts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllBuys = () => {
    listBuys(uid)
      .then((response) => {
        setBuys(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const check = () => {
    for (var i = 0, t = 0; i < carts.length; i++) {
      if (carts[i].checkbox) t = t + carts[i].price * carts[i].quantity;
    }
    setTotal(t);
    console.log(total);
  };

  const checkA = (e) => {
    setCheckbox(e.target.checked);
    for (var i = 0, t = 0; i < carts.length; i++) {
      carts[i].checkbox = e.target.checked;
      if (carts[i].checkbox) t = t + carts[i].price * carts[i].quantity;
    }
    setTotal(t);
    console.log(total);
  };

  const deleteC = (cartId) => {
    if (!window.confirm("確定要刪除這項商品嗎?")) {
      getAllCarts();
    } else {
      deleteCart(cartId)
        .then((response) => {
          getAllCarts();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteAllC = () => {
    const a = carts.filter((cart) => cart.checkbox).map((cart) => cart.cartId);
    console.log(a);

    if (a.length === 0) {
      alert("請勾選想要刪除的商品");
    } else {
      if (!window.confirm("確定要刪除這些商品嗎?")) {
        getAllCarts();
      } else {
        deleteAllCart(a)
          .then((response) => {
            getAllCarts();
          })
          .catch((error) => {
            console.log(error);
          });
        setCheckbox(false);
        console.log(carts);
      }
    }
  };

  const buy = () => {
    const a = carts.filter((cart) => cart.checkbox);
    console.log(a);
    if (a.length === 0) {
      alert("請選擇要購買的購物車項目");
      return;
    }
    getAllBuys();
    if (buys.length !== null) {
      deleteAllBuy();
    }

    createBuy(a)
      .then((response) => {
        navigate("/buy");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const upBtn = (cartId, quantity) => {
    const newQuantity = quantity + 1;
    console.log(cartId);
    updateCart(cartId, { quantity: newQuantity })
      .then((response) => {
        console.log(quantity);
        getAllCarts();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const minBtn = (cartId, quantity) => {
    const newQuantity =
      quantity > 1
        ? quantity - 1
        : deleteCart(cartId)
            .then((response) => {
              getAllCarts();
            })
            .catch((error) => {
              console.log(error);
            });
    console.log(cartId);
    updateCart(cartId, { quantity: newQuantity })
      .then((response) => {
        console.log(quantity);
        getAllCarts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <br />
      <Title mainTitle="購物車" />
      <br />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col" style={{ width: "15%" }}>
              <input
                type="checkbox"
                id="fname1"
                name="fname1"
                checked={checkbox}
                onChange={(e) => checkA(e)}
                style={{ display: "block", margin: "0 auto" }}
              ></input>
            </th>
            <th scope="col" style={{ width: "30%" }}>
              商品
            </th>
            <th scope="col" style={{ width: "20%" }}>
              單價
            </th>
            <th scope="col" style={{ width: "20%" }}>
              數量
            </th>
            <th scope="col" style={{ width: "15%" }}></th>
          </tr>
        </thead>
        <tbody>
          {carts.map((cart) => (
            <tr key={cart.cartId}>
              <td>
                <input
                  type="checkbox"
                  id="fname"
                  name="fname"
                  checked={cart.checkbox}
                  onChange={(e) => {
                    cart.checkbox = e.target.checked;
                    check();
                  }}
                  style={{ display: "block", margin: "0 auto" }}
                ></input>
              </td>
              <td>{cart.name}</td>
              <td>$ {cart.price}</td>
              <td>
                <img
                  src="/images/minus.png"
                  alt="減少"
                  onClick={() => minBtn(cart.cartId, cart.quantity)}
                  style={{ cursor: "pointer" }}
                />
                &emsp;&emsp;{cart.quantity}&emsp;&emsp;
                <img
                  src="/images/plus.png"
                  alt="增加"
                  onClick={() => upBtn(cart.cartId, cart.quantity)}
                  style={{ cursor: "pointer" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteC(cart.cartId)}
                >
                  移除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3 style={{ marginLeft: "80%" }}>總金額 : $ {total}</h3>
      <button
        style={{ marginLeft: "80%" }}
        className="btn btn-primary"
        onClick={() => buy()}
      >
        結帳
      </button>
      &emsp;&emsp;
      <button className="btn btn-danger" onClick={() => deleteAllC()}>
        移除勾選商品
      </button>
    </div>
  );
};

export default Cart;
