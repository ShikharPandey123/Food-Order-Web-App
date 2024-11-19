import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import Header from "./components/Header";
import Meals from "./components/Meals";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <Provider store={store}>
      <Header />
      <Meals />
      <Cart />
      <Checkout />
    </Provider>
  );
};

export default App;
