import React, { useState, useEffect } from "react";
import UseFetch from "../hooks/useFetch";
import ProductCard from "./cards/ProductCard";

function Products() {
  //variabel för url
  const url = "http://localhost:3001/motorcycles";

  //hämta valfri data från db.json via usefetch-hook, döper variabeln data till products ist
  const { data: products, loading, error } = UseFetch(url);

  console.log("products:", products);
  console.log("loading:", loading);
  console.log("error:", error);

  if (loading) {
    return (
      //för att slippa se den vita blinkningen när man går från home till andra komponenter:
      <div className="loading__background">
        <p>Loading products.</p>
      </div>
    );
  }

  if (error) {
    return <p>Error loading products.</p>;
  }

  if (!products) {
    return <p>Products could not be found.</p>;
  }

  return (
    <div className="products__background">
      <div className="product__list">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} /> //skicka hela product-objektet i en variabel som heter product
        ))}
      </div>
    </div>
  );
}

export default Products;
