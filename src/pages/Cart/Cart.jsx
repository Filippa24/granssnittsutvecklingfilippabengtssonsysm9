import CartProductCard from "../../components/CartProductCard/CartProductCard";
import { MdClose } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "./Cart.css";
import { useCart } from "../../contexts/CartContext";


function Cart() {
  //variabel för att använda navigation
  const navigate = useNavigate();

  //hämta cartItems listan från cartcontext
  const { cartItems } = useCart();

  return (
    <div className="cart__container">
      <button className="btn__close btn" onClick={() => navigate(-1)}>
        <MdClose className="icon__close" />
      </button>
      <h1 className="cart__title">Your cart</h1>
      <div className="cart__productList">
        {/* mappa varje cartitem, koppla ihop med id. för varje cartitem skcika ett objekt som vi döper till product till cartProductCard för att skcika ut den aktuella produkten från cartitems listan*/}
        {cartItems.map((product) => (
          <CartProductCard key={product.id} product={product} />
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

        <button
          className="btn__small"
          onClick={() => navigate("/checkout")}
        >
          CHECK OUT
        </button>
      </div>
    </div>
  );
}

export default Cart;
