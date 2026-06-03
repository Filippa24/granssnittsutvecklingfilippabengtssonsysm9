import React, { useState, useEffect } from "react";
import api from "../../services/api";
import ProductCard from "../../components/ProductCard/ProductCard";
import FilterCard from "../../components/FilterCard/FilterCard";
import "./Products.css";
import Footer from "../../components/Footer/Footer";
import { useFavorites } from "../../contexts/FavoritesContext";

function Products() {
  //stateful variabler:
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //variabel för vilket li man väljer i filter drop down
  const [selectedMake, setSelectedMake] = useState(null);

  const { favorites } = useFavorites();

  //alla produkter hämtas när sidan monteras (tom dependency array)
  useEffect(() => {
    //skapa funktionen som hämtar produkterna
    async function fetchProducts() {
      try {
        //hämtar datan från apiets metod getProducts
        const data = await api.getProducts();
        //sätter data om det finns eller tom array till products
        setProducts(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    //anropa funktionen så produkterna visas
    fetchProducts();
  }, []);

  //filtrera produkter baserat på make eller favorites (filter drop down)
  const filteredProducts =
    selectedMake === "favorites"
      ? products.filter((p) => favorites.some((f) => f._id === p._id))
      : selectedMake
        ? products.filter((p) => p.make === selectedMake)
        : products;

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
    <section className="products">
      <div className="products__background">
        <div className="products__layout">
          <div className="products__list">
            {/* mappar filteredproducts ist för bara products eftersom filteredproducts kan returnera både filtrerade produkter eller produkter beroende på situation, products kunde bara returnera alla products utan filter*/}
            {filteredProducts.length === 0 && selectedMake === "favorites" ? (
              <p className="noFavorites__text">No favorites added yet.</p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} /> //skicka hela product-objektet i en variabel som heter product
              ))
            )}
          </div>
          {/* när man väljer li i filtret (onSelectMake), sätts setSelectedMake. detta görs via filtercard */}
          <FilterCard
            onSelectMake={setSelectedMake}
            selectedMake={selectedMake}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
}

export default Products;
