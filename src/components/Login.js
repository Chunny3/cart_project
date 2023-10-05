import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }
      //使用 response.text() 來讀取後端返回的文本數據，然後再使用 JSON.parse() 解析這個文本數據
      const text = await response.text();
      // 如果 text 為空，則處理登入失敗情況
      if (!text) {
        alert("帳號或密碼有誤 請重新登入");
        return;
      }
      const data = JSON.parse(text);
      if (data !== null) {
        // 將 userId,userName 存入 sessionStorage
        sessionStorage.setItem("userId", data.id);
        sessionStorage.setItem("userName", data.username);
        console.log(data);
      } else {
        alert("帳號或密碼有誤 請重新登入");
      }
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div className="container login-background">
      <div className="row justify-content-center">
        <div
          className="col-md-4 d-flex justify-content-center"
          style={{ height: "100vh" }}
        >
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="cardTitle" >登入</Card.Title>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Username:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={handleUsernameChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                </div>
                <Link to="/forgot-password" className="forgot-password-link">忘記密碼？</Link>
              </form>
            </Card.Body>
            <Card.Footer>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  className="register-btn"
                >
                  登入
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleRegister}
                  className="register-btn"
                >
                  註冊
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;
