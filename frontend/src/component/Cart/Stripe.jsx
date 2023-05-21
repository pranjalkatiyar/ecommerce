import React, { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Payment";
import { toast } from "react-toastify";
import axiosInstance from "../../../AxiosInstance/axiosInstance";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import axios from "axios";

const Stripe = () => {
  const [stripeApiKey, setStripeApiKey] = useState("");
   async function getStripeApiKey() {
    const cookie = cookies.get("token");
    try {
      const config = {
        headers: {
          cookies: cookie,
        },
      };
      const {data} = await axios.get(
        "https://ecommerce-wdq0.onrender.com/api/v1/stripeapi",
        config
      );
 
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
       toast.error(error.message);
    }
  }

  useEffect(() => {
    getStripeApiKey();
  }, [cookies.get("token")]);

  return (
    <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
    </Elements>
  );
};

export default Stripe;
