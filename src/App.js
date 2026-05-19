//app.js = innehållet i vår app

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:productId" element={<ProductDetails/>}/>
        </Routes>
      </Router>
  );
}

export default App;
