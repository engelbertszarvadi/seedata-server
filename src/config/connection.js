require("dotenv").config();
const mySQL = require("mysql");

const connection = mySQL.createConnection({
  host: "localhost",
  user: `${process.env.DB_USER}`,
  password: `${process.env.DB_PASSWORD}`,
  database: "seedatadb_node",
});

module.exports = connection;
