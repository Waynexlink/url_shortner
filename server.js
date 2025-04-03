const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/db");
const urlRoute = require("./routes/urlRoute");
const errorHandler = require("./Middleware/errorHandler");
const app = express();
app.use(express.json());
//intialize database
dbConnect();

app.use("/", urlRoute);

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("server has been started ");
});
