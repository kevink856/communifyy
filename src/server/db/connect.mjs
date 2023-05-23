import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.REACT_APP_DB_URI || "");

let conn;
try {
    conn = await client.connect();
} catch(e) {
    console.error(e);
}

let db = conn.db("communifyy");

export default db;