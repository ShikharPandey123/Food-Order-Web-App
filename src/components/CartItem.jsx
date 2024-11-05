import { currencyFormatter } from "../util/formatting.js";

export default function CartItem({
  name,
  quantity,
  price,
  onIncrease,
  onDecrease,
}) {
  //console.log({ name, quantity, price });
  return (
    <li className="cart-item">
      <p>
        {name} - {quantity} x {currencyFormatter.format(parseFloat(price))}
      </p>
      <p className="cart-item-actions">
        <button onClick={onDecrease}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrease}>+</button>
      </p>
    </li>
  );
}
