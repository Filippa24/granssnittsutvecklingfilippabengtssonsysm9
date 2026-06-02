const asyncHandler = require("express-async-handler");
//hämta modellen för motorcycles
const Motorcycle = require("../models/motorcycleModel");

//funktion för att hämta alla motorcyklar
const getMotorcycles = asyncHandler(async (req, res) => {
  const motorcycles = await Motorcycle.find();
  res.status(200).json(motorcycles);
});

//funktion för att hämta en specifik motorcyckel på id som hämtas från urlen (params)
const getMotorcycleById = asyncHandler(async (req, res) => {
  const motorcycle = await Motorcycle.findById(req.params.id);
  if (!motorcycle) {
    res.status(404);
    throw new Error("Product not found.");
  }
  res.status(200).json(motorcycle);
});

//exportera funktionerna
module.exports = { getMotorcycles, getMotorcycleById };
