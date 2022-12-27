const db = require("../db/connection");

 function getAll(req, res) {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result);
    }
  });
};
