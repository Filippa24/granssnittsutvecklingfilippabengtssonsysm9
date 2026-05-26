import { useState } from "react";
import "./CheckoutCard.css";

function CheckoutCard() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="form">
      <div className="form__container">
        <h1 className="form__title">
          Fill in the information below to place your order.
        </h1>

        <form className="form__form">
          <input
            className="form__inputField"
            type="text"
            value={firstName}
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />{" "}
          <input
            className="form__inputField"
            type="text"
            value={lastName}
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />{" "}
          <input
            className="form__inputField"
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
          <input
            className="form__inputField"
            type="text"
            value={address}
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
        </form>

        <div className="form__buttons">
          <button className="btn__small">PAY USING CARD</button>
          <button className="btn__small">PAY USING SWISH</button>
          <button className="btn__small">PAY USING KLARNA</button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
