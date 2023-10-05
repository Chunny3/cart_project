import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import Title from "./Title";
import { createCart, updateCart, listCarts } from "./CartService";

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const uid = sessionStorage.getItem("userId");
  const [userId, setUserId] = useState("");
  const [allCart, setAllCart] = useState([]);

  useEffect(() => {
    const uid = sessionStorage.getItem("userId");

    setUserId(uid);
    setProducts([
      { id: 1, image: "./images/p1.jpg", name: "JLab JBuds Air ANC 降噪真無線藍牙耳機", price: 1899 },
      { id: 2, image: "./images/p2.jpg", name: "EDIMAX 無線網路卡", price: 300 },
      { id: 3, image: "./images/img1.jpg", name: "iPhone 14 Pro Max 256G", price: 38900 },
    ]);
    getAllCarts();
  }, []);

  const getAllCarts = () => {
    listCarts(uid)
      .then((response) => {
        setAllCart(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addProduct = (id, name, price) => {
    
    const cartItem = allCart.find((item) => item.id == id);
    const cart = { userId, id, name, price, quantity: 1 };
    if (userId) {
      if (cartItem) {
        cartItem.quantity += 1;
        updateCart(cartItem.cartId, cartItem)
          .then((response) => {
            console.log(cart);
          })
          .catch((error) => {
            console.log(error);
          });
        alert("加入購物車成功");
      } else {
        createCart(id, cart)
          .then((response) => {
            console.log(cart);
          })
          .catch((error) => {
            console.log(error);
          });
        alert("加入購物車成功");
      }
    } else {
      alert("請先登入再購買商品");
    }
    // window.location.reload();
    getAllCarts();
  };

  return (
    <Container>
      <br />
      <Title mainTitle="首頁" />
      <br />
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4}>
            <Card style={{ height: "110%", marginTop: "20px" }}>
              <Card.Img className="img_size" src={product.image} />
              <Card.Body style={{ width: "auto", height: "100px" }}>
                <Card.Title style={{ fontSize: "20px", textAlign: "center" }}>
                  {product.name}
                </Card.Title>
                <Card.Text style={{ textAlign: "center" }}>
                  ${product.price}{" "}
                </Card.Text>
                <Card.Text style={{ textAlign: "center" }}>
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      addProduct(product.id, product.name, product.price)
                    }
                  >
                    加入購物車
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
