//app.js = innehållet i vår app

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./style.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
