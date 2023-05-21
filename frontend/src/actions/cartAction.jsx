import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_INFO,
} from "../constants/cartConstant";

import axiosInstance from "../../AxiosInstance/axiosInstance.jsx";
import axios from "axios";

const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axios.get(`https://ecommerce-wdq0.onrender.com/api/v1/product/${id}`);   
   dispatch({
    type: ADD_TO_CART,
    payload: {
      product: data.product._id,
      name: data.product.name,
      price: data.product.price,
      image: data.product.images[0].url,
      stock: data.product.stock,
      quantity,
    },
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

// REMOVE FROM CART

const removeItemFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: id,
  });

  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};


// save shipping info

const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_INFO,
    payload: data,
  });
}

export { addItemsToCart ,removeItemFromCart,saveShippingInfo};
