require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { apiRouter } = require("./routes");
const { dbConnection } = require("./config/dbConnection");
const port = 4000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Database connection
dbConnection();

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`The server running in port${port}`);
});
