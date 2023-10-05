import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import "../App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    if (/[\u4e00-\u9fa5]/.test(event.target.value)) {
      setUsernameError("請輸入英文，不要包含中文字符。");
    } else {
      setUsernameError('');
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    if (event.target.value.length < 5) {
      setPasswordError("密碼至少要有5個字元。");
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (password !== confirmPassword) {
        alert("確認密碼與密碼不一致");
        return;
      }
      // 發送 POST 請求到後端 API
      const response = await axios.post("http://localhost:8080/api/register", {
        name,
        username,
        email,
        password,
      });
      alert(response.data);
      setName("");
      setUsername("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="container register-background">
      <div className="row justify-content-center">
        <div
          className="col-md-4 d-flex justify-content-center"
          style={{ height: "100vh" }}
        >
          <Card className="register-card">
            <Card.Body>
              <Card.Title className="cardTitle">註冊</Card.Title>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                  />
                </div>
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
                  {usernameError && <p className="text-danger">{usernameError}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email:
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
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
                  {passwordError && <p className="text-danger">{passwordError}</p>}
                </div>
                <div className="mb-3">
                  <label htmlFor="confirmPassword" className="form-label">
                    Confirm Password:
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    required
                  />
                </div>
              </form>
            </Card.Body>
            <Card.Footer>
              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  type="submit"
                  className="register-btn"
                  onClick={handleSubmit}
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

export default Register;
