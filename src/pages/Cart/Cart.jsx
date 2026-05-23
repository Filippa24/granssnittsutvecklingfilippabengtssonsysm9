import CartProductCard from "../../components/CartProductCard/CartProductCard";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

//ta emot listan med cartItems från app.js / när man trycker på cart länken
function Cart({
  cartItems,
  setCartItems,
  addToCart,
  removeCartItem,
  discardCartItem,
}) {
  //variabel för att använda navigation
  const navigate = useNavigate();
  return (
    <div className="cart__container">
      <button className="btn__close btn" onClick={() => navigate(-1)}>
        <MdClose className="icon__close" />
      </button>
      <h1 className="cart__title">Your cart</h1>
      <div className="cart__productList">
        {/* mappa varje cartitem, koppla ihop med id. för varje cartitem skcika ett objekt som vi döper till product till cartProductCard för att skcika ut den aktuella produkten från cartitems listan*/}
        {cartItems.map((product) => (
          <CartProductCard
            key={product.id}
            product={product}
            cartItems={cartItems}
            setCartItems={setCartItems}
            addToCart={addToCart}
            removeCartItem={removeCartItem}
            discardCartItem={discardCartItem}
          />
        ))}
      </div>
      <div className="cart__checkout">
        <p>
          <span>Total </span>
          {cartItems
            .reduce((sum, p) => sum + p.price * p.quantity, 0)
            .toLocaleString("sv-SE")}{" "}
          SEK
        </p>

        <button className="btn__small">CHECK OUT</button>
      </div>
    </div>
  );
}

export default Cart;
