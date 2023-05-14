import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer,profileReducer,forgotPasswordReducer} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profileReducer: profileReducer,
  forgotPasswordReducer: forgotPasswordReducer,
  cart:cartReducer
});

let initalState = {
  cart:{
    cartItems:localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")):[]
  }
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
