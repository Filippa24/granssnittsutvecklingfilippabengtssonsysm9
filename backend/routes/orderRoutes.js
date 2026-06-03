const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  createOrder,
  getOrdersByUser,
} = require("../controllers/orderController");

router.use(validateToken); //skyddar alla routes så man måste vara inloggad för att nå dessa. man akn fortfarande lägga en beställning utan att vara inloggad men då sker det endast i frontenden, inget sparas i databasen

router.post("/", createOrder);
router.get("/", getOrdersByUser);

module.exports = router;
