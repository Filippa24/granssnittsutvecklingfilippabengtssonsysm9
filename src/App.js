//app.js = innehållet i vår app

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Products from "./components/Products";

function App() {
  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </Router>
  );
}

export default App;
