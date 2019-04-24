const {config} = require("dotenv");

config({
  path: `.env.${process.env.NODE_ENV || "development"}`,
  debug: process.env.DEBUG,
});
