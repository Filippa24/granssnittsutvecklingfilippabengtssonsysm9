const mongoose = require("mongoose");

const motorcycleSchema = mongoose.Schema(
  {
    id: Number,
    model: String,
    make: String,
    type: String,
    year: Number,
    hp: Number,
    about: String,
    price: Number,
    stock: Number,
    images: [String],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Motorcycle", motorcycleSchema);
