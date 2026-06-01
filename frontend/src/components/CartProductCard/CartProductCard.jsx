import "./CartProductCard.css";
import { useCart } from "../../contexts/CartContext";

//ikoner:
import { MdHorizontalRule } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";

//skicka med prop showButtons eftersom jag återanvänder detta card i confirmation page och då vill jag behålla allt förutom knapparna
function CartProductCard({product, showButtons = true}) {
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
              {/*visa knapparna om showbuttons är true (om det till vänster om && är true, visa det till höger )*/}
              {showButtons && (
                <button className="btn" onClick={() => addToCart(product)}>
                  <FaPlus className="icon" />
                </button>
              )}

              <p className="cartProduct__quantity">{product.quantity}</p>

              {/*visa knapparna om showbuttons är true (om det till vänster om && är true, visa det till höger )*/}
              {showButtons && (
                <button className="btn" onClick={() => removeCartItem(product)}>
                  <MdHorizontalRule className="icon" />
                </button>
              )}
            </div>

            {/*visa knapparna om showbuttons är true (om det till vänster om && är true, visa det till höger )*/}
            {showButtons && (
              <button className="btn" onClick={() => discardCartItem(product)}>
                <FaTrash className="icon trashCan" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartProductCard;
