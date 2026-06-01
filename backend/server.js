//hämta express
//express är ett webbramverk för att bygga backend server, mest specifikt för routes
const express = require("express");
//hämta env
//dotenv gör att vi kan läsa vad som står i .env filen
const dotenv = require("dotenv").config();

const app = express();

//middleware som hanterar json objekt
app.use(express.json()); //omvandlar JSON från requests

//test
app.get("/motorcycles", (req, res) => {
  res.status(200).json({ message: "motorcycles endpoint" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
