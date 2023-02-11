const express = require("express");
const router = express.Router();
const db = require("../config/connection");

router.post("/updateDescription", (req, res) => {
  const descriptionID = req.body.measurementID;
  const newDescription = req.body.newDescription;

  db.query(
    "UPDATE measurements SET description = ? WHERE measurementID = ?",
    [newDescription, descriptionID],
    (error, result) => {
      if (result?.length > 0) {
        res.send({
          newDescription: result[0].description,
          status: "Success",
        });
      } else {
        res.send({
          status: "Update failed!",
        });
      }

      if (error) throw new Error(error);
    }
  );
});

module.exports = router;
