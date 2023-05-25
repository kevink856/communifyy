// Import dependencies
require("dotenv").config();
const app = require("./index.js");

const PORT = process.env.REACT_APP_PORT || 3000;

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});