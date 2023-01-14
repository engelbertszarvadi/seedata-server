const express = require("express");
const app = express();
const cors = require("cors");
const usersRoute = require("./routes/users");
const loginRoute = require("./routes/login");

app.use(express.json());
app.use(cors());

app.use("/login", loginRoute);

app.use("/users", usersRoute);
app.use("/users/getMeasurementsById", usersRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
