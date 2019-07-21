const express = require("express")
const connectDB = require("./config/db")
const path = require("path")

const app = express()

// Connect to our database
connectDB()

// Init middleware
app.use(express.json({ extended: false }))

app.get("/", (req,res) =>
  res.json({ msg: "Welcome to the Contact Keeper API" })
)

// Routes
app.use("/api/users", require("./routes/users"))
app.use("/api/contacts", require("./routes/contacts"))
app.use("/api/auth", require("./routes/auth"))

// Server static assets in production
if(process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"))
  app.get("*", (req, res) => res.sendFile(path.resolve(__dirname, "client", "build", "index.html")))
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`API server started on port ${PORT}`))