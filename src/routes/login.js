const express = require("express");
const router = express.Router();
const db = require("../config/connection");

router.post("/", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE BINARY username = ? AND BINARY password = ?",
    [username, password],
    (error, result) => {
      if (result.length > 0) {
        res.send({
          id: result[0].id,
          status: "Success",
        });
      } else
        res.send({
          status: "Incorrect username or password",
        });

      if (error) throw new Error(error);
    }
  );
});

module.exports = router;
