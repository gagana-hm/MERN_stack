require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT;
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use(express.json());
app.use(cors());

app.use("/", authRoutes);
app.use("/", userRoutes);

app.listen(port, () =>
  console.log(`Server started running at http://localhost:${port}`)
);
