const express = require("express");
const router = express.Router();
//hämta funktionerna från controllern
const {
  getMotorcycles,
  getMotorcycleById,
} = require("../controllers/motorcycleController");

router.get("/", getMotorcycles);
router.get("/:id", getMotorcycleById);

module.exports = router;
