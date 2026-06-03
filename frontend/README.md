
# E-handel för motorcyklar

Jag har skapat en responsiv Single Page Application i form av en e-handel åt ett påhittat företag som säljer motorcyklar.

## Om appen
Appen är designad i Figma och utvecklad i JavaScript och CSS. Frontend är gjord i React och kommunicerar med backend via ett API. Jag började med en tillfällig db.json-server under utvecklingen som sedan ersattes av en MongoDB databas i backend. Appens backend är gjord i Node.js och Express. Det finns möjlighet att skapa användare och att logga in. Autentisering görs med JWT och bcrypt används för lösenordshashning. Tillstånd hanteras med useState och Contexts.

## Funktionalitet
- Produktlista med filtrering på favoriter och märke
- Varukorg, checkout och orderbekräftelse
- Registrering och inloggning med JSON Web Token
- Ordrar sparas i databasen för inloggade användare
- Möjlighet att favoritmarkera produkter  

## Mappstruktur
### Frontend
- `public/` - media, bilder 
- `src/components/` - varje komponent består av en egen mapp som innehåller en fil för jsx och en fil för css
- `src/contexts/` - CartContext, AuthContext, FavoritesContext
- `src/hooks/` - custom hooks
- `src/pages/` - en mapp per sida med en fil för jsx och en fil för css

### Backend
- `config/` - dbConnection och seeding 
- `controllers/` - logik för API-anrop 
- `middleware/` - errorHandler och validateTokenHandler 
- `models/` - Mongoose-modeller 
- `routes/` - API-routes

# Klona och starta mitt projekt

## Krav:

- Node.js installerat
- MongoDB databas

### Backend:

- Skapa en .env fil i backend, klistra in detta och ändra till egna värden:

```
PORT = 5000
CONNECTION_STRING = dinMongoDBConnectionString
ACCESS_TOKEN_SECRET = valfrittHemligtVärde
SEED_PASSWORD = valfrittLösenordFörTestAnvändare
```

- Öppna en terminal för backend och kör detta:

```
cd backend
npm install
npm run seed
npm run seedMotorcycles   
npm run dev  
```

### Frontend

Öppna en ny terminal för frontend och skriv detta:

```
cd frontend
npm install
npm start 
```

## Testkonto 
Efter att du kört `npm run seed` finns följande användare ”user” med lösenordet som du satte i SEED_PASSWORD i .env 

## WIP
Om jag hade mer tid hade jag gärna implementerat:
- Meddelande som bekräftar att varan har lagts i korgen. 
- Meddelande när det inte finns tillräckligt av en vara i lager för att öka antalet
- Kontroll som frågar ”Är du säker på att du vill ta bort varan?”. 
- Möjlighet att kunna bläddra mellan 3 bilder per produkt i product details. 
- Logga ut knapp.
- Koppla favoriter till en användare och spara i databasen. 

## Bilder

Bakgrundsbilder från [4K Wallpapers for PC, Desktop & Mobile Phones](https://4kwallpapers.com/)

Produktbilder från konton på Instagram: 
- @dfwcars_ 
- @linusw.dng
- @cozzzy.mode
- @thebraapram
- @visualsbykaleb
- @sense.r7
- @\_landonslens_