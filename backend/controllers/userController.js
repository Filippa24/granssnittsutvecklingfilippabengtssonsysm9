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


//@desc Login user
//@route POST /users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  //hämta data från body
  const { username, password } = req.body;

  //validera input
  if (!username || !password) {
    res.status(400);
    throw new Error("Please fill all required fields to sign in.");
  }

  //kontrollera om användaren redan finns, baserat på username
  const userExists = await User.findOne({ username });

  //om användaren finns, jämför lösenord som användaren skrev in med hashade lösenordet i databasen, måste då hasha det nya lösenordet som får samma salt, körs samma antal gånger, körs med samma algoritm och får samma värde som det andra hashade lösenordet så vi nu kan jämföra de med varandra
  if (userExists && (await bcrypt.compare(password, userExists.password))) {
    //om inlogg är ok, skapa token som bevisar att användaren är inloggad
    const accessToken = jwt.sign(
       {
         user: {
           id: userExists.id,
           username: userExists.username,
         },
       },
       process.env.ACCESS_TOKEN_SECRET,
       { expiresIn: "15m" },
     );
    
    //returnera token om inlogg är ok
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Incorrect username or password.");
  }
});

//@desc get current user
//@route GET /users/me
//@access private //kan endast nås av en person, den inloggade
 const getCurrentUser = asyncHandler(async (req, res) => {
   //req.user sätts i validateTokenHandler. hela user returneras men vi vill inte ta emot password så vi tar bort det fältet
   const user = await User.findById(req.user.id).select("-password");

   if (!user) {
     res.status(404);
     throw new Error("User not found.");
   }

   res.status(200).json(user);
 });

//exportera funktionerna så vi kan nå de i routes
module.exports = { registerUser, loginUser, getCurrentUser };