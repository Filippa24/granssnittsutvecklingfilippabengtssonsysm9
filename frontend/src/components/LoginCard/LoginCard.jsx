import "./LoginCard.css";
import api from "../../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useAuth } from "../../contexts/AuthContext";

function LoginCard() {
  //stateful variabler
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    username: "",
    password: "",
    general: "",
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  //funktion som körs när man trycker på login knappen
  async function handleLogin() {
    //hämtar nya error från validatemetoden
    const newErrors = validate();

    //om newErrors innehåller några värden innebär det att vi har fått fel. spara felen i error via seterror
    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }
    try {
      const data = await api.login({ username, password });
      if (data.accessToken) {
        login(data.accessToken);
        //nollställ error
        setError({});
        //töm inputfält via metod nedan
        clearInput();
        //navigera till products vid successful login
        navigate("/products");
      }

    } catch (err) {
      //sätter ett generellt felmeddelande för ev andra problem med inloggning
      setError({ general: err.message });
    }
  }

  function validate() {
    //variabel för att spara nya errors som kan skapas när man loggar in. skapar ett objekt eftersom vi vill kunna nå det specifika värdet lättar än om vi skulle haft det i en array och behövt loopa
    const newErrors = {};

    //om stateful-variablerna är false då innebär det att vi har ett error på den variabeln och värdet för motsvarande variabel i newErrors sätts till true
    if (!username) newErrors.username = true;
    if (!password) newErrors.password = true;

    return newErrors;
  }

  //funktion för att tömma inputfält
  function clearInput() {
    setUsername("");
    setPassword("");
  }

  return (
    <div className="loginCard">
      <div className="loginCard__container">
        <div className="loginCard__div">
          <h1 className="loginCard__title">Sign in to your account.</h1>
          <p>
            Don't have an account? Click{" "}
            <Link to="/register" className="loginCard__link">
              here
            </Link>{" "}
            to register.
          </p>
        </div>

        <div className="loginCard__wrapper">
          <form className="loginCard__form">
            <input
              className={`loginCard__inputField ${(error.username && !username) || error.general ? "loginCard__inputField--error" : ""}`}
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
              className={`loginCard__inputField ${(error.password && !password) || error.general ? "loginCard__inputField--error" : ""}`}
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                //sätt värdet användaren matar in till password
                setPassword(e.target.value);
                //skriv över tidigare error med "" = inget error längre eftersom användaren har börjat skriva
                setError((prev) => ({ ...prev, password: "" }));
              }}
            />
          </form>

          {/*skicka error objektet till komponenten (props drilling), skicka också vilken page ErrorMessage ska visas i så att jag kan toggla och visa rätt error meddelande för just detta card */}
          <ErrorMessage error={error} page="login" />
        </div>

        <div className="loginCard__button">
          <button className="btn__small" onClick={handleLogin}>
            LOG IN
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginCard;
