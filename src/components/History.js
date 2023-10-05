import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { listOrdersById } from "./CartService";
import Title from "./Title";

const History = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState([]);
  const [totals, setTotals] = useState([]);
  const uid = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = () => {
    listOrdersById(uid)
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
      const orderTotals = [];
      data.forEach((item) => {
        //console.log(item.orderid.orderId);
        if (!mergedDataMap.has(item.orderid.orderId)) {
          mergedDataMap.set(item.orderid.orderId, []);
        }
        mergedDataMap.get(item.orderid.orderId).push(item);
      });

      // 遍歷每筆訂單的商品，計算總和並加入總和陣列
      mergedDataMap.forEach((items) => {
        let orderTotal = 0;
        items.forEach((item) => {
          orderTotal += item.price * item.quantity;
        });
        orderTotals.push(orderTotal);
      });

      // 將合併後的資料轉換成 Bootstrap Table 所需的格式
      const tableData = Array.from(mergedDataMap.entries()).map(
        ([key, values], index) => {
          return {
            key: key,
            value: values,
            total: orderTotals[index], // 物件陣列
          };
        }
      );
      console.log(tableData);
      setNewOrder(tableData);
      setTotals(orderTotals);
    }
  };

  return (
    <div className="container">
      <br />
      <Title mainTitle="歷史訂單" />
      <br />
      {newOrder.length > 0
        ? newOrder.map((order) => (
            <table
              className="table table-striped mt-3 caption-top"
              key={order.key}
            >
              <caption>訂單編號 : {order.key}</caption>
              <thead>
                <tr>
                  <th scope="col" style={{ width: "10%" }}></th>
                  <th scope="col" style={{ width: "30%" }}>
                    商品
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    數量
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    單價
                  </th>
                  <th scope="col" style={{ width: "20%" }}>
                    訂單時間
                  </th>
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
              <tfoot>
                <tr>
                  <td
                    colSpan="5"
                    style={{ textAlign: "right", fontSize: "20px" }}
                  >
                    訂單金額 : $ {order.total}
                  </td>
                </tr>
              </tfoot>
            </table>
          ))
        : "查無歷史訂單資料"}
    </div>
  );
};

export default History;
