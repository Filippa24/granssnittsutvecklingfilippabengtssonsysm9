//ta emot product-objektet från products.jsx
function ProductCard({product}) {
    return (
      <div className="product__container">
        <h1 className="product__title dynamicTxt">{product.model}</h1>
        <img
          src={product.images[0]}
          alt={product.model}
          className="product__image"
        ></img>
        <p className="product__price dynamicTxt">
          {/* .toLocaleString("sv-SE") för att formattera det till pris i svenska (ger mellanrum i priset frö att det ska vara lättare att läsa) */}
          {product.price.toLocaleString("sv-SE")} SEK
        </p>
      </div>
    );
}

export default ProductCard;