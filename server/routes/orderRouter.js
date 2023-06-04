const express = require("express")
const router = express.Router()
const Order = require("../models/orderModel")

router.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find()
    res.status(200).send({ data: orders })
  } catch (err) {
    res.status(400).send({ error: err })
  }
})

module.exports = router
