const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "event1234",   
  host: "192.168.2.45",
  port: 5432,
  database: "eventhunt",
});

client.connect()
  .then(() => console.log("✅ Connected successfully"))
  .catch(err => console.error("❌ Connection failed:", err))
  .finally(() => client.end());
