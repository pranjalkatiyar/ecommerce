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


function App() {
  React.useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto:300,400,500,700", "sans-serif"],
      },
    });
  }, []);
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Product />} />
        <Route path="/products/:keyword" element={<Product />} />
        <Route path="/search" element={<Search/>}/>
        <Route path="/login" element={<LoginSignUp/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
