import React, { useState, createContext, useContext } from "react";
import api, { isAuthenticated, saveToken, logout } from "../services/api";

//context är till för state hantering. AuthContext hanterar all state gällande om en användare är inloggad eller inte och vi väljer var vi vill att det ska gälla (hela appen)
//skapa contexten (3 steg)

//1:
const AuthContext = createContext(null);

//2:
//provider gör datan i den tillgänglig för alla komponenter som omsluts av  den, ex: <AuthProvider><AuthProvider/>
export function AuthProvider({ children }) {
  //stateful variabel för att spara tillståndet på användaren 
  //isauthenticated (från api.jsx) returnerar true/false som håller koll på om vi är inloggade eller ej
  const [authed, setAuthed] = useState(isAuthenticated);

  async function register(userData) {
    //BYT TILL RIKTIGT API ANROP NÄR BACKEND FINNS (ändra i register i api.jsx också)
    // const data = await api.register(userData);
    // saveToken(data.token);
    setAuthed(true);
  }

  return (
    <AuthContext.Provider value={{ authed, register }}>
      {children}
    </AuthContext.Provider>
  );
}

//3.
//custom hook
export function useAuth() {
  return useContext(AuthContext);
}

