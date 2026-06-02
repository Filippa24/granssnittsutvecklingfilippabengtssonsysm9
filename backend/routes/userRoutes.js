//hämta express
const express = require("express");

//hämta dessa funktioner från userController
const {
  registerUser,
  loginUser,
  currentUser,
  getCurrentUser
} = require("../controllers/userController");

//hämta validerad token från validateTokenHandler
const validateToken = require("../middleware/validateTokenHandler");

//definiera routes/endpoints jag ska ha, måste exportera och sen definera basurl i server.js:
const router = express.Router();

//post - register
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", validateToken, getCurrentUser);

module.exports = router;
