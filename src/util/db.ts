const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err: Error) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }

    console.log('Connected to the database');
});

pool.on('error', (err: Error) => {
    console.error('Database connection error:', err);
});

export {
  pool as connection
};
