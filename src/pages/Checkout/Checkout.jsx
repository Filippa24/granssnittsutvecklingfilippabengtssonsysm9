import CheckoutCard from "../../components/CheckoutCard/CheckoutCard";
import "./Checkout.css";
import { IoArrowBackOutline } from "react-icons/io5";

function Checkout() {
  return (
    <div className="checkout__background">
      <button className="btn btn__back">
        <IoArrowBackOutline className="icon__back icon" />
      </button>
      <CheckoutCard />
    </div>
  );
}

export default Checkout;
