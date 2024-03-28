const config = require("./configs/app.config");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(require("./routes"));

const port = config.port;
const host = config.host;

const server = app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});