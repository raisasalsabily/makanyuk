const mongoose = require("mongoose")

mongoose
  .connect(
    "mongodb+srv://makanyuk-admin:yYke1KzP2RJDmWxY@makanyuk-cluster.qpsz3gi.mongodb.net/makanyukdb?retryWrites=true&w=majority",
    { useNewUrlParser: true }
  )
  .catch((e) => {
    console.error("Connection error", e.message)
  })

const db = mongoose.connection

module.exports = db
