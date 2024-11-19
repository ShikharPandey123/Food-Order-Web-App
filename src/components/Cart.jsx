import { useDispatch, useSelector } from "react-redux";
import Button from "./UI/UI/Button.jsx";
import CartItem from "./CartItem.jsx";
import { currencyFormatter } from "../util/formatting.js";
import CartModal from "./UI/UI/CartModal.jsx";
import { cartActions } from "../store/cart-slice";
import { uiActions } from "../store/ui-slice";
import { userProgressActions } from "../store/userProgress-slice";

export default function Cart() {
  const dispatch = useDispatch();
  const isCartVisible = useSelector((state) => state.ui.isCartVisible);
  // Access cart and user progress state from Redux
  const cartItems = useSelector((state) => state.cart.items);
  const progress = useSelector((state) => state.userProgress.progress);

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (itemstotalPrice, item) =>
      itemstotalPrice + parseFloat(item.price) * item.quantity,
    0
  );

  // Define event handlers
  function handleCloseCart() {
    dispatch(uiActions.hideCart());
  }

  function handleGoToCheckout() {
    dispatch(userProgressActions.showCheckout());
  }

  function handleIncreaseItem(item) {
    dispatch(cartActions.addItem(item));
  }

  function handleDecreaseItem(id) {
    dispatch(cartActions.removeItem(id));
  }

  return (
    <CartModal
      className="cart"
      // open={progress === "cart"}
      open={isCartVisible}
      onClose={progress === "cart" ? handleCloseCart : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onIncrease={() => handleIncreaseItem(item)}
            onDecrease={() => handleDecreaseItem(item.id)}
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
        {cartItems.length > 0 && (
          <Button onClick={handleGoToCheckout}>Checkout</Button>
        )}
      </p>
    </CartModal>
  );
}
