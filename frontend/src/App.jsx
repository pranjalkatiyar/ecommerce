import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./component/layout/Header/Header";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./component/layout/footer/Footer";
import Home from "./component/Home/Home";
import ProductDetails from "./component/ProductDetails/ProductDetails";
import Product from "./component/Product/Product";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp";
import store from "./store";
import { loaduser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import Protectedroute from "./component/Route/Protectedroute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import { toast, ToastContainer } from "react-toastify";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Stripe from "./component/Cart/Stripe";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Orders/MyOrders";
import About from "./component/layout/About/About";
import Contact from "./component/layout/Contact/Contact";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,700", "sans-serif"],
      },
    });
    console.log(user);
    store.dispatch(loaduser(user));
  }, []);
  return (
    <>
      <Router>
        <Header />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<Product />} />
          <Route path="/products/:keyword" element={<Product />} />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<LoginSignUp />} />
          <Route
            path="/account"
            element={
              <Protectedroute>
                <Profile />
              </Protectedroute>
            }
          />
          <Route
            path="/account/update"
            element={
              <Protectedroute>
                <UpdateProfile />
              </Protectedroute>
            }
          />
          <Route
            path="/password/update"
            element={
              <Protectedroute>
                <UpdatePassword />
              </Protectedroute>
            }
          />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={
              <Protectedroute>
                <Shipping />
              </Protectedroute>
            }
          />
          <Route
            path="/order/confirm"
            element={
              <Protectedroute>
                <ConfirmOrder />
              </Protectedroute>
            }
          />
          <Route
            path="/process/payment"
            element={
              <Protectedroute>
                <Stripe />
              </Protectedroute>
            }
          ></Route>
          <Route
            path="/success"
            element={
              <Protectedroute>
                <OrderSuccess />
              </Protectedroute>
            }
          />
          <Route
            path="/orders"
            element={
              <Protectedroute>
                <MyOrders />
              </Protectedroute>
            }
          />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact/>}/>
        </Routes>
        <Footer />
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={4999}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
