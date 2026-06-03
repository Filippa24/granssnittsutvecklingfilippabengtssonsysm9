const asyncHandler = require("express-async-handler");
const Order = require("../models/orderModel");

//@desc Create order
//@route POST /orders
//@access private - kan lägga ordrar som gäst men då sparas ordern lokalt i frontenden och anropar aldrig backenden. Ska man spara sin order i databasen måste man vara inloggad, därav private
const createOrder = asyncHandler(async (req, res) => {
  const { items, customer, orderNumber, deliveryDate } = req.body;

  const order = await Order.create({
    user: req.user.id, //req.user.id får vi från validateTokenhandler
    items,
    customer,
    orderNumber,
    deliveryDate,
  });

  res.status(201).json(order);
});

//@desc Get orders by user
//@route GET /orders
//@access private - måste vara inloggad för att kunna utföra denna (req.user.id) från vaidatetokenhandler
const getOrdersByUser = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id });
  res.status(200).json(orders);
});

module.exports = { createOrder, getOrdersByUser };
