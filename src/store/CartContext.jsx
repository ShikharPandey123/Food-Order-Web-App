import { createContext, useReducer } from "react";
import fetchAvailableMeals from "../http.js";
const CartContext = createContext({
    items:[],
    addItemToCart: ()=>{},
    updateItemQuantity: ()=>{}
})

function cartReducer(state,action){
    if(action.type === 'ADD_ITEM'){
        const updatedItems = [...state.items];
        const existingCartItemIndex = updatedItems.findIndex(
            (item)=> item.id === action.item.id
        );
        const existingCartItem = updatedItems[existingCartItemIndex];
        if(existingCartItem){
            const updatedItem={
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            updatedItems[existingCartItemIndex]=updatedItem;
        }
        else{
            async function getMeals(){
                try {
                    const fetchedMeals= await fetchAvailableMeals();
                } catch (error) {
                    //error fetching data
                }
            }
            getMeals();
            const meal=fetchedMeals.find((meal)=>meal.id === action.payload)
            updatedItems.push({
                id: action.payload,
                name:meal.title,
                price:meal.price,
                quantity:1,
            });
        }
        return{
            items: updatedItems,
        }
    }
    if(action.type === 'UPDATE_ITEM'){
        const updatedItems = [...state.items];
        const updatedItemIndex = updatedItems.findIndex(
            (item)=> item.id === action.item.id
        );
        const updatedItem={
            ...updatedItems[updatedItemIndex],
        };
        updatedItem.quantity += action.payload.amount;
        if(updatedItem.quantity<=0){
            updatedItems.splice(updatedItemIndex,1);
        }
        else{
            updatedItems[updatedItemIndex]=updatedItem;
        }
        return{
            ...state,
            items: updatedItems,
        };
    }
    return state;
}
export function CartContextProvider({children}){
    const[CartState,CartDispatch]=useReducer(cartReducer,{items:[]});
    function handleAddItemToCart(id){
        CartDispatch({
            type:'ADD_ITEM',
            payload: id,
        })
    }
    function handleUpdateCartItemQuantity(mealID,amount){
        CartDispatch({
            type:'UPDATE_ITEM',
            payload: {
                mealID,
                amount
            }
        })
    }
    const ctxValue={
        items:CartState.items,
        addItemToCart: handleAddItemToCart,
        updateItemQuantity: handleUpdateCartItemQuantity,
    }
    return <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>;
}
export default CartContext;