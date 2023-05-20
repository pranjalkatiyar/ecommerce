import React, { useEffect, useState } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
// import axiosInstance from "../../AxiosInstance/axiosInstance";
import { toast } from "react-toastify";
import { MdCreditCard, MdEvent, MdVpnKey } from "react-icons/md";
import "./Payment.css";
import axiosInstance from "../../../AxiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import {createOrder,clearErrors} from "../../actions/orderAction";


const Payment = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const payBtn = React.useRef(null);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);
  const { shippingInfo, cartItem } = useSelector((state) => state.cart);
  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
    shippingInfo,
    cartItem,
  };

  const order={
    shippingInfo,
    orderItems:cartItem,
    itemsPrice:orderInfo.itemsPrice,
    taxPrice:orderInfo.taxPrice,
    shippingPrice:orderInfo.shippingPrice,
    totalPrice:orderInfo.totalPrice,
    
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    payBtn.current.disabled = true;
    let res;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          cookies: cookies.get("token"),
        },
      };

      const { data } = await axiosInstance.post(
        "/payment/process",
        paymentData,
        config
      );
      const client_secret = data.client_secret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: paymentData.address,
              country: paymentData.country,
              postal_code: paymentData.postalCode,
              state: paymentData.state,
              city: paymentData.city,
             },
          },
        },
      });
      console.log("result", result);
      if (result.error) {
        toast.error(result.error.message);
        payBtn.current.disabled = false;
      } else {
        if (result.paymentIntent.status === "succeeded") {
            order.paymentInfo = {
              id: result.paymentIntent.id,
              status: result.paymentIntent.status,
            };
            dispatch(createOrder(order));
          console.log("entered success");
          navigate("/success");
        } else {
          toast.error("There is some issue while payment processing");
        }
      }
    } catch (error) {
      payBtn.current.disabled = false;
      toast.error(error);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, error, toast]);

  return (
    <>
      <MetaData title="Payment" />
      <CheckoutSteps activeStep={2} />
      <div className="paymentContainer">
        <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
          <Typography>Card Info</Typography>
          <div>
            <MdCreditCard />
            <CardNumberElement className="paymentInput" />
          </div>
          <div>
            <MdEvent />
            <CardExpiryElement className="paymentInput" />
          </div>
          <div>
            <MdVpnKey />
            <CardCvcElement className="paymentInput" placeholder="CVC" />
          </div>

          <input
            type="submit"
            value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
            ref={payBtn}
            className="paymentFormBtn"
          />
        </form>
      </div>
    </>
  );
};

export default Payment;
