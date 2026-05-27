import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import "./Checkout.css";
import { IoArrowBackOutline } from "react-icons/io5";
import { Navigate, useNavigate } from "react-router-dom";

function Checkout() {
  //variabel för att använda navigation
  const navigate = useNavigate();

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
