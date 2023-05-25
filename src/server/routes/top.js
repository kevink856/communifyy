// Import dependencies
const express = require("express");
const db = require("../db/connect.js");

const router = express.Router();

// Test get
router.get("/", async (req, res) => {
    res.send("Hello world!");
});

// Add a new user's top songs / artists data to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("top");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});

module.exports = router;