const express = require("express");
const { addUrl, getUrl } = require("../controller/urlController");

const Router = express.Router();
Router.post("/shorten", addUrl);
Router.get("/:shortId", getUrl);
// Router.post("/shorten");
// Router.delete("/shorten/:shortId");

module.exports = Router;
