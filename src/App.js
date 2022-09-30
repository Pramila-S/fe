
import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,

} from "react-router-dom";
import TopBar from './Components/TopBar';
import HomePage from './pages/HomePage';
import CartScreen from './pages/CartScreen';
import Register from './pages/Register';
import Login from './pages/Login';
import Order from './pages/Order';
import AdminPage from './pages/AdminPage';
import AdminLogin from './pages/AdminLogin';




function App() {
  const currentUser = localStorage.getItem('currentUser')
  console.log(currentUser)
  return (
    
   <BrowserRouter>
    <TopBar/>
    <Switch>
    <Route path="/register" component={Register } />
    <Route path="/login" component={Login} /> 
    <Route path="/" component={HomePage } exact />
    <Route path="/cart" component={currentUser ? CartScreen : HomePage} />
    <Route path="/orders" component={Order} />
    <Route path="/admin" component={AdminPage} />
    <Route path="/adminlogin" component={AdminLogin} />
    

    </Switch>
   </BrowserRouter>
   
  );
}

export default App;


