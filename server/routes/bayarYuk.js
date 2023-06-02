const express = require("express")

const router = express.Router()

const Order = require("../models/orderModel")

const calculateOrderAmount = (orderItems) => {
  const initialValue = 0
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    initialValue
  )
  return itemsPrice
}

router.post("/callback/bayaryuk", async (req, res) => {})

module.exports = router
