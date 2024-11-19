import { useDispatch } from "react-redux"; // Import useDispatch for dispatching actions
import { currencyFormatter } from "../util/formatting.js"; // Utility for formatting prices
import Button from "./UI/UI/Button.jsx"; // Button component
import { cartActions } from "../store/cart-slice"; // Import cart actions from Redux slice

export default function Meal({ meal }) {
  const dispatch = useDispatch(); // Initialize dispatch function

  // Function to handle adding a meal to the cart
  function handleAddMealToCart() {
    dispatch(
      cartActions.addItem({
        id: meal.id,
        name: meal.name,
        price: meal.price,
        description: meal.description,
        image: meal.image, // Include the image if necessary
      })
    );
  }

  return (
    <article className="meal-item">
      {/* Display meal image */}
      <img
        className="meal-item img"
        src={`http://localhost:4000/${meal.image}`} // Fetch image from backend
        alt={meal.name}
      />

      <div className="meal-item article">
        {/* Meal name */}
        <h3 className="meal-item h3">{meal.name}</h3>

        {/* Meal price formatted */}
        <p className="meal-item-price">
          {currencyFormatter.format(parseFloat(meal.price))}
        </p>

        {/* Meal description */}
        <p className="meal-item-description">{meal.description}</p>
      </div>

      {/* Add to Cart button */}
      <p className="meal-item-actions">
        <Button onClick={handleAddMealToCart}>Add to Cart</Button>
      </p>
    </article>
  );
}
