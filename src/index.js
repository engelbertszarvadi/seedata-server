const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./config/connection");

const PORT = 8080;

app.use(express.json());
app.use(cors());

//getAll route
app.get("/getAll", (req, res) => {
  db.query("SELECT * FROM users", (error, result) => {
    if (error) {
      throw new Error(error);
    } else {
      res.send(result);
    }
  });
});

//login route + authentication logic
app.post("/login", (req, res) => {
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

//measurements route based on userID
app.post("/getUserMeasurements", (req, res) => {
  const userId = req.body.id;

  db.query(
    "SELECT * FROM measurements WHERE BINARY userId = ?",
    [userId],
    (error, result) => {
      if (result.length > 0) {
        const results = [];
        result.map((element) => {
          results.push({
            measurementId: element.measurementId,
            value: element.value,
            unit: element.unit,
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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
