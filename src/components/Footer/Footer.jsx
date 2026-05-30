import "./Footer.css";
import { IoMail } from "react-icons/io5";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { useLocation } from "react-router-dom";

function Footer() {

    const location = useLocation();
 const hideFooter =
   location.pathname === "/" ||
   location.pathname.startsWith("/products/") ||
   location.pathname === "/confirmation";

 //dölj footer om url stämmer med någon av pathsen ovan
 if (hideFooter) {
   return null;
 }

    return (
      <section className="footer">
        <div className="footer__container">
          <div className="footer__text">
            <p>FAQ</p>
            <p>Terms and conditions</p>
            <p>Shipping</p>
            <p>Contact us</p>
            <p>About</p>
          </div>
            <div className="footer__icons">
              <button className="footer__icons--btn btn">
                <IoMail className="icon__close icon" />
              </button>
              <button className="footer__icons--btn btn">
                <FaLinkedin className="icon__close icon" />
              </button>
              <button className="footer__icons--btn btn">
                <FaInstagramSquare className="icon__close icon" />
              </button>
              <button className="footer__icons--btn btn">
                <FaFacebookSquare className="icon__close icon" />
              </button>
              <button className="footer__icons--btn btn">
                <IoLogoYoutube className="icon__close icon" />
              </button>
            </div>
            <h3 className="footer__est">Est. 2026</h3>
          </div>
      </section>
    );
}

export default Footer;