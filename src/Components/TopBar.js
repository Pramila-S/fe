import React from "react";
import {
  Navbar,
  Container,
  Nav,
  Image,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import img from "../images/logo.png";
import { logoutUser } from "../actions/userAction";

function TopBar() {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        sticky="top"
        style={{ backgroundColor: "rgb(255,69,0)" }}
      >
        <Container>
          <Navbar.Brand>
            <Image src={img} alt="logo" style={{ height: "50px" }} />
          </Navbar.Brand>
          <Navbar.Brand>
            <h1>American Pizza Shop </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {currentUser ? (
                <>
                  <LinkContainer to="/">
                    <NavDropdown
                      title={currentUser.name}
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item>
                        <Button
                          variant="outline-danger"
                          onClick={() => {
                            dispatch(logoutUser());
                          }}
                        >
                          Logout
                        </Button>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </LinkContainer>
                  {currentUser.isAdmin === false ? (
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        Cart&nbsp;{cartState.cartItems.length}
                      </Nav.Link>
                    </LinkContainer>
                  ) : (
                    <LinkContainer to="/admin">
                    <Nav.Link>Admin Panel</Nav.Link>
                  </LinkContainer>
                  )}
                </>
              ) : (
                <>
               
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>Register</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/adminlogin">
                    <Nav.Link>Admin</Nav.Link>
                  </LinkContainer>
                </>
              )}
            
               

             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default TopBar;
