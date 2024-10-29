import { currencyFormatter } from "../util/formatting.js";
import Button from "./UI/Button.jsx";
export default function Meal({
    id,
    name,
    price,
    description,
    image,
}){
    // const{addItemToCart}=useContext(CartContext);
    return(
        <article className="meal-item">
            <img className="meal-item img" src={`http://localhost:4000/${image}`} alt={name} />
            <div className="meal-item article">
                <h3 className="meal-item h3">{name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(price)}</p>
                <p className="meal-item-description">{description}</p>
            </div>
            <p className='meal-item-actions'>
            <Button onClick={() => addItemToCart(id)}>Add to Cart</Button>
            </p>
        </article>
    );
}