import express from "express";
import cors from "cors";
import posts from "./routes/posts.mjs";

import "express-async-errors";

const PORT = process.env.REACT_APP_PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Load the /posts routes
app.use("/posts", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});