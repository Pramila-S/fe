import React, { useEffect } from "react";
import { Row, Col, Container, Button, ButtonGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Switch, Route,} from "react-router-dom";
import AddNewPizza from '../Components/Admin/AddNewPizza';
import EditPizza from "../Components/Admin/EditPizza";
import OrderList from '../Components/Admin/OrderList';
import Pizzaslist from '../Components/Admin/Pizzaslist';
import Userlist from '../Components/Admin/Userlist'

const AdminPage = ({ history }) => {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  useEffect(() => {
    if (localStorage.getItem("currentUser") === null || !currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);
  return (
    <>
      <Container>
        <Row>
          <h1 className="text-center p-2">Admin Panel</h1>
          <Col md={2}>
            <ButtonGroup vertical style={{ minHeight: "400px" }}>
              <Button onClick={() => history.push("/admin/userlist")}>
                All Users
              </Button>
              <Button onClick={() => history.push("/admin/pizzalist")}>
                All Pizzas
              </Button>
              <Button onClick={() => history.push("/admin/addnewpizza")}>
                Add New Pizza
              </Button>
              {/* <Button onClick={() => history.push("/admin/orderlist")}>
                All Orders
              </Button> */}
            </ButtonGroup>
          </Col>
          <Col md={10}>
            <Switch>
              <Route path="/admin" component={Userlist}  exact/>
              <Route path="/admin/userlist" component={Userlist}  />
              <Route
                path="/admin/editpizza/:pizzaId"
                component={EditPizza}
                exact
              />
              <Route path="/admin/pizzalist" component={Pizzaslist} exact  />
              <Route path="/admin/addnewpizza" component={AddNewPizza}  />
              <Route path="/admin/orderlist" component={OrderList}  />
            </Switch>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminPage;