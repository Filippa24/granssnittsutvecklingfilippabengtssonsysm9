import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import "./Checkout.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

function Checkout() {
  //variabel för att använda navigation
  const navigate = useNavigate();

  //hämtar listan med varukorgsprodukter för att kolla så att man har något i varukorgen
 const { cartItems } = useCart();

 // om varukorgen är tom, skicka tillbaka till cart ist för checkout. ska inte kunna gå till checkout via url
 if (cartItems.length === 0) {
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
