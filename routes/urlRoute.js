const express = require("express");
const {
  addUrl,
  getUrl,
  getUrlStat,
  updateUrl,
  deleteUrl,
} = require("../controller/urlController");

const Router = express.Router();
Router.post("/shorten", addUrl);
Router.get("/:shortId", getUrl);
Router.patch("/:shortId", updateUrl);
Router.delete("/:shortId", deleteUrl);
Router.get("/stats/:shortId", getUrlStat);

module.exports = Router;
