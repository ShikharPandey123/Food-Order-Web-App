import { useSelector, useDispatch } from "react-redux";
import CartModal from "./UI/UI/CartModal.jsx";
import { currencyFormatter } from "../util/formatting.js";
import Input from "./UI/UI/Input.jsx";
import Button from "./UI/UI/Button.jsx";
import useHttp from "../hooks/useHttp.js";
import { cartActions } from "../store/cart-slice";
import { userProgressActions } from "../store/userProgress-slice";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout() {
  const dispatch = useDispatch();

  // Access cart items and progress from Redux
  const cartItems = useSelector((state) => state.cart.items);
  const progress = useSelector((state) => state.userProgress.progress);

  // HTTP custom hook
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
    clearData,
  } = useHttp(
    "https://food-order-web-app-2.onrender.com/orders",
    requestConfig
  );
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (itemstotalPrice, item) =>
      itemstotalPrice + parseFloat(item.price) * parseFloat(item.quantity),
    0
  );

  // Event Handlers
  function handleClose() {
    dispatch(userProgressActions.hideCheckout());
  }

  function handleFinish() {
    dispatch(userProgressActions.hideCheckout());
    dispatch(cartActions.clearCart());
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: {
          items: cartItems,
          customer: customerData,
        },
      })
    );
  }

  // Render dynamic actions
  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );
  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  // Render success message if order is successful
  if (data && !error) {
    return (
      <CartModal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </CartModal>
    );
  }

  // Default checkout form
  return (
    <CartModal open={progress === "checkout"} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <h2>Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(parseFloat(totalPrice))}</p>
        <Input label="Full Name" type="text" id="name" />
        <Input label="E-Mail Address" id="email" type="email" />
        <Input label="Street" type="text" id="street" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title="Failed to submit order" message={error} />}
        <p className="modal-actions">{actions}</p>
      </form>
    </CartModal>
  );
}
