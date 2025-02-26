require("dotenv").config();
const sql = require("mssql");

const dbConfig = {
  server: process.env.DB_SERVER,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT, 10),
  options: {
    encrypt: process.env.DB_ENCRYPT === "true",
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
  },
};

let pool;

const connectWithRetry = async (retries = 5, delay = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      console.log("Attempting to connect to SQL Server...");
      pool = await sql.connect(dbConfig);
      console.log("✅ Connected to SQL Server");

      // Listen for connection loss
      pool.on("error", async (err) => {
        console.error("SQL Pool Error:", err);
        console.log("🔄 Reconnecting to SQL Server...");
        await connectWithRetry(); // Reconnect on error
      });

      return pool;
    } catch (error) {
      console.error(
        `❌ Database connection failed (Attempt ${i + 1}/${retries}):`,
        error.message
      );
      if (i < retries - 1) {
        console.log(`🔄 Retrying in ${delay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      } else {
        console.error(
          "🚨 Maximum retry attempts reached. Database connection failed."
        );
        throw error;
      }
    }
  }
};

const getPool = async () => {
  if (!pool || !pool.connected) {
    console.log("⏳ Pool is down, reconnecting...");
    pool = await connectWithRetry();
  }
  return pool;
};

module.exports = {
  sql,
  getPool,
};
