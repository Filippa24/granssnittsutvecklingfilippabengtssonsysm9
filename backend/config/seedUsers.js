//kör npm run seed (inlagt i package.json) för att köra detta (skapa användaren) en gång

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

//seeda en standardanvändare 
const seedUser = async () => {
  try {
    //connecta till mongodb databasen
    await mongoose.connect(process.env.CONNECTION_STRING);

    //ta bort befintliga användare, kan läggas kommenteras/avkommenteras om man vill att alla användare tas bort eller inte när man kör seeden
    await User.deleteMany();

    //hasha lösenordet, lösenordet för standarduser finns under SEED_PASSWORD i .env
    const hashedPassword = await bcrypt.hash(process.env.SEED_PASSWORD, 10);

    //skapa testuser
    await User.create({
      username: "user",
      email: "user@",
      password: hashedPassword,
    });

    console.log("User seeded successfully.");
    //programmet stänger sig själv när seeden är klar
    process.exit();
  } catch (error) {
    console.log(error);
    //programmet stänger sig själv, något gick fel (1)
    process.exit(1);
  }
};

//anropa funktionen för att köra den
seedUser();
