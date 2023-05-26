// Import dependencies
require("dotenv").config()
const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.REACT_APP_DB_URI);

let conn, db;

async function run() {
    try {
        conn = await client.connect();
        db = conn.db("communify");
    } catch(e) {
        console.error(e);
    }
}
run();

module.exports = db;