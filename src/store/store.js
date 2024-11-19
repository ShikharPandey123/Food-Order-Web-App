import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import userProgressReducer from "./userProgress-slice";
import uiReducer from "./ui-slice";

const store = configureStore({
  reducer: {
    ui: uiReducer,
    cart: cartReducer,
    userProgress: userProgressReducer,
  },
});

export default store;
