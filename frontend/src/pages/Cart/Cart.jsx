import CartProductCard from "../../components/CartProductCard/CartProductCard";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import "../../components/ErrorMessage/ErrorMessage.css";
import { useCart } from "../../contexts/CartContext";
import Footer from "../../components/Footer/Footer";

function Cart() {
  //variabel för att använda navigation
  const navigate = useNavigate();

  //hämta cartItems listan från cartcontext
  const { cartItems } = useCart();

  return (
    <div className="cart__container">
      <button className="btn__close btn" onClick={() => navigate("/products")}>
        <MdClose className="icon__close" />
      </button>
      <h1 className="cart__title">Your cart</h1>
      <div className="cart__productList">
        {/* mappa varje cartitem, koppla ihop med id. för varje cartitem skcika ett objekt som vi döper till product till cartProductCard för att skcika ut den aktuella produkten från cartitems listan*/}
        {cartItems.map((product) => (
          <CartProductCard key={product._id} product={product} />
        ))}
      </div>
      <div className="cart__checkout">
        {/* visa error om varukorgen är tom */}
        {cartItems.length === 0 && (
          <p className="error__message">Your cart is empty.</p>
        )}
        <p>
          <span>Total </span>
          {cartItems
            .reduce((sum, p) => sum + p.price * p.quantity, 0)
            .toLocaleString("sv-SE")}{" "}
          SEK
        </p>

        <button
          className="btn__small"
          //när man klickar på checkout-knappen navigerar vi till checkout och vi skickar med ett objekt som säger att vi kommer från cart
          //router guards: på så sätt vet sen checkout att vi "får" vara på den pagen (se checkout.jsx)
          onClick={() => navigate("/checkout", { state: { fromCart: true } })}
          //knappen är disabled om det inte finns några varor i korgen
          disabled={cartItems.length === 0}
        >
          CHECK OUT
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
