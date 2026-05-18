import React, { useState, useEffect } from "react";
import UseFetch from "../hooks/useFetch";
import ProductCard from "./cards/ProductCard";
import FilterCard from "./cards/FilterCard";

function Products() {
  //variabel för url
  const url = "http://localhost:3001/motorcycles";
   //hämta valfri data från db.json via usefetch-hook, döper variabeln data till products ist
  const { data: products, loading, error } = UseFetch(url);

  //filtrera produkter baserat på make (filter drop down)------------------------------------------------------
  //variabel för vilket li man väljer i filter drop down
  const [selectedMake, setSelectedMake] = useState(null);

  //om selectedMake är true visas de filtrerade produkterna annars visas alla produkter. värdena sparas i filteredProducts
  const filteredProducts = selectedMake ? products.filter(p => p.make === selectedMake) : products;
//-------------------------------------------------------------------------------------------------------------

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

  if (error) return <p>Error loading products.</p>;
  if (!products) return <p>Products could not be found.</p>;

  return (
    <div className="products__background">
      <div className="products__layout">
        <div className="product__list">
          {/* mappar filteredproducts ist för bara products eftersom filteredproducts kan returnera både filtrerade produkter eller produkter beroende på situation, products kunde bara returnera alla products utan filter*/}
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> //skicka hela product-objektet i en variabel som heter product
          ))}
        </div>
        {/* när man väljer li i filtret (onSelectMake), sätts setSelectedMake. detta görs via filtercard */}
        <FilterCard
          onSelectMake={setSelectedMake}
          selectedMake={selectedMake}
        />
      </div>
    </div>
  );
}

export default Products;
