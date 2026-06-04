import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  //uselocation för att kontrollera att vi är på url /products, eftersom då ska vi använda navbaren med mörk bakgrund ist för transparent

  const location = useLocation();
  const isDark =
    location.pathname === "/products" || location.pathname === "/cart";
 
  return (
    // om isdark är true får navbar även klassen navbar--dark. men om isdark är false är navbar bara navbar, ingen css ändras
    <section className={`navbar ${isDark ? "navbar--dark" : ""}`}>
      <div className="navbar__container">
        <Link to="/">
          <h4 className="navbar__text">Home</h4>
        </Link>
        <Link to="/products">
          <h4 className="navbar__text">Products</h4>
        </Link>
        <Link to="/cart">
          <h4 className="navbar__text">Cart</h4>
        </Link>
        <Link to="/register">
          <h4 className="navbar__text">Register</h4>
        </Link>
        <Link to="/login">
          <h4 className="navbar__text">Log in</h4>
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
