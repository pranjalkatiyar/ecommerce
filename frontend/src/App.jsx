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
        </Routes>
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
