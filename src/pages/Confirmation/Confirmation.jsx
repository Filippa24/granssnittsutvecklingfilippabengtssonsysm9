import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCart } from "../../contexts/CartContext";

function Confirmation() {

     const location = useLocation();
     //för att kunna använda clearcart() från cartcontext
     const { clearCart } = useCart();

 useEffect(() => {
  // töm cart när confirmation mountas (tom dependency array) eftersom vi vill att tillståndet för cart ska följa med till confirmation så att vi inte blir blockerade från att nå denna sida (route guards, se checkout.jsx)
 clearCart();  
}, []);

//om vi inte kommer från checkout (försöker gå via url) redirect till home page
     if (!location.state?.fromCheckout) {
       return <Navigate to="/" />;
     }

  return <div>Confirmation</div>;
}

export default Confirmation;
