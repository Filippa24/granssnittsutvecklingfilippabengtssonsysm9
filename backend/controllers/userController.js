//importer
const asyncHandler = require("express-async-handler"); //hanterar async errors så vi slipper skriva try/catch i varje funktion
const bcrypt = require("bcrypt"); //hashning av lösenord
const User = require("../models/userModel"); //user modellen
const jwt = require("jsonwebtoken");

//all logik för anrop gällande user ska ligga i controllern

//@desc Register user
//@route POST /users/register
//@access public

//registrera en användare
const registerUser = asyncHandler(async (req, res) => {
  //hämta datan från requestets body
  const { username, password, confirmPassword, email } = req.body;

  //kontrollera att alla fält är ifyllda
  if (!username || !password || !confirmPassword || !email) {
    res.status(400);
    throw new Error("Please fill all required fields to create a user.");
  }

  //kontrollera att passwords matchar
  if (password !== confirmPassword) {
    res.status(400);
    throw new Error("Passwords do not match, try again.");
  }

  //kontrollera om användaren redan finns, baserat på email
  const userExists = await User.findOne({ email });

  //om användaren redan finns
  if (userExists) {
    res.status(400);
    throw new Error("A user with this email already exists.");
  }

  //om användaren inte redan finns vill vi skapa en ny:

  //hasha lösenordet eftersom vi aldrig vill spara rent lösenord, via bcrypt som vi installerat. hash tar emot lösenordet och antalet gånger hashningen ska köras. 10 är standard
  const hashedPassword = await bcrypt.hash(password, 10);

  //skapa användaren via User modellen med användarnamn, email och hashed password (tilldelar hashed password till password ist)
  const user = await User.create({ username, password: hashedPassword, email });

  //lägg till så man frår accesstoken i register efetrsom man loggas in därefter
const accessToken = jwt.sign(
  {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: "15m" },
);

  //om det gick att skapa användare, returnera ok
  console.log(`User ${user} has been successfully created.`);
  if (user) {
    //returnerar värdena för den skapade användaren (inte lösenord)
    res
      .status(201)
      .json({ _id: user.id, username: user.username, email: user.email, accessToken });
  }
  //annars returnera error
  else {
    res.status(400);
    throw new Error("Invalid user data.");
  }
});

//exportera funktionen så att vi kan nå den i routes
module.exports = { registerUser };