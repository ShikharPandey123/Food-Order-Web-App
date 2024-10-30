import { createContext, useReducer } from "react";
import fetchAvailableMeals from "../http.js";
const CartContext = createContext({
    items:[],
    addItemToCart: ()=>{},
    updateItemQuantity: ()=>{}
})

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const updatedItems = [...state.items];
    const existingCartItemIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = updatedItems[existingCartItemIndex];
    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({
        id: action.payload.id,
        name: action.payload.title,
        price: action.payload.price,
        quantity: 1,
      });
    }

    return {
      items: updatedItems,
    };
  }
  if (action.type === "UPDATE_ITEM") {
    const updatedItems = [...state.items];
    const updatedItemIndex = updatedItems.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItem = {
      ...updatedItems[updatedItemIndex],
    };
    updatedItem.quantity += action.payload.amount;
    if (updatedItem.quantity <= 0) {
      updatedItems.splice(updatedItemIndex, 1);
    } else {
      updatedItems[updatedItemIndex] = updatedItem;
    }
    return {
      ...state,
      items: updatedItems,
    };
  }
  return state;
}
export function CartContextProvider({ children }) {
  const [CartState, CartDispatch] = useReducer(cartReducer, { items: [] });
  async function handleAddItemToCart(id) {
    try {
      const fetchedMeals = await fetchAvailableMeals();
      const meal = fetchedMeals.find((meal) => meal.id === id);
      if (meal) {
        CartDispatch({
          type: "ADD_ITEM",
          item: {
            id: meal.id,
            name: meal.title,
            price: meal.price,
          },
        });
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  }
  function handleUpdateCartItemQuantity(mealID, amount) {
    CartDispatch({
      type: "UPDATE_ITEM",
      payload: {
        mealID,
        amount,
      },
    });
  }
  const ctxValue = {
    items: CartState.items,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };
  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
export default CartContext;