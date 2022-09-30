import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartAction";
import { FaRupeeSign } from "react-icons/fa";
import "../CSS/Pizza.css";
import swal from "sweetalert";

function Pizza({ pizza }) {
  const [varient, setVarient] = useState("small");
  const [quantity, setQuantity] = useState(1);
  const [show, setShow] = useState(false);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  const dispatch = useDispatch();

  const addToCartHandler = () => {
    if (currentUser) {
      dispatch(addToCart(pizza, quantity, varient));
      swal("Thank You", "This item has been added to cart", "success")
    } else {
      swal("Fail", "Please login to shop pizza!", "error");
    }
  };
  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card
        className="imageupload"
        style={{
          width: "22rem",
          marginTop: "30px",
          objectFit: "cover",
          borderRadius: "10px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        }}
      >
        <Card.Img
          variant="top"
          src={pizza.image}
          style={{ height: "200px", cursor: "pointer" }}
          onClick={handleShow}
        />
        <Card.Body>
          <Card.Title>{pizza.name}</Card.Title>
          <hr />
          <Card.Text>
            <Row>
              <Col md={6}>
                <h6>Varients</h6>
                <select
                  value={varient}
                  onChange={(e) => setVarient(e.target.value)}
                >
                  {pizza.varients.map((varient) => (
                    <option>{varient}</option>
                  ))}
                </select>
              </Col>
              <Col md={6}>
                <h6>Quantity</h6>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                >
                  {[...Array(10).keys()].map((v, i) => (
                    <option value={i + 1}>{i + 1}</option>
                  ))}
                </select>
              </Col>
            </Row>
          </Card.Text>
          <Row>
            <Col md={6}>
              Price : <FaRupeeSign /> {pizza.prices[0][varient] * quantity}
            </Col>
            <Col md={6}>
              <Button onClick={addToCartHandler} variant="primary">
                Add to Cart
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {/* modal */}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{pizza.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <Card.Img
              variant="top"
              src={pizza.image}
              style={{ height: "270px", borderRadius: "5px" }}
            />
          </div>
          <div>
            <h5>Description</h5>
            <h6>{pizza.description}</h6>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Pizza;
