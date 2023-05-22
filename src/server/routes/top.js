import express from "express";
import db from "../db/connect.js";

const router = express.Router();

// Add a new user's top songs / artists data to the collection
router.post("/", async (req, res) => {
    let collection = await db.collection("top");
    let newDocument = req.body;
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
});