//hämta express
//express är ett webbramverk för att bygga backend server, mest specifikt för routes
const express = require("express");
//hämta env
//dotenv gör att vi kan läsa vad som står i .env filen
const dotenv = require("dotenv").config();
//hämta cors för att vi ska kunna prata med frontend
const cors = require("cors");

//IMPORTERA ROUTES
//hämta routes som rör users, definieras längre ner 
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

//anropa
connectDB();


const app = express();

//tillåt bara anrop från denna adress (frontenden)
app.use(
  cors({
    origin: "http://localhost:3000", 
  }),
);
//middleware som omvandlar json objekt från requests
app.use(express.json()); 

//DEFINIERA ROUTES:
//routes anropas här (måste först importera högre upp)
//denna används i userroutes
app.use("/users", userRoutes);

//test
// app.get("/motorcycles", (req, res) => {
//   res.status(200).json({ message: "motorcycles endpoint" });
// });

app.use(errorHandler);

//start server, hämtar PORT från .env
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
