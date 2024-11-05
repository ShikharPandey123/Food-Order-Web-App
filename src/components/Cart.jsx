import { useContext } from "react";
import Button from "./UI/UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import { currencyFormatter } from "../util/formatting.js";
import CartModal from "./UI/UI/CartModal.jsx";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";
export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const totalPrice = cartCtx.items.reduce(
    (itemstotalPrice, item) =>
      itemstotalPrice + parseFloat(item.price) * item.quantity,
    0
  );
  function handleCloseCart() {
    userProgressCtx.hideCart();
  }
  function handleGoToCheckout() {
    userProgressCtx.showCheckout();
  }
  //console.log(item.price);
  // console.log("Cart Context Items:", cartCtx.items);
  // console.log("TotalPrice:", totalPrice);
  return (
    <CartModal
      className="cart"
      open={userProgressCtx.progress === "cart"}
      onClose={userProgressCtx.progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartCtx.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => cartCtx.addItem(item)}
            onDecrease={() => cartCtx.removeItem(item.id)}
          />
        ))}
      </ul>
      <p className="cart-total">
        Cart Total:{" "}
        <strong>{currencyFormatter.format(parseFloat(totalPrice))}</strong>
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartCtx.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button>
        )}
      </p>
    </CartModal>
  );
}
