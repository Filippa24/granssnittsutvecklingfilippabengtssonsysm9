  //variabel för url
  const API_BASE = "http://localhost:3001";

  //generell request funktion som vi kan återanvända, använder den vid varje request
  //ta emot 2 saker, pathen och vilken typ av metod det är post/delete osv, men det läggs som options
async function request(path, options) {
  //1 hämta headers från options om de finns annars skapa tomt objekt
  const headers = options.headers || {};
  
  //sätter formatet på datan så att servern vet hur den ska läsa datan
  headers["Content-Type"] = "application/json";

  const response = await fetch(`${API_BASE}${path}`, {
    //hämta allt från options, method, body, headers osv med en spread (...)
    ...options,
    //skicka med headers
    headers,
  });

  //spara svaret från servern i text-form
  const text = await response.text();

  //variabel att spara data i 
  let data = null;

  try {
    //om det finns data i text gör om texten till json och spara i data
    if (text) {
      data = JSON.parse(text);
    } else {
      data = null;
    }
  } catch (error) {
    //om json krashar, konvertera till text
    data = text;
  }

  if (!response.ok) {
    throw new Error("Request failed");
  }
  return data;
}

export async function getProducts() {
  return request("/motorcycles", {
    method: "GET",
  });
}

export default {
  getProducts,
};