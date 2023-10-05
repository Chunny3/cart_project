import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  createOrder,
  listBuys,
  deleteBuy,
  deleteCart,
  listCarts,
} from "./CartService";
import Title from "./Title";


const Buy = () => {
  const [buys, setBuys] = useState([]);
  const [total, setTotal] = useState(0);
  const [carts, setCarts] = useState([]);
  const uid = sessionStorage.getItem("userId");
  const navigate = useNavigate();
  

  useEffect(() => {
    getAllBuys();
    getAllCarts();
  }, []);

  useEffect(() => {
    let t = 0;
    for (var i = 0; i < buys.length; i++) {
      t = t + buys[i].price * buys[i].quantity;
    }
    setTotal(t);
  }, [buys]);

  const getAllBuys = () => {
    listBuys(uid)
      .then((response) => {
        setBuys(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getAllCarts = () => {
    listCarts(uid)
      .then((response) => {
        setCarts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteB = (buyId) => {
    if (!window.confirm("確定要刪除此商品嗎?")) {
      getAllBuys();
    } else {
      deleteBuy(buyId)
        .then((response) => {
          getAllBuys();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const addOrder = () => {
    const updatedCart = carts.filter(
      (cartItem) => !buys.some((buy) => buy.id === cartItem.id)
    );
    for (const cartItem of carts) {
      if (
        !updatedCart.some(
          (updatedItem) => updatedItem.cartId === cartItem.cartId
        )
      ) {
        deleteCart(cartItem.cartId)
          .then(() => {
            getAllCarts();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
    console.log(buys);
    if (buys.length === 0) {
      alert("請到購物車選擇要購買的商品");
      navigate("/cart");
    } else {
      createOrder(buys)
        .then((response) => {
          navigate("/order");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="container">
      <br />
      <Title mainTitle="結帳" />
      <br />
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th scope="col" style={{ width: "10%" }}></th>
            <th scope="col" style={{ width: "30%" }}>
              商品
            </th>
            <th scope="col" style={{ width: "20%" }}>
              單價
            </th>
            <th scope="col" style={{ width: "20%" }}>
              數量
            </th>
            <th scope="col" style={{ width: "20%" }}></th>
          </tr>
        </thead>
        <tbody>
          {buys.map((buy) => (
            <tr key={buy.buyId}>
              <td></td>
              <td>{buy.name}</td>
              <td>$ {buy.price}</td>
              <td>{buy.quantity}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteB(buy.buyId)}
                >
                  移除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h3 style={{ display: "inline-block", marginLeft: "65%" }}>
          總金額 : $ {total}
        </h3>
        <button
          className="btn btn-primary"
          style={{ display: "inline-block", marginLeft: "10%" }}
          onClick={() => addOrder()}
        >
          送出訂單
        </button>
      </div>
    </div>
  );
};

export default Buy;
