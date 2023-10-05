import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { listOrders } from "./CartService";
import Title from "./Title";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState([]);
  const [total, setTotal] = useState(0);
  const uid = sessionStorage.getItem("userId");

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    let t = 0;
    for (var i = 0; i < orders.length; i++) {
      t = t + orders[i].price * orders[i].quantity;
    }
    setTotal(t);
  }, [orders]);

  const getOrders = () => {
    listOrders(uid)
      .then((response) => {
        setOrders(response.data);
        sortOrder(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sortOrder = (data) => {
    if (data.length > 0) {
      // 使用 Map 來將相同 key 值的資料合併成物件陣列
      const mergedDataMap = new Map();
      data.forEach((item) => {
        console.log(item.orderid.orderId);
        if (!mergedDataMap.has(item.orderid.orderId)) {
          mergedDataMap.set(item.orderid.orderId, []);
        }
        mergedDataMap.get(item.orderid.orderId).push(item);
      });

      // 將合併後的資料轉換成 Bootstrap Table 所需的格式
      const tableData = Array.from(mergedDataMap.entries()).map(
        ([key, values]) => {
          return {
            key: key,
            value: values, // 物件陣列
          };
        }
      );
      console.log(tableData);
      setNewOrder(tableData);
    }
  };

  return (
    <div className="container">
      <br />
      <Title mainTitle="訂單明細" />
      <br />
      {newOrder.length > 0
        ? newOrder.map((order) => (
            <table
              className="table table-striped mt-3 caption-top"
              key={order.key}
            >
              <caption >訂單編號 : {order.key}</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "10%" }}></th>
                  <th scope="col" style={{ width: "30%" }}>商品</th>
                  <th scope="col" style={{ width: "20%" }}>數量</th>
                  <th scope="col" style={{ width: "20%" }}>單價</th>
                  <th scope="col" style={{ width: "20%" }}>訂單時間</th>
                </tr>
              </thead>
              <tbody>
                {order.value.map((orderV) => (
                  <tr key={orderV.pid}>
                    <td></td>
                    <td>{orderV.name}</td>
                    <td>{orderV.quantity}</td>
                    <td>$ {orderV.price}</td>
                    <td>{orderV.orderTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))
        : "No data"}
      <h3 style={{ marginLeft: "80%" }}>總金額 : $ {total}</h3>
    </div>
  );
};

export default Order;
