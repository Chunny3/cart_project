import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Buy from "./components/Buy";
import Login from "./components/Login";
import Order from "./components/Order";
import History from "./components/History";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ProductManagement from "./components/ProductManagement ";
import ProductList from "./components/ProductList";

const Malfunction = () => {
  return <h2>功能尚未完成。</h2>;
};

const App = () => {
  const uid = sessionStorage.getItem("userId");
  const uName = sessionStorage.getItem("userName");

  const logOut = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("userName");
    window.location.reload();
  };

  const buyHint = (e, path) => {
    if (
      window.location.pathname === "/buy" &&
      !window.confirm("確定要離開結帳頁面嗎?")
    ) {
      e.preventDefault();
      return;
    }
  };

  return (
    <Router>
      <div class="container">
        <nav
          className="navbar navbar-expand-lg navbar-light bg-light"
          style={{ height: "80px" }}
        >
          <div className="d-flex justify-content-between w-100">
            <ul className="navbar-nav" style={{ paddingLeft: 30 }}>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/"
                  onClick={(e) => buyHint(e, "/")}
                >
                  首頁
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/cart"
                  onClick={(e) => buyHint(e, "/cart")}
                >
                  購物車
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link"
                  to="/history"
                  onClick={(e) => buyHint(e, "/history")}
                >
                  歷史訂單
                </Link>
              </li>
            </ul>
            <div>
              {uid ? (
                <ul className="navbar-nav" style={{ paddingRight: 30 }}>
                  <li className="nav-item" style={{ width: 200 }}>
                    <span className="nav-link">歡迎, {uName}!</span>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-link" onClick={logOut}>
                      登出
                    </a>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav" style={{ paddingRight: 30 }}>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      登入
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      註冊
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/order" element={<Order />} />
          <Route path="/history" element={<History />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/malfunction" element={<Malfunction />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Products" element={<ProductList />} />
          <Route path="/products/edit" element={<ProductManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
