const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    //lägger in user här som blir foreign key
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        quantity: Number,
        images: [String],
      },
    ],
    customer: {
      name: String,
      email: String,
      address: String,
    },
    orderNumber: {
      type: String,
      required: true,
    },
    deliveryDate: {
      type: String,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
