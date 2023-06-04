const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const dotenv = require("dotenv")

const db = require("./db")

const app = express()
const productRouter = require("./routes/productRouter")
const userRouter = require("./routes/userRouter")
const orderRouter = require("./routes/orderRouter")

const Order = require("./models/orderModel")

// const env = require("dotenv").config({ path: "./.env" })
dotenv.config({ path: ".env" })

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

var corsOptions = {
  origin: "http://localhost:3000",
}

const calculateOrderAmount = (orderItems) => {
  const initialValue = 0
  const itemsPrice = orderItems.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.price * currentValue.amount,
    initialValue
  )
  return itemsPrice
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(cors(corsOptions))
app.use(
  express.json({
    // We need the raw body to verify webhook signatures.
    // Let's compute it only when hitting the Stripe webhook endpoint.
    verify: function (req, res, buf) {
      if (req.originalUrl.startsWith("/webhook")) {
        req.rawBody = buf.toString()
      }
    },
  })
)

// Expose a endpoint as a webhook handler for asynchronous events.
// Configure your webhook in the stripe developer dashboard
// https://dashboard.stripe.com/test/webhooks
app.post("/webhook", async (req, res) => {
  let data, eventType

  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event
    let signature = req.headers["stripe-signature"]
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      )
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`)
      return res.sendStatus(400)
    }
    data = event.data
    eventType = event.type
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // we can retrieve the event data directly from the request body.
    data = req.body.data
    eventType = req.body.type
  }

  if (eventType === "payment_intent.succeeded") {
    // Funds have been captured
    // Fulfill any orders, e-mail receipts, etc
    // To cancel the payment after capture you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    console.log("💰 Payment captured!")
  } else if (eventType === "payment_intent.payment_failed") {
    console.log("❌ Payment failed.")
  }
  res.sendStatus(200)
})

db.on("error", console.error.bind(console, "MongoDB connection error:"))

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Food Ordering" })
})

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
app.use("/api/", productRouter)
app.use("/api/", userRouter)
app.use("/api/", orderRouter)

app.post("/create-payment-intent", async (req, res) => {
  try {
    // const newOrder = new Order(req.body)

    const { orderItems, shippingAddress, paymentMethod, discount } = req.body
    const totalPrice = calculateOrderAmount(orderItems)

    const newOrder = new Order({
      orderItems,
      shippingAddress,
      paymentMethod,
      discount,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice,
      isPaid: false,
      isDelivered: false,
    })
    const savedOrder = await newOrder.save()
    res.status(200).json(savedOrder)
    console.log(savedOrder)
  } catch (e) {
    res.status(400).json({
      error: {
        message: e.message,
      },
    })
  }
})

app.post("/callback/bayaryuk", async (req, res) => {
  if (req.body.status == "success") {
    Order.findByIdAndUpdate(req.body.referral_id, { isPaid: true })
      .then((product) => {
        if (!product) {
          return res.status(404).json({ error: "Product not found" })
        }

        res.json(product)
      })
      .catch((error) => {
        res.status(500).json({ error: "Internal server error" })
      })
  } else {
    res.status(400).json({ error: "failed" })
  }
})
