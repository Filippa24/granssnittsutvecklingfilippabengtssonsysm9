const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const {
  createOrder,
  getOrdersByUser,
} = require("../controllers/orderController");

router.use(validateToken); //skyddar alla routes så man måste vara inloggad för att nå dessa 

router.post("/", createOrder);
router.get("/", getOrdersByUser);

module.exports = router;
