const express = require("express");
const router = express.Router();
const db = require("../config/connection");

router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result);
    }
  });
});

router.post("/getMeasurementsById", (req, res) => {
  const userId = req.body.id;

  db.query(
    "SELECT * FROM measurementstable INNER JOIN users ON users.id = measurementstable.userId WHERE userId = ?",
    [userId],
    (error, result) => {
      if (result?.length > 0) {
        const results = [];
        result.map((element) => {
          results.push({
            measurementId: element.measurementId,
            value: element.value,
            unit: element.unit,
            uploadDate: element.uploadDate,
            description: element.description,
          });
        });
        res.send({
          measurements: results,
          status: "Success",
        });
      } else
        res.send({
          status: "There is no data related to this user",
        });

      if (error) throw new Error(error);
    }
  );
});

module.exports = router;
