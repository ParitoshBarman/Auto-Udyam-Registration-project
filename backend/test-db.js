import pg from "pg";
const { Client } = pg;

const client = new Client({
  user: "postgres", // PGUSER
  password: "gslfMKFgIyzEvOyUasSjNcEmnFuQlTln", // PGPASSWORD
  host: "interchange.proxy.rlwy.net", // Public host
  port: 12771, // Public port
  database: "railway", // Or your actual DB name
  ssl: {
    rejectUnauthorized: false // Needed for Railway's SSL
  }
});

client.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch(err => console.error("❌ Connection error:", err))
  .finally(() => client.end());
