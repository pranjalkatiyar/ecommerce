import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOAD_USER_FAIL,
  LOAD_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PROFILE_RESET,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_RESET,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
} from "../constants/userConstant";
import axios from "axios";
import axiosInstance from "../../AxiosInstance/axiosInstance.jsx";
import Cookies from 'universal-cookie';
const cookies = new Cookies();
// login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axios.post(
      "https://ecommerce-wdq0.onrender.com/api/v1/login",
      { email, password },
      config
    );
    cookies.set("token",data.token,{path:"/"});

    dispatch({ type: LOGIN_SUCCESS, payload: data.user, token: data.token });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data.message });
  }
};

// register action
export const register = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post("https://ecommerce-wdq0.onrender.com/api/v1/register", userdata, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response });
  }
};

// load user action

export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const cookie=cookies.get("token");
    const { data } = await axios.get("https://ecommerce-wdq0.onrender.com/api/v1/me", {
      headers: { cookies: cookie },
    });
    console.log("data", data);
    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response });
  }
};

// logout user action
export const logout = () => async (dispatch) => {
  try {
    await axios.get("https://ecommerce-wdq0.onrender.com/api/v1/logout");
    cookies.remove("token");
     dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response });
  }
};

// update profile action

export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

     const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        cookies: cookies.get("token"),
      },
    };

    const { data } = await axios.put("https://ecommerce-wdq0.onrender.com/api/v1/me/update", userdata, config);
    console.log("data", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response });
  }
};

// update password action
export const updatePassword = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

     const config = {
      headers: {
        "Content-Type": "application/json",
        cookies: cookies.get("token"),
      },
    };

    const { data } = await axios.put(
      "https://ecommerce-wdq0.onrender.com/api/v1/password/update",
      userdata,
      config
    );
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response });
  }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`https://ecommerce-wdq0.onrender.com/api/v1/password/forgot`, email, config);

    dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `https://ecommerce-wdq0.onrender.com/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
