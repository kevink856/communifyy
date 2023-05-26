// Import dependencies
const express = require("express");
const cors = require("cors");
const top = require("./routes/top.js");
require("express-async-errors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/top", top);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

module.exports = app;