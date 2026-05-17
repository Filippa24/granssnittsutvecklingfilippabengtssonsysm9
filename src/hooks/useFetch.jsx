import React, { useState, useEffect } from "react";

//skapa hook som hämtar data från db.json, skriv på ett ställe och hämta där det behövs.

//ta emot url som parameter. urlen är för det specifika du vill hämta
function UseFetch(url) {
  //stateful variabler:
  const [data, setData] = useState(null); //data ska vaar null som standard
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(url);
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        //finally blocket körs alltid, oavsett om det gick bra eller om vi fångade ett fel
        setLoading(false);
      }
    };

    fetchData(); //anropa fetchdata för att köra fetchdata
  }, [url]); //detta körs direkt(standard) och när url ändras

  //returnerar ett objekt med dessa värden. kan sen hämta och visa upp valt värde där man anropar denna funktion
  return { data, loading, error };
}

export default UseFetch;
