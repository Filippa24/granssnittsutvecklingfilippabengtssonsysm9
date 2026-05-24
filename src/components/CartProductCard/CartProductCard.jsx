import "./CartProductCard.css";
import { useCart } from "../../contexts/CartContext";

//ikoner:
import { MdHorizontalRule } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

function CartProductCard({product}) {
  const { addToCart, removeCartItem, discardCartItem } = useCart();

  return (
    <div className="cartProduct__background">
      <div className="cartProduct__container">
        <img
          src={product.images[0]}
          alt={product.model}
          className="cartProduct__image"
        ></img>
        <div className="cartProduct__info">
          <div className="cartProduct__text">
            <h3 className="cartProduct__title">{product.model}</h3>
            <p className="cartProduct__price">
              {product.price.toLocaleString("sv-SE")} SEK
            </p>
          </div>

          <div className="cartProduct__icons">
            <div className="cartProduct__quantity--container">
              <button className="btn" onClick={() => addToCart(product)}>
                <FaPlus className="icon" />
              </button>

              <p className="cartProduct__quantity">{product.quantity}</p>
              <button className="btn" onClick={() => removeCartItem(product)}>
                <MdHorizontalRule className="icon" />
              </button>
            </div>
            <button className="btn" onClick={() => discardCartItem(product)}>
              <FaTrash className="icon trashCan" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
