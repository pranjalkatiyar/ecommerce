import React from "react";
 import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MdCheckCircle } from "react-icons/md";

const OrderSuccess = () => {
  return (
    <div className="orderSuccess">
      <MdCheckCircle />
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;