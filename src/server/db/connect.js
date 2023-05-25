// Import dependencies
require("dotenv").config()
const { MongoClient } = require("mongodb");

const uri = process.env.REACT_APP_DB_URI;
const client = new MongoClient(uri);

let conn;
async function run() {
    try {
        conn = await client.connect();
    } catch(e) {
        console.error(e);
    }
}
run().catch(console.dir);

const db = conn.db("communifyy");

module.exports = db;