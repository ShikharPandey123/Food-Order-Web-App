import  headerImg from '../assets/logo.jpg';
import Button from './UI/Button.jsx';
import CartModal from './CartModal.jsx';
import CartContext from "../store/CartContext.jsx";

export default function Header(){
    const modal = useRef();
    const {items} = useContext(CartContext);
  
    const cartQuantity =items.length;
  
    function handleOpenCartClick() {
      modal.current.open();
    }
  
    let modalActions = <button>Close</button>;
  
    if (cartQuantity > 0) {
      modalActions = (
        <>
          <button>Close</button>
          <button>Checkout</button>
        </>
      );
    }
    return(
        <>
        <CartModal
        ref={modal}
        title="Your Cart"
        actions={modalActions}
        />
        <div id="main-header">
            <div id="title">
                <img src={headerImg} alt='Header image'/>
                <h1>REACTFOOD</h1>
            </div>
            <Button textOnly onClick={handleOpenCartClick}>Cart ({cartQuantity})</Button>
        </div>
        </>
    );
}