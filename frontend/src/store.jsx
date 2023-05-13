import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  productReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { userReducer,profileReducer} from "./reducers/userReducer";
const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profileReducer: profileReducer,
});

let initalState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
