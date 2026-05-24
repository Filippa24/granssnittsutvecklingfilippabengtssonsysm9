import { createContext, useContext, useState, useEffect } from "react";

//context är till för state hantering. acrtContext hanterar all state gällande cart och vi väljer var vi vill att det ska gälla (hela appen)
//skapa contexten (3 steg)

//1:
const CartContext = createContext();

//2:
//provider gör datan i den tillgänglig för alla komponenter som omsluts av  den, ex: <CartProvider><CartProvider/>
export function CartProvider() {
  //variabel för att spara produkter i som läggs i varukorgen
  const [cartItems, setCartItems] = useState(() => {
    //hämta listan cartitems och lägg i saved
    const saved = localStorage.getItem("cartItems");
    //returnera saved om det fanns något sparat redan, annars returnera en tom lista
    return saved ? JSON.parse(saved) : [];
  });

  //spara i localStorage varje gång cartItems ändras
  useEffect(() => {
    //setitem tar två argument - en nyckel/namnet på datan så man kan hämta datan senare + värdet omvandlat till en string
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  function AddToCart(product) {
    //kontrollera ifall stock är över 1/produkten finns i lager
    if (product.stock <= 0) return;

    // kontrollera om produkten redan finns i varukorgen
    const exists = cartItems.find((item) => item.id === product.id);

    //om produkten redan finns vill vi öka antalet av samma produkt, inte lägga till samma produkt en gång till längst ner i listan
    if (exists) {
      setCartItems((prev) =>
        prev.map(
          (item) =>
            item.id === product.id && item.quantity < product.stock //om detta är sant
              ? { ...item, quantity: item.quantity + 1 } //gör detta (ändra antalet)
              : item, // annars gör detta, returnera item utan förändring (efetrsom vi loopar genom hela listan med map, ska de items som inte är aktuella lämnas oförändrade)
        ),
      );
    } else {
      //om produkten inte redan finns, lägg till i varukorgen
      setCartItems((prev) => [...prev, { ...product, quantity: 1 }]);
    }
  }

  function removeCartItem(product) {
    setCartItems(
      (prev) =>
        prev
          .map(
            (item) =>
              item.id === product.id //om detta är sant
                ? { ...item, quantity: item.quantity - 1 } //gör detta (ändra antalet)
                : item, // annars gör detta, returnera item utan förändring (efetrsom vi loopar genom hela listan med map, ska de items som inte är aktuella lämnas oförändrade)
          )
          .filter((item) => item.quantity > 0), // ta bort produkten om quantity är 0
    );
  }

  //funktion för trash can ikonen, ta bort alla av den produkten oavsett antal, ist för bara en åt gången
  function discardCartItem(product) {
    //uppdatera listan genom att skapa en ny version (filter) av originallistan men utan produkten vi tar bort
    //                        behåll item om dess id inte matchar produkten som ska tas bort
    setCartItems((prev) => prev.filter((item) => item.id !== product.id));
  }
}

//3.
//custom hook
export function useCart() {
  return useContext(CartContext);
}