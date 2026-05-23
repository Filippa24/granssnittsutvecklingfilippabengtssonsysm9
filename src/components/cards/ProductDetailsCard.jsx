import { useParams, Link, Navigate } from "react-router-dom";
import UseFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

//ikoner från react icons:
import { MdClose } from "react-icons/md";

//TO-DO: VISA 3 BILDER IST FÖR BARA EN I DETAILS 

//ta emot addtocart funktionen
function ProductDetailsCard({addToCart}) {
  //variabel för att spara hämtad productid från urlen
  const { productId } = useParams();
  //variabel för att använda navigation
  const navigate = useNavigate();

  //hämta och spara urlen för en specifik produkt
  const url = `http://localhost:3001/motorcycles/${productId}`;

  //hämta datan från db.json via useFetch hook, skicka in urlen så att vi får hämtat rätt data för rätt produkt
  const { data: product, loading, error } = UseFetch(url);

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
            </p>                         {/*call-back, skicka produkten till addtocart-funktionen (i app.js)*/}
            <button className="btn__small" onClick={(() => addToCart(product))}>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsCard;
