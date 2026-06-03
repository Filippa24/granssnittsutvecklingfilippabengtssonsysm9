import React, { useState, createContext, useContext } from "react";
import api, { isAuthenticated } from "../services/api";
import { useFavorites } from "./FavoritesContext";

//context är till för state hantering. AuthContext hanterar all state gällande om en användare är inloggad eller inte och vi väljer var vi vill att det ska gälla (hela appen)
//skapa contexten (3 steg)

//1:
const AuthContext = createContext(null);

//2:
//provider gör datan i den tillgänglig för alla komponenter som omsluts av  den, ex: <AuthProvider><AuthProvider/>
export function AuthProvider({ children }) {
  //stateful variabel för att spara tillståndet på användaren
  //isauthenticated (från api.jsx) returnerar true/false som håller koll på om vi är inloggade eller ej
  const [authed, setAuthed] = useState(isAuthenticated());

const { clearFavorites } = useFavorites();

  async function register(userData) {
    const data = await api.register(userData);
    api.saveToken(data.accessToken);
    setAuthed(true);
  }

  async function login(token) {
    api.saveToken(token); //sparar token i localstorage via api.jsx
    setAuthed(true); //uppdaterar auth tillstånd
    clearFavorites(); //nollställ favoriter vid inlogg via favoritescontext
  }

  function logout() {
    api.logout(); //tar bort token från localstorage via api.jsx
    setAuthed(false); //uppdaterar auth tillstånd
  }

  return (
    <AuthContext.Provider value={{ authed, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//3.
//custom hook
export function useAuth() {
  return useContext(AuthContext);
}
