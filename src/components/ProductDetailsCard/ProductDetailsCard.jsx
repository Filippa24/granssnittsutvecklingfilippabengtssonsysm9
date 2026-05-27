import { useParams, Link, Navigate } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import "./ProductDetailsCard.css";
import { useCart } from "../../contexts/CartContext";
import api from "../../services/api";
import React, { useState, useEffect } from "react";

//ikoner från react icons:
import { MdClose } from "react-icons/md";

//TO-DO: VISA 3 BILDER IST FÖR BARA EN I DETAILS

//ta emot addtocart funktionen
function ProductDetailsCard() {
  //stateful variabler
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  //hämta context
  const { addToCart } = useCart();
  //variabel för att spara hämtad productid från urlen
  const { productId } = useParams();
  //variabel för att använda navigation
  const navigate = useNavigate();

   //alla produkter hämtas när sidan monteras (tom dependency array)
   useEffect(() => {
     //skapa funktionen som hämtar produkterna
     async function fetchProductById(productId) {
       try {
         //hämtar datan från apiets metod getProducts
         const data = await api.getProductById(productId);
         //sätter data om det finns eller tom array till products
         setProduct(data);
       } catch (err) {
         setError(err.message);
       } finally {
         setLoading(false);
       }
     }
     //anropa funktionen så produkterna visas
     fetchProductById(productId);
   }, []);

  if (loading) {
    return (
      //för att slippa se den vita blinkningen när man går från home till andra komponenter:
      <div className="loading__background">
        <p>Loading product details.</p>
      </div>
    );
  }

  if (error) return <p>Error loading product details.</p>;
  if (!product) return <p>Product could not be found.</p>;

  return (
    <div className="details__background">
      <button className="btn__close btn" onClick={() => navigate(-1)}>
        <MdClose className="icon__close icon" />
      </button>
      <div className="details__container">
        <h2 className="details__model--mobile">{product.model}</h2>
        <img
          src={product.images[(1, 2, 3)]}
          alt={product.model}
          className="details__image"
        ></img>
        <div className="details__text--content">
          <h2 className="details__model--desktop">{product.model}</h2>
          <div className="details__container--text">
            <div className="details__row">
              <p>
                <span className="details__title">MAKE: </span>
                {product.make}
              </p>
            </div>
            <div className="details__row">
              <p>
                <span className="details__title">TYPE: </span>
                {product.type}
              </p>
            </div>
            <div className="details__row">
              <p>
                <span className="details__title">YEAR: </span>
                {product.year}
              </p>
            </div>
            <div className="details__row">
              <p>
                <span className="details__title">HP: </span>
                {product.hp}
              </p>
            </div>
            <div className="details__row">
              <p>
                <span className="details__title">ABOUT: </span>
                {product.about}
              </p>
            </div>
          </div>
          <div className="details__row details__price">
            <p>
              <span className="details__title">PRICE: </span>
              {product.price.toLocaleString("sv-SE")} SEK
            </p>{" "}
            {/*call-back, skicka produkten till addtocart-funktionen (i app.js)*/}
            <button className="btn__small" onClick={() => addToCart(product)}>
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
