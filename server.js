const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/db.config");

const app = express();
//intialize database
dbConnect();

app.listen(process.env.PORT, () => {
  console.log("server has been started ");
});
