const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
  },
  timeStamp: {
    type: Date,
    default: Date.now(),
  },
  accessCount: {
    type: Number,
    default: 0,
  },
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
