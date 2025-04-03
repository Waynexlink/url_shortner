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
        message: "URL already shortened ",
        data: { shortUrl: `${baseurl}/${urlExist.shortId}` },
      });
    const shortId = nanoid(6);
    const shortUrl = `${baseurl}/${shortId}`;
    await Url.create({ originalUrl, shortId });
    res.status(201).json({
      status: "success",
      message: "Url shortened successfully",
      data: {
        shortUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};

const getUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { accessCount: 1 } },
      { new: true }
    );
    if (!url) return next(new AppError("this link does not exist ", 404));

    return res.redirect(url.originalUrl);
  } catch (error) {
    next(error);
  }
};

const getUrlStat = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    //chck for the id in the database
    const existingUrl = await Url.findOne({ shortId });
    if (!existingUrl)
      return next(new AppError("this link does not exist", 404));

    res.status(201).json({
      status: "success",
      message: "Stat retrived successfully",
      data: {
        existingUrl,
      },
    });
  } catch (err) {}
};

const updateUrl = async (req, res, next) => {
  try {
    const { shortId } = req.params;
    const { originalUrl } = req.body;

    if (!originalUrl) return next(new AppError("New URL is required.", 400));
    //chck for the id in the database
    if (!existingUrl)
      return next(new AppError("this link does not exist", 404));
    const updatedUrl = await Url.findOneAndUpdate(
      { shortId },
      { originalUrl },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      status: "success",
      message: "Data Updated successfully",
      data: {
        updatedUrl,
      },
    });
  } catch (err) {
    next(err);
  }
};
const deleteUrl = (req, res, next) => {
  try {
    const { shortId } = req.params;
    //chck for the id in the database
    const existingUrl = Url.findOneAndDelete({ shortId });
    if (!existingUrl)
      return next(new AppError("this link does not exist", 404));
    res.status(200).json({
      status: "success",
      message: "stat deleted successfully",
      data: {
        existingUrl,
      },
    });
  } catch (error) {
    next(err);
  }
};
module.exports = { addUrl, getUrl, getUrlStat, updateUrl, deleteUrl };
