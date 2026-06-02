const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

const createOrder = asyncHandler(async (req, res) => {
  const { items, customer, orderNumber, deliveryDate } = req.body;

  const order = await Order.create({
    user: req.user.id, //re.user.id får vi från validateTokenhandler
    items,
    customer,
    orderNumber,
    deliveryDate,
  });

  res.status(201).json(order);
});

const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
});

module.exports = { createOrder, getOrdersByUser };
