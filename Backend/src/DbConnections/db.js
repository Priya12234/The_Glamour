// const { Pool } = require("pg");
// require("dotenv").config();

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };


const { Pool } = require("pg");
require("dotenv").config();

const createPool = () => {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    idleTimeoutMillis: 70000,
    connectionTimeoutMillis: 5000,
  });

  // Test connection on pool creation
  pool.connect()
    .then(() => console.log("✅ Connected to PostgreSQL successfully!"))
    .catch(err => console.error("❌ Initial PostgreSQL connection error:", err));

  return pool;
};

let pool = createPool();

// Reconnect logic
pool.on('error', (err) => {
  console.error('PostgreSQL pool error:', err);
  // Create new pool after a delay
  setTimeout(() => {
    console.log('Attempting to reconnect to PostgreSQL...');
    pool = createPool();
  }, 5000);
});

module.exports = {
  query: async (text, params) => {
    try {
      return await pool.query(text, params);
    } catch (err) {
      console.error('Query error:', err);
      throw err;
    }
  },
  pool: () => pool,
};