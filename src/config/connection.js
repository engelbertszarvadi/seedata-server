require("dotenv").config();
const mySQL = require("mysql");

const connection = mySQL.createConnection({
  host: `${process.env.DB_HOST}`,
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_SCHEMA}`,
  insecureAuth: true,
});

module.exports = connection;
