import axios from "axios";

export const listCarts = (uid) => {
  return axios.get("http://localhost:8080/api/carts/"+uid);
};
export const createCart = (id, cart) => {
  return axios.post(`http://localhost:8080/api/add_cart/${id}`, cart);
};
export const updateCart = (id, cart) => {
  return axios.put("http://localhost:8080/api/update_cart/" + id, cart);
};
export const deleteCart = (id) => {
  return axios.delete(`http://localhost:8080/api/delete_cart/${id}`);
};
export const deleteAllCart = (del) => {
  return axios.delete("http://localhost:8080/api/delete_allcart", {
    data: del,
  });
};
//================================================================================
export const listBuys = (uid) => {
  return axios.get("http://localhost:8080/api/buys/"+uid);
};
export const createBuy = (buy) => {
  return axios.post("http://localhost:8080/api/add_buy", buy);
};
export const deleteBuy = (id) => {
  return axios.delete("http://localhost:8080/api/delete_buy/" + id);
};
export const deleteAllBuy = () => {
  return axios.delete("http://localhost:8080/api/deleteAllbuy");
};
//================================================================================

export const listOrders = (uid) => {
  return axios.get("http://localhost:8080/api/order/"+uid);
};
export const listOrdersById = (uid) => {
  return axios.get("http://localhost:8080/api/orders/" + uid);
};
export const createOrder = (order) => {
  return axios.post("http://localhost:8080/api/add_order", order);
};
