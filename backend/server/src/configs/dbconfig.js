require("dotenv").config();

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
    return;
  }
});

module.exports = connection;

// const db = mysql.createPool({
//   connectionLimit: 100,
//   host: process.env.DB_HOST,
// user: process.env.DB_USER,
// password: process.env.DB_PASSWORD,
// database: process.env.DB_DATABASE,
// port: process.env.DB_PORT,
// });

// const port = process.env.PORT || 3001;

// module.exports = { db, port };
