import { useNavigate } from "react-router-dom";
import { useState } from "react";

//ta emot product-objektet från products.jsx
function ProductCard({product}) {
  //ändrar på hover här ist för css eftersom jag ville inte att title och price fortfarande skulle vara röda när man slutade hover på image men fortfarande hover på själva containern, border runt image gick tillbaka till grått medan title och price fortfarande var röda tills man gick ur containern, ville ha förändringen fast bara genom att hover på image)
  const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();

    return (
      <div
        className="product__container"
        onClick={() => navigate(`/products/${product.id}`)}
      >
        <h1
          className={`product__title ${isHovered ? "product__title--hovered" : ""}`}
        >
          {product.model}
        </h1>
        <img
          src={product.images[0]}
          alt={product.model}
          className="product__image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        ></img>
        <p
          className={`product__price ${isHovered ? "product__price--hovered" : ""}`}
        >
          {/* .toLocaleString("sv-SE") för att formattera det till pris i svenska (ger mellanrum i priset frö att det ska vara lättare att läsa) */}
          {product.price.toLocaleString("sv-SE")} SEK
        </p>
      </div>
    );
}

export default ProductCard;