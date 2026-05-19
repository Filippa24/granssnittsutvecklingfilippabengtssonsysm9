import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
  //uselocation för att kontrollera att vi är på url /products, eftersom då ska vi använda navbaren med mörk bakgrund ist för transparent

  const location = useLocation();
  const isDark = location.pathname === "/products";
  const hideNavbar = location.pathname.startsWith("/products/");

  //dölj navbaren om url börjar med /products/
  if (hideNavbar) {
    return null;
  }

  return (
    // om isdark är true får navbar även klassen navbar--dark. men om isdark är false är navbar bara navbar, ingen css ändras
    <section className={`navbar ${isDark ? "navbar--dark" : ""}`}>
      <div className="navbar__mobile--container">
        <Link to="/">
          <h4 className="navbar__mobile--text">Home</h4>
        </Link>
        <Link to="/products">
          <h4 className="navbar__mobile--text">Products</h4>
        </Link>
        <h4 className="navbar__mobile--text">Cart</h4>
      </div>
      <div className="navbar__container">
        <Link to="/">
          <h4 className="navbar__text">Home</h4>
        </Link>
        <Link to="/products">
          <h4 className="navbar__text">Products</h4>
        </Link>
        <h4 className="navbar__text">Cart</h4>
        <h4 className="navbar__text">Create user</h4>
        <h4 className="navbar__text">Sign in</h4>
      </div>
    </section>
  );
}

export default Navbar;
