import { useContext } from "react";
import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/UI/Button.jsx";
import CartContext from "../store/CartContext.jsx";

export default function Meal({ meal }) {
  const cartCtx = useContext(CartContext);
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }
  return (
    <article className="meal-item">
      <img
        className="meal-item img"
        src={`https://food-order-web-app-2.onrender.com/${meal.image}`}
        alt={meal.name}
      />
      <div className="meal-item article">
        <h3 className="meal-item h3">{meal.name}</h3>
        <p className="meal-item-price">
          {currencyFormatter.format(parseFloat(meal.price))}
        </p>
        <p className="meal-item-description">{meal.description}</p>
      </div>
      <p className="meal-item-actions">
        <Button onClick={handleAddMealToCart}>Add to Cart</Button>
      </p>
    </article>
  );
}
