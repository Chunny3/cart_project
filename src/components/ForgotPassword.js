import React, { useState } from "react";
import { Card, Button, Form } from "react-bootstrap";
import axios from "axios";

const ForgetPassword = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
    if (event.target.value.length < 5) {
      setMessage("新密碼至少需要5個字符。");
    } else {
      setMessage(""); // 清除错误消息
    }
  };

  const handleConfirmNewPasswordChange = (event) => {
    setConfirmNewPassword(event.target.value);
  };

  const handleVerify = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/verify-username-email",
        {
          username,
          email,
        }
      );

      if (response.data === "驗證成功") {
        setVerificationSuccess(true);
        setMessage("");
      } else {
        setVerificationSuccess(false);
        setMessage("用戶名和電子郵件不匹配。");
      }
    } catch (error) {
      console.error(error);
      setMessage("驗證失败，請檢查輸入並重試。");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setMessage("新密碼與確認新密碼不一致。");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/reset-password",
        {
          newPassword,
          username,
          email,
        }
      );
      setMessage(response.data);
      if (response.data === "密碼已更改") {
        setTimeout(() => {
          window.location.href = "/login";
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setMessage("重置密碼失敗，請檢查輸入並重試。");
    }
  };

  return (
    <div className="container login-background">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <Card className="login-card">
            <Card.Body>
              <Card.Title className="cardTitle">忘記密碼</Card.Title>
              {!verificationSuccess ? (
                <div>
                  <Form.Group controlId="username">
                    <Form.Label>用戶名:</Form.Label>
                    <Form.Control
                      type="text"
                      value={username}
                      onChange={handleUsernameChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="email">
                    <Form.Label>電子郵件:</Form.Label>
                    <Form.Control
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Button variant="primary" onClick={handleVerify}>
                    驗證
                  </Button>
                  <div className="mt-2">{message}</div>
                </div>
              ) : (
                <div>
                  <Form.Group controlId="newPassword">
                    <Form.Label>新密碼:</Form.Label>
                    <Form.Control
                      type="password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Form.Group controlId="confirmNewPassword">
                    <Form.Label>確認新密碼:</Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmNewPassword}
                      onChange={handleConfirmNewPasswordChange}
                      required
                    />
                  </Form.Group>
                  <br />
                  <Button
                    variant="primary"
                    onClick={handleResetPassword}
                    className="reset-password-btn"
                  >
                    重置密碼
                  </Button>
                  <div className="mt-2">{message}</div>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
