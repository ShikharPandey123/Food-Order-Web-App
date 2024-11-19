import headerImg from "../assets/logo.jpg";
import Button from "./UI/UI/Button.jsx";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice"; // Import ui slice

export default function Header() {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) =>
    state.cart.items.reduce(
      (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
      0
    )
  );
  // Function to toggle cart visibility
  function handleShowCart() {
    dispatch(uiActions.showCart());
  }

  return (
    <>
      <header id="main-header">
        <div id="title">
          <img src={headerImg} alt="Header image" />
          <h1>Shikhar's Restaurant</h1>
        </div>
        <nav>
          {/* Button displays the cart total quantity */}
          <Button textOnly onClick={handleShowCart}>
            Cart ({cartQuantity})
          </Button>
        </nav>
      </header>
    </>
  );
}
