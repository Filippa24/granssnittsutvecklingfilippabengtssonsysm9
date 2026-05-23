import ProductDetailsCard from "../../components/ProductDetailsCard/ProductDetailsCard";

function ProductDetails({ addToCart }) {
  return (
    <section className="productDetails">
      <div className="container">
        <ProductDetailsCard addToCart={addToCart} />
      </div>
    </section>
  );
}

export default ProductDetails;
