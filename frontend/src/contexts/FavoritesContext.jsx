import { createContext, useContext, useState, useEffect } from "react";

//skapa contexten
const FavoriteContext = createContext();

//provider som ska wrappa hela appen eftersom vi vill att tillståndet för favorites ska finns över hela appen
export function FavoriteProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    //hämtar favoriterna från localstorage och sparar i saved
    const saved = localStorage.getItem("favorites");
    //returnera favoriter om det finns, annars tom array
    return saved ? JSON.parse(saved) : [];
  });

  //körs när favorites ändras, sparar/sätter den uppdaterade favorites listan i localstorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addFavorite(product) {
    setFavorites((prev) => [...prev, product]);
  }

  function removeFavorite(product) {
    setFavorites((prev) => prev.filter((item) => item._id !== product._id));
  }

  //funktion för att toggla favoritikonen. some() loopar genom favorites arrayen och returnerar true när den hittar ett produkt id som matchar favoritens id
  function isFavorite(product) {
    return favorites.some((item) => item._id === product._id);
  }

  //funktion för att rensa favoriter när man går från inte inloggad till inloggad och ev blir en annan användare så återställs favoriterna
function clearFavorites() {
  setFavorites([]);
}

  return (
    <FavoriteContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite, clearFavorites }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoriteContext);
}
