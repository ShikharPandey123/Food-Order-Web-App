import headerImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
import Button from "./UI/UI/Button.jsx";

import { useContext } from "react";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const cartQuantity = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }
  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={headerImg} alt="Header image" />
          <h1>Shikhar's Restaurant</h1>
        </div>
        <nav>
          <Button textOnly onClick={handleShowCart}>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
