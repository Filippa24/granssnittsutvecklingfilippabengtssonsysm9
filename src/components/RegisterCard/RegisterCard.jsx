import "./RegisterCard.css";
import api from "../../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuth } from "../../contexts/AuthContext";

function RegisterCard() {
  //stateful variabler
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const { register } = useAuth();
  const navigate = useNavigate();

  //funktion som körs när man trycker på create user knappen
  function handleRegister() {
    //hämtar nya error från validatemetoden
    const newErrors = validate();

    //om newErrors innehåller några värden innebär det att vi har fått fel. spara felen i error via seterror
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    //anropa metoden register (i authcontext) och skapa ett objekt att skicka med med användarens input
    register({
      username,
      password,
      confirmPassword,
      email,
    });
    //nollställ error
    setError({});
    //töm inputfält via metod nedan
    clearInput();

    //navigera till products vid successful register
    navigate("/products");
  }

  function validate() {
    //variabel för att spara nya errors som kan skapas när man lägger en order. skapar ett objekt eftersom vi vill kunna nå det specifika värdet lättar än om vi skulle haft det i en array och behövt loopa
    const newErrors = {};

    //om stateful-variablerna är false då innebär det att vi har ett error på den variabeln och värdet för motsvarande variabel i newErrors sätts till true
    if (!username) newErrors.username = true;
    if (!password) newErrors.password = true;
    if (!confirmPassword) newErrors.confirmPassword = true;
    if (!email) newErrors.email = true;
    //om email är true men email inte innehåller @, då är det fortfarande error
    if (email && !email.includes("@")) newErrors.emailFormat = true;
    //om password och confirmpassword inte matchar, sätt nytt fel
    if (password !== confirmPassword) newErrors.mismatchedPasswords = true;

    return newErrors;
  }

  //funktion för att tömma inputfält
  function clearInput() {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
  }

  return (
    <div className="registerCard">
      <div className="registerCard__container">
        <h1 className="registerCard__title">
          Join the family, create a user below.
        </h1>

        <div className="registerCard__wrapper">
          <form className="registerCard__form">
            <input
              className={`registerCard__inputField ${error.username && !username ? "registerCard__inputField--error" : ""}`}
              type="text"
              value={username}
              placeholder="Username"
              onChange={(e) => {
                //sätt värdet användaren matar in till username
                setUsername(e.target.value);
                //skriv över tidigare error med "" = inget error längre eftersom användaren har börjat skriva
                setError((prev) => ({ ...prev, username: "" }));
              }}
            />{" "}
            <input
              className={`registerCard__inputField ${error.password || error.mismatchedPasswords ? "registerCard__inputField--error" : ""}`}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                //sätt värdet användaren matar in till password
                setPassword(e.target.value);
                //skriv över tidigare error med "" = inget error längre eftersom användaren har börjat skriva
                setError((prev) => ({ ...prev, password: "" }));
              }}
            />{" "}
            <input
              //
              className={`registerCard__inputField ${error.confirmPassword || error.mismatchedPasswords ? "registerCard__inputField--error" : ""}`}
              type="password"
              value={confirmPassword}
              placeholder="Confirm password"
              onChange={(e) => {
                //sätt värdet användaren matar in till confirm password
                setConfirmPassword(e.target.value);
                setError((prev) => ({
                  ...prev,
                  confirmPassword: "",
                  mismatchedPasswords: "",
                }));
              }}
            />{" "}
            <input
              className={`registerCard__inputField ${error.email || error.emailFormat ? "registerCard__inputField--error" : ""}`}
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => {
                //sätt värdet användaren matar in till email
                setEmail(e.target.value);
                //om det användaren matar in innehåller ett @ skriver vi över error med "" (det är inget error längre, error är tomt)
                if (e.target.value.includes("@")) {
                  setError((prev) => ({
                    ...prev,
                    email: "",
                    emailFormat: "",
                  }));
                }
              }}
            />
          </form>

          {/*skicka error objektet till komponenten (props drilling), skicka också ett objekt som berättar vilken page ErrorMessage ska visas i så att jag kan toggla och visa rätt error meddelande för just detta card */}
          <ErrorMessage error={error} page={register} />
        </div>

        <div className="registerCard__button">
          <button className="btn__small" onClick={handleRegister}>
            CREATE USER
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterCard;
