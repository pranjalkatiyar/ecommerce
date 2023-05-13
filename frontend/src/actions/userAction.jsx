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
} from "../constants/userConstant";
import axiosInstance from "../../AxiosInstance/axiosInstance.jsx";

// login action
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await axiosInstance.post(
      "/login",
      { email, password },
      config
    );

     document.cookie = `token=${data.token}; path=/`;

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

    const { data } = await axiosInstance.post("/register", userdata, config);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response });
  }
};

// load user action

export const loaduser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const cookiesToken = document.cookie.match(new RegExp(name + "=([^;]+)"));
    const { data } = await axiosInstance.get("/me", {
      headers: { cookies: cookiesToken[1] },
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
    await axiosInstance.get("/logout");
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    dispatch({ type: LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response });
  }
};

// update profile action

export const updateProfile = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });

    const cookiesToken = document.cookie.match(new RegExp(name + "=([^;]+)"));
     const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        cookies: cookiesToken[1],
    },
    };

    const { data } = await axiosInstance.put("/me/update", userdata, config);
    console.log("data", data);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.success });

    dispatch({ type: UPDATE_PROFILE_RESET });
  } catch (error) {
    dispatch({ type: UPDATE_PROFILE_FAIL, payload: error.response });
  }
};

// update password action
export const updatePassword = (userdata) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const cookiesToken = document.cookie.match(new RegExp(name + "=([^;]+)"));
     const config = {
      headers: {
        "Content-Type": "application/json",
         cookies: cookiesToken[1],
    },
    };

    const { data } = await axiosInstance.put("/password/update", userdata, config);
    console.log("data", data);
    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });

    dispatch({ type: UPDATE_PASSWORD_RESET });
  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
