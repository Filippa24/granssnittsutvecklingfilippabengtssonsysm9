import { useState } from "react";
import "./CheckoutCard.css";
import { useCart } from "../../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

function CheckoutCard() {
  //stateful variabler
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
  });
  const { placeOrder } = useCart();
  const navigate = useNavigate();

  //funktion som körs när man trycker på någon av PAY knapparna
  function handlePayment() {
    //hämtar nya error från validatemetoden
    const newErrors = validate();

    //om newErrors innehåller några värden innebär det att vi har fått fel. spara felen i error via seterror
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    //anropa metoden placeorder (i cartcontext) och skapa ett objekt att skicka med. Skapar ordern med produkterna i cartitems, kundens info och datum
    placeOrder({
      firstName,
      lastName,
      email,
      address,
    });
    //nollställ error
    setError({});
    //töm inputfält via metod nedan
    clearInput();

    //skicka ett state objekt som säger att vi kommer från checkout page
    navigate("/confirmation", { state: { fromCheckout: true } });
  }

  function validate() {
    //variabel för att spara nya errors som kan skapas när man lägger en order. skapar ett objekt eftersom vi vill kunna nå det specifika värdet lättar än om vi skulle haft det i en array och behövt loopa
    const newErrors = {};

    //om stateful-variablerna är false då innebär det att vi har ett error på den variabeln och värdet för motsvarande variabel i newErrors sätts till true
    if (!firstName) newErrors.firstName = true;
    if (!lastName) newErrors.lastName = true;
    if (!email) newErrors.email = true;
    if (!address) newErrors.address = true;
    //om email är true men email inte innehåller @, då är det fortfarande error
    if (email && !email.includes("@")) newErrors.emailFormat = true;

    return newErrors;
  }

  //funktion för att tömma inputfält
  function clearInput() {
    setFirstName("");
    setLastName("");
    setEmail("");
    setAddress("");
  }

  return (
    <div className="form">
      <div className="form__container">
        <h1 className="form__title">
          Fill in the information below to place your order.
        </h1>

        <div className="form__wrapper">
          <form className="form__form">
            <input
              className={`form__inputField ${error.firstName && !firstName ? "form__inputField--error" : ""}`}
              type="text"
              value={firstName}
              placeholder="First name"
              onChange={(e) => {
                //sätt värdet användaren matar in till firstname
                setFirstName(e.target.value);
                //skriv över tidigare error med "" = inget error längre eftersom användaren har börjat skriva
                setError((prev) => ({ ...prev, firstName: "" }));
              }}
            />{" "}
            <input
              className={`form__inputField ${error.lastName && !lastName ? "form__inputField--error" : ""}`}
              type="text"
              value={lastName}
              placeholder="Last name"
              onChange={(e) => {
                //sätt värdet användaren matar in till lastname
                setLastName(e.target.value);
                //skriv över tidigare error med "" = inget error längre eftersom användaren har börjat skriva
                setError((prev) => ({ ...prev, lastName: "" }));
              }}
            />{" "}
            <input
              //
              className={`form__inputField ${error.email || error.emailFormat ? "form__inputField--error" : ""}`}
              type="text"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                //sätt värdet användaren matar in till email
                setEmail(e.target.value);
                //om det användaren matar in innehåller ett @ skriver vi över error med "" (det är inget error längre, error är tomt)
                if (e.target.value.includes("@")) {
                  setError((prev) => ({ ...prev, email: "", emailFormat: "" }));
                }
              }}
            />{" "}
            <input
              className={`form__inputField ${error.address && !address ? "form__inputField--error" : ""}`}
              type="text"
              value={address}
              placeholder="Address"
              onChange={(e) => {
                //sätt värdet användaren matar in till address
                setAddress(e.target.value);
                //skriv över tidigare error med "" = inget error längre eftersom användaren har börjat skriva
                setError((prev) => ({ ...prev, address: "" }));
              }}
            />
          </form>

          {/*skicka objektet till komponenten, props drilling, skicka också ett objekt som berättar vilken page ErrorMessage ska visas i så att jag kan toggla och visa rätt error meddelande för just detta card*/}
          <ErrorMessage error={error} page={"checkout"}/>
        </div>

        <div className="form__buttons">
          <button className="btn__small" onClick={handlePayment}>
            PAY USING CARD
          </button>
          <button className="btn__small" onClick={handlePayment}>
            PAY USING SWISH
          </button>
          <button className="btn__small" onClick={handlePayment}>
            PAY USING KLARNA
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
