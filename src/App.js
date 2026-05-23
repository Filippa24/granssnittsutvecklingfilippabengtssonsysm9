//app.js = innehållet i vår app

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import { useState, useEffect } from "react";

//vill hantera cart i app.js eftersom tillståndet på cart ska vara tillgängligt överallt i appen

function App() {
  //LOCAL STORAGE JUST NU, ÄNDRA SEN MED BACKEND

  //variabel för att spara produkter i som läggs i varukorgen
  const [cartItems, setCartItems] = useState(() => {
    //hämta listan cartitems och lägg i saved
    const saved = localStorage.getItem("cartItems");
    //returnera saved om det fanns något sparat redan, annars returnera en tom lista
    return saved ? JSON.parse(saved) : [];
  });

  //spara i localStorage varje gång cartItems ändras
  useEffect(() => {
    //setitem tar två argument - en nyckel/namnet på datan så man kan hämta datan senare + värdet omvandlat till en string
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function AddToCart(product) {
    //kontrollera ifall stock är över 1/produkten finns i lager
    if (product.stock <= 0) return;

    // kontrollera om produkten redan finns i varukorgen
    const exists = cartItems.find((item) => item.id === product.id);

    //om produkten redan finns vill vi öka antalet av samma produkt, inte lägga till samma produkt en gång till längst ner i listan
    if (exists) {
      setCartItems((prev) =>
        prev.map(
          (item) =>
            item.id === product.id && item.quantity < product.stock //om detta är sant
              ? { ...item, quantity: item.quantity + 1 } //gör detta (ändra antalet)
              : item, // annars gör detta, returnera item utan förändring (efetrsom vi loopar genom hela listan med map, ska de items som inte är aktuella lämnas oförändrade)
        ),
      );
    } else {
      //om produkten inte redan finns, lägg till i varukorgen
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }

  function removeCartItem(product) {
    //kolla det aktuella antalet i listan med produkter, ska bara kunna ta bort om antalet är över 0
    //OBS behöver inte hämta listan på nytt eftersom den är global i app.js
    if (!cartItems.length) {
      return;
    }

    setCartItems(
      (prev) =>
        prev
          .map(
            (item) =>
              item.id === product.id //om detta är sant
                ? { ...item, quantity: item.quantity - 1 } //gör detta (ändra antalet)
                : item, // annars gör detta, returnera item utan förändring (efetrsom vi loopar genom hela listan med map, ska de items som inte är aktuella lämnas oförändrade)
          )
          .filter((item) => item.quantity > 0), // ta bort produkten om quantity är 0
    );
  }

  //funktion för trash can ikonen, ta bort alla av den produkten oavsett antal, ist för bara en åt gången
  function discardCartItem(product) {
    //uppdatera listan genom att skapa en ny version (filter) av originallistan men utan produkten vi tar bort
    //                        behåll item om dess id inte matchar produkten som ska tas bort
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/products/:productId"
          element={<ProductDetails addToCart={AddToCart} />}
        />
        {/* skicka listan cartitems till cart komponenten/url:en */}
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              setCartItems={setCartItems}
              addToCart={AddToCart}
              removeCartItem={removeCartItem}
              discardCartItem={discardCartItem}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
