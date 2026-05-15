//app.js = innehållet i vår app

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./style.css";
import Hero from "./components/Hero";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
