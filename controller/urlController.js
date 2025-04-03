const { nanoid } = require("nanoid");
const Url = require("../models/url");
const AppError = require("../utils/AppError");

const baseurl = process.env.BASE_URI || `http://localhost:${process.env.PORT}`;

const addUrl = async (req, res, next) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl)
      return next(new AppError("must contain a link to shortern", 400));

    const urlExist = await Url.findOne({ originalUrl });
    if (urlExist)
      return res.status(201).json({
        status: "success",
        message: "this url already exist ",
        data: {
          urlExist,
        },
      });
    const shortId = nanoid(6);
    const shortUrl = `${baseurl}/${shortId}`;
    const saveUrl = await Url.create({ originalUrl, shortId });
    res.status(201).json({
      status: "success",
      message: "this url already exist ",
      data: {
        shortUrl,
      },
    });
    next();
  } catch (err) {
    next(err);
  }
};

const getUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });
    if (!url) return next(new AppError("this link does not exist ", 404));
    const originalUrl = url.originalUrl;
    // res.json({
    //   message: "sucessful",
    // });
    url.accessCount += 1;
    await url.save();
    return res.redirect(originalUrl);
  } catch (error) {
    next(error);
  }
};

const getUrlStat = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    //chck for the id in the database
  } catch (err) {}
};
module.exports = { addUrl, getUrl };
