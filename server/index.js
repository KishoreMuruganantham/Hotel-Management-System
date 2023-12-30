const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mysql = require('mysql2/promise'); // Import mysql2
const cookieParser = require('cookie-parser')

const app = express();
const port = 8000;

// Create a connection pool to your MySQL database
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: false}))

const allowedOrigin = 'http://localhost:5173';

app.use(
  cors({
    credentials: true,
    origin: allowedOrigin, // Set the allowed origin
  })
);

// Test the database connection
pool.getConnection()
  .then((connection) => {
    console.log('Connected to MySQL database');
    connection.release(); // Release the connection
  })
  .catch((error) => {
    console.error('Error connecting to MySQL database:', error);
  });

module.exports = {
  pool,
};

// Use 'pool' to handle MySQL queries in your routes
app.use('/', require('./routes/authRoutes'));

app.listen(port, () => console.log('Server is running on port', port));


