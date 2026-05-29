import CartProductCard from "../CartProductCard/CartProductCard";
import "./ConfirmationCard.css";
import { getProducts } from "../../services/api";
import { useCart } from "../../contexts/CartContext";

function ConfirmationCard() {

    //hämta ordern fårn cartcontext
    const { order } = useCart();



  return (
    <div className="confirmation">
      <div className="confirmation__container">
        <h1 className="confirmation__title">Thank you for your purchase.</h1>

        <div className="confirmation__products">
          {/* mappa och visa produkterna från ordern */}
          {order?.items.map((product) => (
            <div className="confirmation__productDetails">
              {" "}
              <CartProductCard
                key={product.id}
                product={product}
                //döljer knapparna från original cartproductcard så jag kan återanävnda den här
                showButtons={false}
              />
            </div>
          ))}
        </div>

        <div className="confirmation__details">
          <p>
            <span className="confirmation__details__title">ORDER NUMBER </span>#
            {order?.orderNumber}
          </p>
          <p>
            <span className="confirmation__details__title">
              ESTIMATED DELIVERY{" "}
            </span>
            {order?.deliveryDate}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationCard;
