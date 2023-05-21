// import axios from '../../AxiosInstance/axiosInstance.jsx';

import axiosInstance from "../../AxiosInstance/axiosInstance.jsx";
import axios from "axios";

import {
  ALL_PRODUCTS_REQUEST,
  ALL_PRODUCTS_SUCCESS,
  ALL_PRODUCTS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/productConstant";

export const getProducts =
  (keyword = "", currentPage = 1, price = [1, 25000],category,rating=0) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_PRODUCTS_REQUEST });

       let link = `https://ecommerce-wdq0.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&ratings[gte]=${rating}`;

       if(category)
        link=` https://ecommerce-wdq0.onrender.com/api/v1/products?keyword=${keyword}&page=${currentPage}&category=${category}&ratings[gte]=${rating}`;

      const { data } = await axios.get(link);

      dispatch({
        type: ALL_PRODUCTS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_PRODUCTS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`https://ecommerce-wdq0.onrender.com/api/v1product/${id}`);
    console.log("data:", data);
    dispatch({
      type: PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};
