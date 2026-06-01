import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import "./Checkout.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import { useLocation } from "react-router-dom";

function Checkout() {
  //variabel för att använda navigation
  const navigate = useNavigate();

  //route guards
//vill inte att man ska kunna nå checkout utan att ha varor i korgen och man ska inte kunna nå vissa sidor direkt via url
//använder en state som håller koll på vart man kommer från 
//man kan alltså bara komma till checkout via cart page OCH ifall man har varor i korgen
//detta kräver kod här i (checkout.jsx), i cart.jsx och clearcart() i en useeffect i confirmation.jsx

  //hämtar listan med varukorgsprodukter för att kolla så att man har något i varukorgen
  const { cartItems } = useCart();
  //variabel för att hålla koll på vart man kommer från
  const location = useLocation();

  // om varukorgen är tom och man inte kommer från cart page (kontrollera att state objektet är "fromCart", som vi skickade i cart.jsx), skicka tillbaka användaren till cart ist för checkout. ska inte kunna gå till checkout via url
  if (cartItems.length === 0 && !location.state?.fromCart) {
    return <Navigate to="/cart" />;
  }

  return (
    <div className="checkout__background">
      <button className="btn btn__back" onClick={() => navigate(-1)}>
        <IoArrowBackOutline className="icon__back icon" />
      </button>
      <CheckoutCard />
    </div>
  );
}

export default Checkout;
